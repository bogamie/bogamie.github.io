---
title:  "2. Instructions: Language of the Computer"
excerpt: "&nbsp;&nbsp; " 
date:   2024-09-27 21:35:57 +0900
categories: Computer Architecture
permalink: posts/2-instructions-language-of-the-computer
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
# ![Light Mode Image](){: class="light-mode-img" height="90%" width="90%"}

# ![Dark Mode Image](){: class="dark-mode-img" height="90%" width="90%"}

# abstration <img class="lazy" data-src="https://github.com/user-attachments/assets/88804cf0-05c4-4f03-8319-3161edd6f5b7#right" alt="image" height="5%" width="5%">**
---
# 2.1 Introduction

&nbsp;&nbsp; The words of a computer's language are called *instructions*, and its vocabulary is called an **instruction sets**[^1]. In this chapter, you will see the instruction set of a real computer, both in the form written by people and in the form read by the computer.

<div class="bg"></div>

# 2.2 Operations of the Computer Hardware

&nbsp;&nbsp; Every computer must be able to perform arithmetic. The MIPS assembly language notation

```assembly
add a, b, c
```

&nbsp;&nbsp; instructs a computer to add the two variables `b` and `c` and to put their sum in `a`.

&nbsp;&nbsp; This notation is rigid in that each MIPS arithmetic instruction performs only one operation and must have exactly three variables. For example, suppose we want place the sum of four variables `b`, `c`, `d`, and `e` into vairiable `a`.

&nbsp;&nbsp; The following sequence of instructions adds the four variables:

```assembly
add a, b, c     # The sum of b and c is placed in a
add a, a, d     # The sum of b, c and d is now in a
add a, a, e     # The sum of b, c, d and e is now in a
```

&nbsp;&nbsp; Thus, it takes three instructions to sum the four variables.

&nbsp;&nbsp; The natural number of operands for an operation like addition is three: the two numbers being added together and a place to put the sum. Requiring every instruction to have exactly three operands, no more and no less, conforms to the philosophy of keeping the hardware simple: hardware for a variable number of operands is more complicated than hardware for a fixed number. This situation illustrates the first of three underlying of hardware design:

&nbsp;&nbsp; *Design Principle 1: **Simplicity favors regularity.***

<div class="bg"></div>

# 2.3 Operands of the Computer Hardware

&nbsp;&nbsp; Unlike programs in high-level languages, the operands of arithmetic instructions are restricted; they must be from a limited number of special locations built directly in hardware called *registers*. Registers are primitives used in hardware design that are also visible to the programmer when the computer is completed, so you can think of registers as the bricks of computer construction. The size of a register in the MIPS architecture is 32 bits; groups of 32 bits occur so frequently that they are given the name **word**[^2] in the MIPS architecture.

&nbsp;&nbsp; The three operands of MIPS arithmetic instructions must each be chosen from one of the 32 32-bit registers. The reason for the limit of 32 registers may be found in the second of our three underlying design principles of hardware technology:

&nbsp;&nbsp; *Design Principle 2: **Smaller is faster.***

&nbsp;&nbsp; A very large number of registers may increase the clock cycle time simply because it takes electronic signals longer when they must travel farther. Guidlines such as "smaller is faster" are not absolutes; 31 registers may not be faster than 32.

&nbsp;&nbsp; The MIPS convention is to use two-character names following a dollar sign to represent a register. [Section 2.8](/posts/2-instructions-language-of-the-computer#28-supporting-procedures-in-computer-hardware) will explain the reasons behind these names. For now, we will use `$s0`, `$s1`, ... for registers that correspond to variables in C and Java programs and `$t0`, `$t1`, ... for temporary registers needed to compile the program into MIPS instructions.

> **Compiling a C Assignment Using Registers**
> 
> &nbsp;&nbsp The assignment statement from our ealier example:
>
> $$
    \textrm{f}=(\textrm{g}+\textrm{h})-(\textrm{i}+\textrm{j});
> $$
>
> &nbsp;&nbsp; The variable f, g, h, i and j are assigned to the registers $s0, $s1, $s2, $s3 and $s4 respectively. What is the compiled MIPS code?
>
> <details><summary><strong>Answer</strong></summary>
> 
> ```assembly
> add $t0 $s1 $s2   # register $t0 contains g + h
> add $t1 $s3 $s4   # register $t1 contains i + j
> sub $s0 $t0 $t1   # f gets $t0 - $t1, which is (g + h) - (i + j)
> ```
> 
> </details>

## a. Memory Operands

&nbsp;&nbsp; The processor can keep only a small amount of data in registers, but computer memory contains billions of data elements. Hence, data structures (arrays and structures) are kept in memory.

&nbsp;&nbsp; The arithmetic operations occur only on registers in MIPS instructions; thus, MIPS must include instructions that transfer data between memory and registers. Such instructions are called **data transfer instructions**[^3]. To access a word in memory, the instruction must supply the memory **address**[^4].

&nbsp;&nbsp; The data transfer instruction that copies data from memory to register is traditionally called *load*. The format of the load instruction is the name of the operation followed by the register to be loaded, then a constant and register used to access memoryt.

<div class="bg"></div>

# 2.4 Signed and Unsigned Numbers

<div class="bg"></div>

# 2.5 Representing Instructions in the Computer

<div class="bg"></div>

# 2.6 Logical Operations

<div class="bg"></div>

# 2.7 Instructions for Making Decisions

<div class="bg"></div>

# 2.8 Supporting Procedures in Computer Hardware

<div class="bg"></div>

# 2.9 Communicating with People

<div class="bg"></div>

# 2.10 MIPS Addressing for 32-Bit Immediates and Addresses

<div class="bg"></div>

# 2.11 Parallelism and Instructions: Synchronization

<div class="bg"></div>

# 2.12 Translating and Starting a Program

<div class="bg"></div>

# 2.13 A C Sort Example to Put It All Together

<div class="bg"></div>

# 2.14 Arrays versus Pointers

<div class="bg"></div>

# 2.15 Advanced Material: Compiling C and Interpreting Java

<div class="bg"></div>

# 2.16 Real Stuff: ARM v7 (32-bit) Instructions

<div class="bg"></div>

# 2.17 Real Stuff: ARM v8 (64-bit) Instructions

<div class="bg"></div>

# 2.18 Real Stuff: RISC-V Instructions

<div class="bg"></div>

# 2.19 Real Stuff: x86 Instructions

<div class="bg"></div>

# 2.20 Going Faster: Matrix Multiply in C

<div class="bg"></div>

# 2.21 Fallacies and Pitfalls

<div class="bg"></div>

# 2.22 Concluding Remarks

<div class="bg"></div>

# 2.23 Historical Perspectives and Further Reading

<div class="bg"></div>

---

[^1]: The vocabulary of commands understood by a given architecture.
[^2]: The natural unit of access in a computer, usually a group of 32 bits; corresponds to the size of a register in the MIPS architecture.
[^3]: A command that moves data between memory and registers.
[^4]: A value used to delineate the location of a specific data element within a memory array.
