---
title:  "2. Instructions: Language of the Computer"
excerpt: "&nbsp;&nbsp; " 
date:   2024-09-27 21:35:57 +0900
categories: Computer Architecture
permalink: posts/2-instructions-language-of-the-computer
published: false
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

```nasm
add a, b, c
```

&nbsp;&nbsp; instructs a computer to add the two variables `b` and `c` and to put their sum in `a`.

&nbsp;&nbsp; This notation is rigid in that each MIPS arithmetic instruction performs only one operation and must have exactly three variables. For example, suppose we want place the sum of four variables `b`, `c`, `d`, and `e` into vairiable `a`.

&nbsp;&nbsp; The following sequence of instructions adds the four variables:

```nasm
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

<div class="bg"></div>

> **Compiling a C Assignment Using Registers**
> 
> &nbsp;&nbsp The assignment statement from our ealier example:
>
> $$
    \textrm{f}=(\textrm{g}+\textrm{h})-(\textrm{i}+\textrm{j});
> $$
>
> &nbsp;&nbsp; The variable `f`, `g`, `h`, `i` and `j` are assigned to the registers `$s0`, `$s1`, `$s2`, `$s3` and `$s4` respectively. What is the compiled MIPS code?
>
> <details><summary><strong>Answer</strong></summary>
> 
> <div class="bg"></div>
>
> <pre><code class="language-asm">add $t0, $s1, $s2   # register $t0 contains g + h
add $t1, $s3, $s4   # register $t1 contains i + j
sub $s0, $t0, $t1   # f gets $t0 - $t1, which is (g + h) - (i + j)
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>
>
> </details> 


## a. Memory Operands

&nbsp;&nbsp; The processor can keep only a small amount of data in registers, but computer memory contains billions of data elements. Hence, data structures (arrays and structures) are kept in memory.

&nbsp;&nbsp; The arithmetic operations occur only on registers in MIPS instructions; thus, MIPS must include instructions that transfer data between memory and registers. Such instructions are called **data transfer instructions**[^3]. To access a word in memory, the instruction must supply the memory **address**[^4].

&nbsp;&nbsp; The data transfer instruction that copies data from memory to register is traditionally called *load*. The format of the load instruction is the name of the operation followed by the register to be loaded, then a constant and register used to access memory. The sum of the constant portionof the instruction and the contents of the second register forms the memory address. The actual MIPS name for this instruction is ***lw***, standing for ***load word***.

<div class="bg"></div>

> **Compiling an Assignment When an Operand Is in Memory**
> 
> &nbsp;&nbsp Let's assume that `A` is an array of 100 words and that the compiler has associated the variables `g` and `h` with the registers `$s1` and `$s2` as before. Let's also assume that the starting address, or *base address*, of the array is in `$3`. Compile this C assignment statement:
>
> $$
    \textrm{g}=\textrm{h}+\textrm{A[8]};
> $$
>
> <details><summary><strong>Answer</strong></summary>
> 
> &nbsp;&nbsp; Although there is a single operation in this assignment statement, one of the operands is in memory, so we must first transfer <code>A[8]</code> to a register. The address of this array element is the sum of the base of the array <code>A</code>, found in register <code>$s3</code>, plus the number to select element 8. The data should be placed in a temporary register for use in the next instruction. The first compiled instruction is
>
> <pre><code class="language-asm">lw $t0, 8($s3)       # Temporary reg $t0 gets A[8] $s4
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>
> 
> &nbsp;&nbsp; The following instruction can operate on the value in <code>$t0</code> since it is in a register. The instruction must add <code>h</code> to <code>A[8]</code> and put the sum in the register corresponding to <code>g</code>:
>
> <pre><code class="language-asm">add $s1, $s2, $t0    # g = h + A[8]
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>
>
> &nbsp;&nbsp; The constant in a data transfer instruction (8) is called the <em>offset</em>, and the register added to form the address (<code>$s3</code>) is called the <em>base register</em>.
>
> </details>

<div class="bg"></div>

> **Hardware/Software Interface**
>
> In addition to associating variables with registers, the compiler allocate data structure like arrays and structures to locations in memory. The compiler can then place the proper starting address into the data transfer instructions.
>
> <img class="lazy" data-src="https://github.com/user-attachments/assets/817f66ad-fa6a-4396-b270-003998166ab9#center" alt="image" height="50%" width="50%">
> 
> &nbsp;&nbsp; In MIPS, words must start at addresses that are multiples of 4. This requirement is called and **alignment restriction**, and many architectures have it.

<div class="bg"></div>

> **alignment restriction**
>
> &nbsp;&nbsp; A requirement that data be aligned in memory on natural boundaries.
>
> &nbsp;&nbsp; Computers divide into those that use the address of the leftmost or "big end" byte as the word address versus those that use the rightmost or "little end" byte. MIPS is in the *big-endian* camp. 
>
> &nbsp;&nbsp; Byte addressing also affects the array index. To get the proper byte address in the code above, *the offset to be added to the base register `$s3` must be 4 x 8, or 32, so that the load address will select `A[8]` and not `A[8/4]`.

<div class="bg"></div>

&nbsp;&nbsp; The instruction complementary to load is traditionally called ***store***; it copies data from a register to memory. The format of a store is similar to that of a load: the name of the operation, followed by the register to be stored, then offset to select the array element, and finally the base register. The actual MIPS name is ***sw***, standing for ***store word***.

<div class="bg"></div>

> **Hardware/Software Interface**
>
> &nbsp;&nbsp; As the addresses in loads and stores are binary numbers, we can see why the DRAM for main memory comes in binary sizes rather than in decimal sizes. That is, in gebibytes ($2^{30}$) of tebibytes ($2^{40}$), not in gigabytes ($10^{9}$) or terabytes ($10^{12}$).
>

<div class="bg"></div>

> **Compiling Using Load and Store**
>
> &nbsp;&nbsp; Assume variable `h` is associated with register `$s2` and the base address of the array `A` is in `$s3`. What is the MIPS assembly code for the C assignment statement below?
>
> $$
> \textrm{A[12]}=\textrm{h}+\textrm{A[8]};
> $$
> 
> <details><summary><strong>Answer</strong></summary>
>
> &nbsp;&nbsp; The first two instructions are the same as the prior example, except this time we use the proper offset of 32 for byte addressing in the load word instruction to select <code>A[8]</code>, and the add instruction places the sum in <code>$t0</code>:
>
> <pre><code class="language-asm">lw $t0, 32($s3)      # Temporary reg $t0 gets A[8]
> add $t0, $s2, $t0    # Temporary reg $t0 gets h + A[8]
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>
>
> &nbsp;&nbsp; The final instruction stores the sum into <code>A[12]</code>, using 48 (4 x 12) as the offset and register <code>$s3</code> as the base register.
>
> <pre><code class="language-asm">sw $t0, 48($s3)      # Stores h + A[8] back into A[12]
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>
>
> </details>

<div class="bg"></div>

> **Hardware/Software Interface**
>
> &nbsp;&nbsp; Many programs have more variable than computers have registers. Consequently, the compiler tries to keep the most frequently used variables in registers and places the rest in memory, using load and stores to move variables between registers and memory. The process of putting less commonly used variables (or those needed later) into memory is called ***spilling*** registers.
>
> &nbsp;&nbsp; To achieve highest performance and conserve energy, an instruction set architecture must have a sufficient number of registers, and compilers must use registers effectively.

## b. Constant or Immediate Operands

&nbsp;&nbsp; Many times a program will use a constant in an operation—for example, incrementing an index to point to the next element of an array. Using only the instructions we have seen so far, we would have to load a constant from memory to use one. For example, to add the constant 4 to register `$s3`, we could use the code

```asm
lw $t0, AddrConstant4($s1)    # $t0 = constant 4
add $s3, $s3, $t0             # $s3 = $s3 + $t0 ($t0 == 4)
```

&nbsp;&nbsp; assuming that `$s1 + AddrConstant4` is the memory address of the constant 4.

&nbsp;&nbsp; An alternative that avoids the load instruction is to offer versions of the arithmetic instructions in which one operand is a constant. This quick add instruction with one constant operand is called ***add immediate*** or ***addi***. To add 4 to register `$s3`, we just write

```asm
addi $s3, $s3, 4    # $s3 = $s3 + 4
```

&nbsp;&nbsp; Constant operands occur frequently, and by including constants inside arithmetic instructions, operations are much faster and useless energy than if constants were loaded from memory.

<img class="lazy" data-src="https://github.com/user-attachments/assets/d564b128-6384-454a-a8fd-182afbe5ebcb#right" alt="image" height="5%" width="5%">*&nbsp;&nbsp; The constant zero has another role, which is to simplify the instruction set by offering useful variations. For example, the move operation is just an add instruction where on operand is zero. Hence, MIPS dedicates a register `$zero` to be hard-wired to the value zero. Using frequency to justify the inclusions of constants is another example of the great idea of making the **common case fast**.*

<div class="bg"></div>

# 2.4 Signed and Unsigned Numbers

&nbsp;&nbsp; Numbers are kept in computer hardware as a series of high and low electronic signals, and so they are considered base 2 numbers. (Just as base 10 numbers are called *decimal* numbers, base 2 numbers are called *binary* numbers.)

&nbsp;&nbsp; A single digit of a binary number is thus the "atom" of computing, since all information is composed of **binary digits**[^5] or ***bits***. This fundamental building block can be one of two values, which can be thought of as several alternatives: high and low, on or off, true or false, or 1 or 0.

<img class="lazy" data-src="https://github.com/user-attachments/assets/ce19a559-8ba7-4d92-8cf4-3c53909f1a0f#center" alt="image" height="95%" width="95%">

&nbsp;&nbsp; Since words are drawn vertically as well as horizontally, leftmost and rightmost may be unclear. Hence, the phrase **least significant bit** is used to refer to the right-most bit (bit 0 above) and **most significant bit** to the leftmost bit (bit 31).

&nbsp;&nbsp; The MIPS word is 32 bits long, so it can
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
[^5]: Also called **binary bit**. One of the two numbers in base 2, 0 or 1, that are the components of inforamtion.
