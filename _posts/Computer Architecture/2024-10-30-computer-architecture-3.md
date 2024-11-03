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

