---
title: Implementing Efficient Lindenmayer Systems in unity
tags: [procGen, graphics]
date: 2022-08-10T05:25:44.226Z
path: blog/lindenmayer-implementation
cover: ./preview.png
excerpt: Overview of an optimized l-system implementation allowing for rapid updates
author: Dan Miller
---

In my work on Seeb Defender I needed to find a way to simulate the growth of plants, especially plants who's behavior can be reconfigured during runtime. After doing some research I reached for L-Systems, and what follows is an overview of how I started and then optimized my implementation. 

## What is an L-system?

An L-system is a set of replacement rules which can apply across the State of the system in parallel, producing the next state. A basic example is a model of Algal growth. In this example there are 2 symbols: A and B, representing a mature algea cell and an immature cell respectively. A mature algea cell generates an immature cell: A is replaced with AB. An immature algea cell matures: B is replaced with A. And this example will start with a seed of just one mature algea cell, 'A'. What follows is this system as an L-system config file:
```
#axiom A
A -> AB
B -> A
```

Over several steps, the string produced by this system grows nearly exponentially. The first 6 steps:
```
A
AB
ABA
ABAAB
ABAABABA
ABAABABAABAAB
```

For more examples of L-systems, reference [Wikipedia](https://en.wikipedia.org/wiki/L-system#Examples_of_L-systems), [my l-system library documentation](https://github.com/dsmiller95/LindenmayerPlantSimulation/tree/master/Packages/com.dman.l-system#l-system-language), or [The algorithmic beauty of plants](http://algorithmicbotany.org/papers/abop/abop.pdf). 

This is an example of a basic L-system, but its grammar can be extended in several ways:
- [Stochastic](https://en.wikipedia.org/wiki/L-system#Stochastic_grammars)
  - stochastic rules are randomly picked, based on a certain probability factor
- [Parametric](https://en.wikipedia.org/wiki/L-system#Parametric_grammars)
  - parametric l-systems attach numeric parameters to the symbols of its state
  - these parameters can be "captured" when replacing a symbol, and used to determine the paremetric state of the next state
- [Context-sensitive](https://en.wikipedia.org/wiki/L-system#Context_sensitive_grammars)
  - context sensitive rules inspect the symbols adjacent to the one being replaced
  - advanced usage will allow matching whole branching structures


# Implementation overview

The full system is composed of three parts: the rule parsing system, the symbolic update engine, and the turtle rendering system. 

The rule parsing system translates all the replacement data into NativeArrays after parsing. Since it only runs once per l-system, optimization of this system has a lower priority and won't be discussed in depth here. Suffice to say the output is a set of native data structures accessible from Burst-compiled jobs. For more details on rule syntax, see [the documentation](https://github.com/dsmiller95/LindenmayerPlantSimulation/tree/master/Packages/com.dman.l-system#l-system-language).

The symbolic update engine will generate next-states from input-states. A naive implementation of this engine iterates over every character in the input state, adding its replacement to the end of the output state. Our implementation will take advantage of the fact that all of the replacements happen independently of each other, lending itself to parallelization.

The turtle rendering system will actually render the l-system states. Its name comes from "Turtle graphics" in which a single "turtle" will walk through a space following a series of commands such as <i>move forward 1 unit</i>, <i>turn right</i>, or <i>decrease scale</i>. In order to render branches, the symbols '[' and ']' are used to tell the turtle to push its current position and orientation onto a stack, or return to a previous state. By arranging movement commands interspersed with commands placing a mesh in 3D space, a turtle can trace out a whole plant from one string of characters.

## Symbolic Update Engine

Before digging in too deep, first lets describe what data we're dealing with here.

- Input String
  - a NativeArray&lt;char>. this represents the previous state as a string of characters
- Output string
  - also a NativeArray&lt;char>. this is generated from the input string as part of the update engine
- Rule Data
  - a set of native collections containing all of the replacement rules
  - every replacement rule has these properties:
    - a matching character, which this rule will replace
    - a string of characters which will replace the matching character in the output string

To optimize the update engine, we can follow two strategies. First, we will parallelize the process as much as possible. Second, we will adapt the process to run closer to the metal of the processer by converting all work into Unity's Burst-compiled Jobs. However, designing burstable jobs is not too complex for basic L-systems, the real complexity there is encountered when supporting contextual and parametric grammars. We won't discuss many details of Burst, instead focusing on what it takes to run in parallel Jobs.

Parallelizing the basic L-System seems almost trivial. Every character in the input string can determine its own replacement independent of all the other characters' replacements. Even in all of the L-system variant extensions, replacing each character will only require inspecting adjacent characters in the <i>input</i> string.

However, there is one complication we will run into. Some characters can be replaced with nothing, others can be replaced with more than one characters. Thus, we do not know how long the output string will be, and where each individual character's replacement will be copied into the output string. We can resolve this by seperating the process into three jobs, and returning once to the main thread to perform an allocation.

In the first job, we match every character against all of the replacement rules and cache the ID of the matching rule, if any. Since we are storing an ID, we only need a NativeArray parallel to the input string to store this information. The process runs once per character in the input string, and the output space is well-defined, so this job can run as a IJobParallelFor!

Second, we iterate over the matched IDs and add up the replacement rule's lengths, effectively determining how to pack all of the replacement data into the output NativeArray. This isn't parallelized, but it is a very quick iteration. Once we have packed the replacements into the output NativeArray, then back on the main thread we can allocate memory which will fit our replacements exactly. And we can run another parallel job to just copy the data over into the newly allocated output string.

The whole process can be represented as psuedocode:

<details>
  <summary>Symbol Update Engine code</summary>

```CSharp
struct JaggedIndexing{
  int index;
  int length;
}

struct Replacement{
  JaggedIndexing replacementString;
  int indexInOutput;
  static Replacement ZERO => default(Replacement);
}

class SymbolicUpdateEngine{
  // persistently allocated
  NativeHashMap<char, Replacement> ruleReplacements;
  NtiveArray<char> replacementCharacterData;

  NativeArray<char> StepSystem(NativeArray<char> input){
    var replacementMapping = new NativeArray<Replacement>(input.Length);
    var dep = new EvaluateReplacementsJob{
      input = input,
      ruleReplacements = ruleReplacements,
      stringReplacements = replacementMapping
    }.ScheduleParallel(input.Length);

    dep = new CountReplacementsJob{
      stringReplacements = replacementMapping
    }.Schedule(dep);
    dep.Complete();

    var lastReplacement = replacementMapping[0^];
    var output = new NativeArray<char>(lastReplacement.indexInOutput + lastReplacement.replacementString.length);
    dep = new CopyReplacementJob{
      stringReplacements = replacementMapping,
      replacementCharacterData = replacementCharacterData,
      output = output
    }.Schedule(dep);
    dep = replacementMapping.Dispose(dep);
    dep.Complete();
    return output;
  }
}

struct EvaluateReplacementsJob : IJobParallelFor {
  [ReadOnly]
  public NativeArray<char> input;
  [ReadOnly]
  public NativeHashMap<char, Replacement> ruleReplacements;
  public NativeArray<Replacement> stringReplacements;
  public Execute(int index){
    if(ruleReplacements.TryGetValue(input[index], out var replace)){
      stringReplacements[index] = replace;
    }else {
      stringReplacements[index] = Replacement.ZERO;
    }
  }
}

struct CountReplacementsJob : IJob {
  public NativeArray<Replacement> stringReplacements;
  public Execute(){
    var indexInReplacement = 0;
    for(int i = 0; i < stringReplacements.Length; i++){
      stringReplacements[i].indexInOutput = indexInReplacement;
      indexInReplacement += stringReplacements[i].replacementString.length;
    }
  }
}

struct CopyReplacementJob : IJobParallelFor {
  [ReadOnly]
  public NativeArray<Replacement> stringReplacements;
  [ReadOnly]
  NtiveArray<char> replacementCharacterData;
  [NativeDisableParallelForRestriction]
  public NativeArray<char> output;
  public Execute(int index){
    var replacement = stringReplacements[index];
    for(int i = 0; i < replacement.replacementString.length; i++){
      output[i + replacement.indexInOutput] = replacementCharacterData[i + replacement.replacementString.index];
    }
  }
}
```
</details>

One of the drawbacks of this method is that it joins back to the main thread once to perform an allocation, as opposed to using something like a NativeList to dynamically allocate during the job. But as long as we're ok with the update spanning a couple of frames, this is a worthwhile tradeoff. We can kick the job off in early update, then complete it either next frame or in late update to perform the allocation.

## Turtle Rendering System

At a high level, the turtle system will be responsible for placing component Organs into a final resulting mesh. These following animations illustrate how the turtle walks along a path, leaving behind a trail. In our implementation, the trail will in fact be copies of 3D meshes.

![2D Turtle Rendering Instructions](./turtle-animation.gif)
![2D Turtle Rendering a star](./turtle-animation-star-instructions.gif)


Its less clear how to parallelize the turtle system. Its nature is inherently single-threaded: the turtle "walks" along the input string, modifying its own state as it goes. This part of the system should be single-threaded. Our goal here is to offload as much work as possible into a more parallelizable form, so that the only work that occurs on the first job is that which cannot be done in parallel.

The biggest peice of work we can offload is the building of the 3D mesh out of component organ instances. If we configure the first turtle job to output a list of component organ instances, we can employ the same technique used in the symbolic update engine to pack the vertexes into the output mesh! With data about which meshes need to be copied into the output mesh, we allocate all the mesh space and copy the component organ meshes into the resulting mesh in parallel. 

## Future improvements

After converting most of the processing into parallelized jobs, most of the further optimizations from here out involve moving work into hardware which specializes in highly parallel jobs: the GPU! An obvious target for this would be the last step of the turtle job. Instead of uploading a whole mesh into the GPU, we could upload data about the component organs as a sort of point cloud. A particle shader in the GPU could do the same work that's being done on the CPU, turning those points into triangles to render.

In theory parts of the Symbolic Update Engine could also be run on the GPU. All of the heavy lifting is done in parallel jobs, which could be translated into compute shaders, with the re-allocation happening between frames as it currently does. One of the main difficulties with this will be the complexity of the system, due to supporting context-sensitive and parametric grammers in the replacement rules.