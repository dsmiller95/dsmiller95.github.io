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

This is a real-world test right out of Gobbies Stole My Ruins:

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
    // places the dash and jump items into the players inventory
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

There are several things going on here but the most useful are the world layout strings. Each character represents the contents of a single tile in the 3D grid, sliced into vertical layers. Similar to MRI data, or the output of a slicer in 3D printing. the left-most slice is the bottom slice, and the right-most is the top slice. In this test, `X` is a block, `-` is empty space, and `P` is the player character. This is what the test world would look like in-game, the green character being the player:

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

### Implementing the map layout string

The map layout string can be build up from a few components. A parser to parse the string into a 3D array, an axis transformer, and a lookup table of game entity factories. 

## Command Pattern and Immutability

In order to write tests in this way, we use both the command pattern and immutability of the world state object. To some degree this is optional, but I find that these approaches fit together very well in practice. We see usage of the command pattern via the helper struct `MovementCommands` which contains a set of commonly used commands. For example, `mv.jump == DungeonCommandFactory.JumpEntity(id) == new JumpCommand(id)` . We see evidence of immutability in the repeated use of `World = World`, keeping the `World` field up-to-date with all commands.

The command pattern is useful in Gobbies to manage the valid entry-points into the system, games with smaller interfaces wouldn't need to go this far. The story is similar for usage of immutability: there is significant developement and performance overhead to implementing immutable data structures. But it forces many good practices which are useful when building something complex.

I'll demonstrate some of these advantages via examples as best I can; focusing on the command pattern. Immutability is less relevant to the tests themselves and more about how the code under test is arranged.


### Using commands in the game

Lets have a look at what using commands will look like in a game's implementation. There are many ways to draw a boundary around command's logic. In this example I create a MoveForwardCommand that takes an Id and a distance to move the entity pointed to by the Id forward distance steps. Here's the full example of how we would use a command like that:

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
    return null;
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
interface IWorldWriter {
  IEntity GetEntity(EntityId id);
  void SetEntity(EntityId id, IEntity newEntity);
}
```

Note that we have no references to a Player instance, only the `GetPosition` and `WithPosition` functions defined in the `IHavePosition` interface. We can use this command on any entity implementing this interface! This is because commands make it easy to isolate game logic into the command rather than in a shared base class. Another benefit is how we handle input: all of our player's inputs now create something implementing `ICommand` rather than executing a change immediately. So we pass them around as regular objects and (in this case) execute them immediately. Representing our commands as (Serializable!) data opens up a whole host of options:
- Input queueing via a `Queue<ICommand>` on InputManager
- Passing commands over the network
- Saving commands in a local file
- Replaying a recorded series of commands to acheive identical world state
- Inspecting commands in other parts of the system with listeners. For example triggering a sword animation after an AttackCommand listener triggered

The existence of the `MoveForwardCommand` also forms a component of our worlds public api. We can move this class around between projects easily to control dependencies. Our input class also only depends on the Commands and the World itself but not `IWorldWriter` or `IHavePosition`, which means we could make these interfaces inaccessible to the input layer!


### Testing with Commands

How does this come together to make testing easier?

At its core its all about controlling the public api surface area. This pattern allows us a powerful way to control when any changes occur. We can collect up all implementations of our Command type, and that is the entirety of our public api! We then use these commands exclusively to define all changes to the game state.

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

#### Without commands:

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

  AssertWorldMatches(world, @"
XXX -P-
XXX ---
XXX ---
");
}
```

#### With commands:

```csharp
[Test]
void TestPlayerMovesForward(){
  var map = @"
XXX ---
XXX ---
XXX -P-
";
  World world = CreateWorld(map);
  IEntity player = world.GetEntityAt(new Vector3Int(0, 1, 0));
  ICommand moveForward = CommandFactory.MoveForward(player.Id, 2);

  world.ApplyCommand(moveForward);

  AssertWorldMatches(world, @"
XXX -P-
XXX ---
XXX ---
");
}
```


Note that the tests which rely on Commands enjoy a greater separation of concerns. The test case code itself depends on shared types: `World`, `EntityId`, and `ICommand`. As well as components of the test harness via `CommandFactory`, `CreateWorld`, and `AssertWorldMatches`. This is an indicator that this test case will be much more maintainable. I like to think of this as bringing the test case closer towards data on a spectrum of code<->data.