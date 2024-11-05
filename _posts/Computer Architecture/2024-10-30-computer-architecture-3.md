---
title:  "3. Arithmetic for Computers"
excerpt: "&nbsp;&nbsp; This chapter covers integer operations, including addition, subtraction, multiplication, and division algorithms, as well as the related hardware structure. For floating-point operations, it explains the IEEE-754 standard representation." 
date:   2024-10-30 21:40:02 +0900
categories: Computer Architecture
permalink: posts/3-arithmetic-for-computers
published: false
# ![Light Mode Image](){: class="light-mode-img" height="90%" width="90%"}

# ![Dark Mode Image](){: class="dark-mode-img" height="90%" width="90%"}

# abstration <img class="lazy" data-src="https://github.com/user-attachments/assets/88804cf0-05c4-4f03-8319-3161edd6f5b7#right" alt="image" height="5%" width="5%">**
---
# 3.1 Addition and Subtraction

&nbsp;&nbsp; Digits are added bit by bit from right to left, with carries passed to the next digit to the left. Subtraction uses addition: the appropriate operand is simply negated before being added.

> **Binary Addition and Subtraction**
>
> &nbsp;&nbsp; Let's try adding 6 to 7 in binary and then subtracting 6 from 7 in binary.
>
> <div class="bg"></div>
>
> <pre><code class="language-text">      0000 0000 0000 0000 0000 0000 0000 0111 = 7
> +     0000 0000 0000 0000 0000 0000 0000 0110 = 6
> --------------------------------------------------
> =     0000 0000 0000 0000 0000 0000 0000 1101 = 13
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>
> 
> <div class="bg"></div>
>
> Subtracting 6 from 7 can be done directly:
>
> <div class="bg"></div>
>
> <pre><code class="language-text">      0000 0000 0000 0000 0000 0000 0000 0111 = 7
> -     0000 0000 0000 0000 0000 0000 0000 0110 = 6
> --------------------------------------------------
> =     0000 0000 0000 0000 0000 0000 0000 0001 = 1
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>
>
> <div class="bg"></div>
>
> or via addition using the two's complement representation of -6:
>
> <div class="bg"></div>
>
> <pre><code class="language-text">      0000 0000 0000 0000 0000 0000 0000 0111 = 7
> +     1111 1111 1111 1111 1111 1111 1111 1010 = -6
> --------------------------------------------------
> =     0000 0000 0000 0000 0000 0000 0000 0001 = 1
> </code><button class="copy" type="button" aria-label="Copy code to clipboard"><i class="fa-regular fa-clone"></i></button></pre>

## a. Overflow

&nbsp;&nbsp; Overflow occurs when the result of an operation is too large to be represented withing the available hardware, such as a 32-bit word.

### i. Overflow in Addition

* When **operands have different signs**. overflow does not occur because the sum will be no larger one of the operands.
* Overflow occurs when **adding two positive numbers results in a negative** or **adding two negative numbers results in a positive**. This indicates that a carry out occurred into the sign bit.

### ii. Overflow in Subtraction

* Subtraction is performed by negating the second operand and adding. Thus, when **operands have the same sign**, overflow does not occur.
* Overflow occurs when **subtracting a negative number from a positive results in a negative** or **subtracting a positive number from a negative results in a positive**. This suggests a borrow occurred from the sign bit.

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/9dd479bd-8a5e-4912-ad42-109802b45e16#center" alt="image" height="70%" width="70%">

### iii. Detecting Overflow

* Overflow happens when adding or subtracting two 32-bit numbers results in a value that requires 33 bits.
* In overflow, the sign bit is incorrectly set due to the lack of an extra bit, so the sign of the result appears opposite.

&nbsp;&nbsp; In two’s complement arithmetic, we have methods to detect overflow. However, for unsigned integers, which are commonly used for memory addresses, overflow is generally ignored. MIPS provides separate instructions to handle overflow differently based on requirements:

* Overflow-checking instructions: `add`, `addi`, and `sub` raise exceptions if overflow occurs.
* Overflow-ignoring instructions: `addu`, `addiu`, and `subu` do not raise exceptions on overflow.

<div class="bg"></div>

&nbsp;&nbsp; Since the C programming language ignores overflow, MIPS C compilers consistently use the unsigned versions of arithmetic instructions (addu, addiu, subu), regardless of variable types. Conversely, MIPS Fortran compilers select the appropriate instructions based on operand types.

&nbsp;&nbsp; The **Arithmetic Logic Unit** (ALU)[^1] is responsible for performing addition and subtraction in hardware.

<div class="bg"></div>

# 3.2 Multiplication

Multiplying 1000 by 1001 in binary:

```text
Multiplicand    1000
Multiplier    x 1001
             --------
                1000
               0000
              0000
             1000
             -------
Product      1001000
```

&nbsp;&nbsp; The first operand is called the ***multiplicand*** and the second the ***multiplier***. The final result is called the ***product***. If we ignore the sign bits, the length of the multiplication of an *n*-bit multiplicand and an *m*-bit multiplier is a product that is *n* + *m* bits long. That is, *n* + *m* bits are required to represent all possible products.

&nbsp;&nbsp; In this example, each step of the multiplication is simple:

1. Just place a copy of the multiplicand (1 × multiplicand) in the proper place if the multiplier bit is a 1, or
2. Place 0 (0 × multiplicand) in the proper place if the multiplier bit is a 0.

## a. Sequential Version of the Multiplication Algorithm and Hardware

### i. First Version of the Multiplication Algorithm

<img class="lazy" data-src="https://github.com/user-attachments/assets/8992b243-d65c-4ba1-917d-9f03a7d02f34#center" alt="image" height="70%" width="70%">
 
&nbsp;&nbsp; The 32-bit multiplier is placed in the Multiplier register, and the 64-bit Product register is initialized to 0. The Multiplicand register is also 64 bits, with the 32-bit multiplicand stored in the right half and the left half set to zero. This Multiplicand register will shift left by 1 bit in each step to align with the sum in the Product register.

1. **Check Multiplier Bit**: If the least significant bit of the Multiplier register is 1, add the value of the Multiplicand register to the Product register.
2. **Shift Multiplicand Left**: Shift the Multiplicand register 1 bit to the left to prepare for alignment with the Product.
3. **Shift Multiplier Right**: Shift the Multiplier register 1 bit to the right, exposing the next bit to be checked in the following iteration.

&nbsp;&nbsp; These steps are repeated 32 times to complete the multiplication. If each step took one clock cycle, this algorithm would require almost 100 clock cycles to multiply two 32-bit numbers.

<img class="lazy" data-src="https://github.com/user-attachments/assets/3ae03b4c-1fc1-4816-929e-678100abb2dc#center" alt="image" height="60%" width="60%">

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/6a398ded-5386-4549-b710-fca7b70fe90f#center" alt="image" height="80%" width="80%">

### ii. Second Version of the Multiplication Algorithm

<img class="lazy" data-src="https://github.com/user-attachments/assets/4634ebe4-1f3b-4b60-b1d6-feb1a6745ada#center" alt="image" height="70%" width="70%">

&nbsp;&nbsp; The Multiplicand register, ALU, and Multiplier register are all 32 bits wide, with only the Product register left at 64 bits. Now, the product is shifted right. The separate Multiplier register also disappeared. The multiplier is placed instead in the right half of the Product register.

## b. Multiply in MIPS

&nbsp;&nbsp; MIPS provides a seperate pair of 32-bit registers to contain the 64-bit product, called ***Hi*** and ***Lo***.

```text
mult 
```

---
[^1]: Hardware that performs addition, subtraction, and usually logically operations such as AND and OR.
