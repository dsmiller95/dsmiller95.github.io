---
title: A General approach to testing grid-based games
tags: [tooling, unity, tdd]
date: 2024-04-25T00:00:00.000Z
path: blog/tdd-grid-games
cover: ./preview.png
excerpt: An approach I use to enable writing tests first in a highly adaptable way, specialized to test grid-based games
author: Dan Miller
---


# Overview

I've built a couple grid-based games during game jams at this point. They are a delight to work with due to the simplicity of the domain. Because every object has an exact location, then interactions between objects can be precisely defined. And the state of the world can be easily represented and/or stored in something akin to a 2 or 3D array.

First, I will talk through what my ideal test case should look like. Then, I'll go through the steps needed to attach that test case to a grid-based game, and best practices to build games which work with this technique. These techniques have emerged during my development of grid-based games, for example: TODO link to gobbies and disconnect. 


# The Goal

This is a real-world test out of Gobbies Stole My Ruins:

```csharp
[Test]
public void WhenPlayerJumps_ThenDashesOverGap_MovesOverGap()
{
    // arrange
    var map = @"
XXX XXX ---
XXX --- ---
XXX -P- ---
";
    CreateWorld(map);
    EnableDash();
    EnableJump();
    var playerId = GetSingle<Player>();
    var mv = new MovementCommands(playerId);
    AssertPosition(playerId, 1, 1, 0, FacingDirection.North);
    
    // act
    World = World
        .ApplyCommandsAndTick(mv.jump);
    AssertWorldMatches(@"
XXX XXX ---
XXX --- ---
XXX --- -P-
");
    
    World = World
        .ApplyCommandsAndTick(mv.dash);
    AssertWorldMatches(@"
XXX XXX -P-
XXX --- ---
XXX --- ---
");
}
```

## Map Layout String

There are several things going on here. The most novel, and most useful, are the world layout strings. Each character represents the contents of a single tile in the 3D grid, sliced into vertical layers. Similar to MRI data, or the output of a slicer in 3D printing. the left-most slice is the bottom slice, and the right-most is the top slice. In this test, `X` is a block, `-` is empty space, and `P` is the player character. This is what the test world would look like in-game, the green character being the player:

![level layout](test_level_layout.png)

To use this format, we have two utilities. A function to build the world from the string format, and another to assert the current world against a given world string. For many, if not all, of the movement-related tests this assert is sufficient. It is also much easier to reason about compared to asserting individual coordinates of entities. Compare how the following example reads, this is what this specific test would look like if we used coordinates. To my eye, this is not as easy to scan and reason about. Where is (x:1, y:2, z:2) in the world? I have to go back to the start of the test and cross-compare with the first layout string to figure it out.

<details>
  <summary>Example of assertions on coordinates only</summary>

```csharp
[Test]
public void WhenPlayerJumps_ThenDashesOverGap_MovesOverGap()
{
    // arrange
    var map = @"
XXX XXX ---
XXX --- ---
XXX -P- ---
";
    CreateWorld(map, WorldBuildConfig.DefaultHorizLevels);
    EnableDash();
    EnableJump();
    var playerId = GetSingle<Player>();
    var mv = new MovementCommands(playerId);
    AssertPosition(playerId, 1, 1, 0, FacingDirection.North);
    
    // act
    World = World
        .ApplyCommandsAndTick(mv.jump);
    AssertPosition(playerId, 1, 2, 0, FacingDirection.North);
    
    World = World
        .ApplyCommandsAndTick(mv.dash);
    AssertPosition(playerId, 1, 2, 2, FacingDirection.North);;
}
```
</details>

## Command Pattern and Immutability

In order to write tests in this way, we use both the command pattern and immutability of the world state object. To some degree this is optional, but I find that these approaches fit together very well in practice. We see usage of the command pattern via the helper `MovementCommands` struct. This struct contains a set of commonly used commands linked to the given entity id, to make tests easier to write. For example, `mv.jump == DungeonCommandFactory.JumpEntity(id) == new JumpCommand(id)` . We see evidence of immutability in the repeated use of `World = World`, keeping the `World` field up-to-date with all commands.

The command pattern is useful in Gobbies to manage the valid entry-points into the system while maintaining immutability. Other games with smaller interfaces wouldn't need to go this far. The story is similar for usage of immutability. There is significant developement and performance overhead to implementing immutable data structures, but it forces many good practices which are useful when building something 
complex.

I'll demonstrate some of these advantages via examples as best I can! They may end up a little contrived because the majority of the benefits here come from avoiding footguns, rather than making simple examples simpler.

