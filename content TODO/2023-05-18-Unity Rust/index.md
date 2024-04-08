---
title: Rewriting Bursted Jobs in Rust
tags: [tooling, unity, rust]
date: 2023-05-18T05:25:44.226Z
path: blog/burst-jobs-rust-unity
cover: ./preview.png
excerpt: Interop with Unity's Native Collections and Jobs via a rust submodule, to achieve higher performance and more adaptable memory safety
author: Dan Miller
---

I want to make l-system subsystem faster

First, I converted using csbindgen by cysharp (thanks)

Then I tried converting one part of the expression evaluator. used everywhere. code actually slowed down a little bit -- maybe I should measure this more. called from deep inside jobs

then I added a compile flag to switch between rust and jobs

Then, I wanted generics so I used rust macros to interop with nativearray

Then, I discovered burst will not allow us to pass complex structs directly, rather we must pass a pointer to any struct: https://docs.unity3d.com/Packages/com.unity.burst@1.6/manual/docs/CSharpLanguageSupport_BurstIntrinsics.html#dllimport-and-internal-calls

I got helped by https://forum.unity.com/threads/how-we-replace-most-of-our-hpc-code-with-rust-code.1215072/

Then, I made an incremental migration of the diffusion system
This one makes memory allocations during the job, via NativeList. now, we will make and release those allocations in Rust instead of in unity. will this improve performance?

Then, I had a hell of a time debugging a problem becuase there was no debugger.
I ended up dumping a debug string to a file. it was OK. but not great.

TODO/upcoming:
Then, I decided to mock up a realistic comparison test which involves allocating data and reading data sotred in a nativearray

Then, I decided to start managing the job lifecycle for this system manually instead of using unity's jobhandles
  unitys jobhandles forced me to have a bunch of computing done on the main thread so I can do allocations -- rust will let me do this whenever I want

