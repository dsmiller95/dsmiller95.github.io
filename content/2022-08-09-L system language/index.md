---
title: Implementing Efficient Lindenmayer Systems in unity
tags: [procGen, graphics, tooling]
date: 2022-08-09T05:25:44.226Z
path: blog/lindenmayer-implementation
cover: ./preview.png
excerpt: Overview of how an l-systems may be implemented allowing for rapid updates
author: Dan Miller
---

In my work on Seeb Defender I needed to find a way to simulate the growth of plants, especially plants who's behavior can be reconfigured during runtime. After doing some research I reached for L-Systems, and what follows is an overview of how I started and then optimized my implementation. 

## What is an L-system?

An L-system is a set of replacement rules which can apply across the State of the system in parallel, producing the next state. A basic example is a model of Algal growth. In this example there are 2 symbols: A and B. every step, A will be replaced with AB, and B will be replaced with A. And this example will start with a seed of just one 'A'. What follows is what this system would look like as an L-system config file:
```
#axiom A
A -> AB
B -> A
```

Over several steps, the string produced by this system grows exponentially. The first 5 steps:
```
A
AB
ABA
ABAAB
ABAABABA
```

For more examples of L-systems, reference [Wikipedia](https://en.wikipedia.org/wiki/L-system#Examples_of_L-systems), [my l-system library documentation](https://github.com/dsmiller95/LindenmayerPlantSimulation/tree/master/Packages/com.dman.l-system#l-system-language), or [The algorithmic beauty of plants](http://algorithmicbotany.org/papers/abop/abop.pdf). 

This is an example of a basic L-system, but it can be extended in several ways:
- Stochastic L-systems
  - stochastic rules are randomly picked, based on a certain probability factor
- Parametric L-systems
  - parametric l-systems allow numeric parameters to be attached to the symbols of its state
  - these parameters can be "captured" when replacing a symbol, and used to determine the paremetric state of the next state
- Context-sensitive L-systems
  - context sensitive rules are rules which inspect the symbols adjacent to the one being replaced
  - advanced usage will allow for matching whole branching structures


# Implementation overview

The full system is composed of three parts: the rule parsing system, the symbolic update engine, and the turtle rendering system. 

The rule parsing system takes in configuration files containing a series of replacement rules representing the whole of the l-system. The output of the rule parsing system is a single instance of a symbolic update engine.

Next, the symbolic update engine will generate next-states from input-states. A naive implementation of this engine would iterate over every character in the input state, adding its replacement to the end of the output state.

The turtle rendering system will actually render the l-system states. Its name comes from "Turtle graphics" in which a single "turtle" will walk through a space following a series of commands such as <i>move forward 1 unit</i>, <i>turn right</i>, or <i>decrease scale</i>. In order to render branches, the symbols '[' and ']' are used to tell the turtle to push its current position and orientation onto a stack, or return to a previous state. By arranging movement commands interspersed with commands placing a mesh in 3D space, a turtle can trace out a whole plant from one string of characters.

## The rule parsing engine

The rule parsing engine started as a system which would ingest a single file, of simple replacement rules. As the full system was extended to be more feature-full, the rule parsing engine was extended to allow for parsing stochastic, parametric, and context-sensitive rules. To allow for code re-use, a grammer to import library files was implemented. C-like <i>#define</i> replacement directives are used to allow for reuse of symbols, especially when controlling these symbols externally through gameplay code.

Most of the actual parsing of rules is done via piles of regular expressions, ending in a list of rule objects. The whole process works like this:
1. The linker resolves all file import references, builds a dependency tree, and coordinates compiling each file from deepest dependency first
2. The define directives apply their replacement in reverse line order over all files
3. Rule objects are generated from the file compilation
4. Optimized versions of the rules are written into Burst-compatible NativeArray s


TODO:
  - initial naive implementation
    - contained rule parsing engine
    - computed next step on a blocking main-thread process
    - same operation for turtle, all main-thread
  - rule parsing engine
    - configurability via define directives
  - translation into native data structure
  - design of efficient multithreaded Jobs to perform a symbolic step
  - emit updates to the turtle
  - turtle asset ingestion pipeline to native data structure
  - design single-thread turtle job to read symbols, multithreaded job to render mesh

  - re-used useful concepts
    - native array writer + capacity counter
      - useful to rapidly write objects into native memory.
      - can be computed in a job, only return to main thread to make allocation and then branch back off
  
  - future improvements
    - use compute/tesselation shader to create mesh on GPU
      - all parts of the mesh are slightly modified instances of a small set of meshes
      - instead of copying the mesh data in the CPU and uploading to GPU, would be much faster to generate mesh data on GPU from a point cloud
    - use compute shaders to run entire symbol update
      - the L-system update step is highly parallelizable, however it is curretly complex. it could in theory run almost entirely on the GPU