Keeping the world state immutable helps keep your guns pointed away from your feet. In my experience, this makes it much harder to maintain complex dependencies between objects, or relying on object references directly. Instead every entity in the game needs to track its references via Ids, or ideally hold no references to other objects at all if possible. This also applies to external users of the system. If the game's UI held direct references to game entities then object reference identity becomes a part of the system under test! Thus the test harness must also assert that specific game entities are not re-created or swapped out with different instances. If we had to test in this way, we could no longer assert only off of the world state. We would need to hold on to object references and assert against those references.

### Immutability examples

One footgun we'd like to avoid is mutating entities directly from the UI or other external systems. If we allowed mutation of game entities via object references it would be very tempting to write something simple like so:
```csharp
if (Input.KeyDown(this.dashKey)) {
  Player.MoveForward(2);
}
```

Imagine what this MoveForward function must or may do:
1. It must make a modification to the player
2. It may need to emit events to notify other parts of the system that a change occured
3. It may be capable of causing changes to entities other than the player, for example picking up a pickup.

These possibilities raise a whole host of questions: Should this mutation cause update events to fire back to the gui? Should it trigger the enemy's turn after the player moved, or does that happen somewhere else? Does this operation cause the player to pick up an item on the tile they move into? Where else is this function being called, and how many other functions make changes like this that we need to find and test? 


Or even worse, we could end up writing something like this in an ui controller:
```csharp
void Update() {
  if (player.locationNeedsUpdate) {
    string formattedPositionText = this.ExpensiveFormatPlayerLocation(player.position);
    this.textComponent.text = formattedPositionText;
    player.locationNeedsUpdate = false;
  }
}
```

Now we've stored extra state in our player and tied it to a specific ui controller! How are we going to test that? If the Player class decides it needs to check if `locationChanged` was flipped back to `false` before moving again to make sure the ui effects occur in proper order, we would have very effectively tightly coupled our Player logic to the UI.

Of course, there are obvious solutions to these problems without reaching for immutability. With sufficient experience, we can see code like this and tell that it's going to lead to problems in the future. But when working with other people or my past self, I prefer to make these types of dependencies either glaringly obvious or impossible to represent.

In contrast, consider this approach:

```csharp
if (Input.KeyDown(this.dashKey)) {
  World = World.Modify(worldWriter => {
    var player = worldWriter.GetEntity(playerId);
    var newPlayer = player.MoveForward(2);
    worldWriter.SetEntity(playerId, newPlayer);
  });
}
```

This is more code compared to the last example. What's happening here is we're creating a new instance of a player object inside `player.MoveForward(...)`, and a new instance of the `World` object inside `World.Modify(...)`. The `worldWriter` exposes an ergonomic and performant interface for mutating the world, before baking into an immutable `World`.

Lets imagine what this version of the MoveForward function must or may do:
1. It must make a modified copy of the player object and return it
2. It must not make any changes to the existing player object
3. It may inspect properties directly on the player object

That's it! This is operating on the assumption that all entities are immutable. The MoveForward function can only inspect the Player object, and return a new entity. If the Player entity had a reference to another object via its ID, we do not give the MoveForward function the ability to do anything with that ID. It would need some way to get the entity referenced by that ID.

We can evaluate the type of access we have in the function context in more detail like so:

- `World` access
  - We have write access to `World`. This gives this class permission to change anything about the world
  - This also means we can easily find every location in the code where the `World` changes. Simply look for all Write references to `World`.
- Player access
  - inside the ChangeEntity function, we only have "write" access via the return value.
  - This means we can -only- return a new entity - presuming that the entity will replace the current player entity.
  - By scanning the code, we can be assured that `p.MoveForward()` does not itself handle picking up items, or giving enemies their turn.

### Immutability with Commands

So we've seen what an immutable api might look like. How do Commands tie into this? There are several ways we can draw this boundary, for this example we will essentially be wrapping up this code in a command: `worldWriter.ChangeEntity(playerId, p => p.MoveForward(2))` . Here's what that would look like, in a more complete example:


```csharp
class InputManager: MonoBehavior{
  private World _world;          // set on Start
  private EntityId _playerId;    // set after world initialization
  private KeyCode _dashKey = KeyCode.Shift;
  void Update() {
    var inputCommand = GetInputCommand();
    if (inputCommand == null) return;

    _world = _world.ApplyCommand(inputCommand);
  }

  ICommand? GetInputCommand() {
    if (Input.KeyDown(this._dashKey)) {
      return new MoveForwardCommand() {
        distance = 2,
        targetEntityId = this._playerId
      };
    }
  }
}
class MoveForwardCommand : ICommand {
  public int distance;
  public EntityId targetEntityId;
  public void Execute(IWorldWriter worldWriter) {
    IEntity targetEntity = worldWriter.GetEntity(targetEntityId);
    IHavePosition entityWithPosition = targetEntity as IHavePosition;
    if (entityWithPosition == null) throw new InvalidOperationException("Attempted to move an entity which does not have a position");

    Vector3Int newPosition = MoveForwardFrom(entityWithPosition.GetPosition(), worldWriter.pathingData);
    IEntity newEntity = entityWithPosition.WithPosition(newPosition);

    worldWriter.SetEntity(targetEntityId, newEntity);
  }
  private Vector3Int MoveForwardFrom(Vector3Int position, IPathingWorld pathing){
    /// TODO: implement moving forward, blocked by walls, this.distance steps
  }
}
interface IHavePosition {
  Vector3Int GetPosition();
  IEntity WithPosition(Vector3Int newPosition);
}
interface IEntity {}
```

Note that we no longer have any references to a Player instance, only a `GetPosition` and `WithPosition` function, defined in the `IHavePosition` interface. This is one of the benefits of using Commands: we can isolate the logic related to moving into the command rather than in a shared base class. Another difference is how we handle input. All of our input now maps into object conforming to the `ICommand` interface, so we can pass them around as regular objects. Representing our commands as (Serializable!) data allows a whole host of options:
- Input queueing via a `Queue<ICommand>` on InputManager.
- Passing commands over the network
- Saving commands in a local file
- Replaying a recorded series of commands to acheive identical world state
- Inspecting commands in other parts of the system with listeners, for Example triggering a sword animation after an AttackCommand listener triggered

The existence of the `MoveForwardCommand` also forms a component of our worlds public api. We can move this class around between projects easily to control dependencies. Our input class no longer needs to deal with `IWorldWriter` at all, all it depends on are the commands! This opens up the possibility to make `IWorldWriter` inaccessible to parts of the application which should only be dealing with commands.


### Testing immutable data with Commands

How does this come together to make testing easier?

At its core, its all about controlling the public api surface area. This pattern allows us a powerful way to control when data writes are permitted. We can collect up all implementations of our Command type, and that is the entirety of our public write-enabled api! We then use these commands exclusively to define all changes to the game state.

All queries against the game state rely on entity IDs as opposed to object references. Thus, our tests assert against game state directly without checking object reference stability. To build an assertion all we need is pure data defining the shape of the world with entities, and the IDs to query for the entity data. Even the IDs are optional if we use the expected position to identify the entity.

This pattern is similar to the [Command Query Responsibility Segregation (CQRS)](https://en.wikipedia.org/wiki/Command_Query_Responsibility_Segregation) architecture. We place commands into their own objects and delegate querying to entities themselves or extension methods. If we wanted even greater segregation we could isolate the queries into their own objects as well.

As an example, lets compare what test cases might look like for our previous MoveForward example. With some shared code:

```csharp
/// Creates a world based on a layout string. 'P' == Player, 'X' == wall, '-' == empty space
World CreateWorld(string mapLayoutString){ 
  /* Omitted */ 
}

/// Assert that the entities contained in the World match
///   the entities which would be created by the given layout string
void AssertWorldMatches(World world, string expectedLayout){
  /* Omitted */
}
```


#### With mutable data:

```csharp
void AssertPosition(Vector3Int expected, IHavePosition entity){
  Vector3Int position = entity.GetPosition();
  Assert.AreEqual(expected, position);
}

[Test]
void TestPlayerMovesForward(){
  var map = @"
XXX ---
XXX ---
XXX -P-
";
  World world = CreateWorld(map);
  Player player = world.GetEntityAt(new Vector3Int(0, 1, 0)) as Player;

  player.MoveForward(2);

  AssertPosition(new Vector3Int(0, 1, 2), player);
  AssertWorldMatches(world, @"
XXX -P-
XXX ---
XXX ---
");
}
```

#### With immutable data and commands:

```csharp
[Test]
void TestPlayerMovesForward(){
  var map = @"
XXX ---
XXX ---
XXX -P-
";
  World world = CreateWorld(map);
  EntityId playerId = world.GetEntityAt(new Vector3Int(0, 1, 0));
  ICommand moveForward = CommandFactory.MoveForward(playerId, 2);

  world = world.ApplyCommand(moveForward);

  AssertWorldMatches(world, @"
XXX -P-
XXX ---
XXX ---
");
}
```


Note that the tests which rely on Commands enjoy a greater separation of concerns. The test case code itself only depends on shared types: `World`, `EntityId`, and `ICommand`. As well as components of the test harness via `CommandFactory`, `CreateWorld`, and `AssertWorldMatches`. This is an indicator that this test case will be much more maintainable. I like to think of this as bringing the test case closer towards data on a spectrum of code<->data.