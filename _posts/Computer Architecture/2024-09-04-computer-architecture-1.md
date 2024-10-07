---
title:  "1. Computer Abstractions and Technology"
excerpt: "&nbsp;&nbsp; This chapter introduces key concepts in computer architecture, focusing on performance, technologies for processors and memory, and the shift from uniprocessors to multiprocessors."
date:   2024-09-04 19:02:54 +0900
categories: Computer Architecture
permalink: posts/1-Computer-Abstractions-and-Technology
published: true
# Data Structure / Algorithm / Computer Architecture / System Programming / Computer Network / Database / Design Pattern / Web Programming / JavaScript / Java
# ![Light Mode Image](){: class="light-mode-img" height="90%" width="90%"}

# ![Dark Mode Image](){: class="dark-mode-img" height="90%" width="90%"}

# abstration <img class="lazy" data-src="https://github.com/user-attachments/assets/88804cf0-05c4-4f03-8319-3161edd6f5b7#right" alt="image" height="5%" width="5%">**
---
# 1.1 Introduction

## a. Classes of Computing Applications and Their Characteristics

&nbsp;&nbsp; Although a common set of hardware technologies is used in computers ranging from smart home aplliances to cell phones to the largest supercomputers, these different applications have different design requirements and employ the core hardware technologies in different ways. Broadly speaking, computers are used in three different classes of applications.

### i. Personal computers(PCs)

&nbsp;&nbsp; **Personal computers**[^1] emphasize delivery of good performance to single users at low cost and usually execute third-party software. This class of computing drove the evolution of many computing technologies, which is only about 40 years old.

### ii. Servers

&nbsp;&nbsp; **Servers**[^2] are modern, large computers that are usually accessed via a network. They are designed to handle large workloads, whether it’s managing numerous small tasks or supporting a large-scale web server. Servers are build from the same basic technology as desktop computers, but provide for greater computing, storage, and input/output capacity. In general, severs also place a greater emphasis on dependability, since a crash is usually more costly than it would be on a single-user PC.

&nbsp;&nbsp; Servers span the widest range in cost and capability. At the low end, servers (often referred to as low-end servers) are typically used for file storage, small business applications, or simple web serving. At the other extreme are **supercomputers**[^3], which at the present consist of hundreds of thousands of processors and many **terabytes**[^4] of memory. Supercomputers are usually used for high-end scientific and engineering calculations, as well as solving large-scale problems. 

### iii. Embedded computers

&nbsp;&nbsp; **Embedded computers**[^5] are the largest class of computers and span the widest range of applications and performance. Embedded computers include the microprocessors found in your car, the computers in a television set. A popular term today is Internet of Things(IoT), which suggest many small devices that all communicate wirelssly over the Internet.

&nbsp;&nbsp; Embedded applications often have unique application requirements that combine a minimum performance with stringent limitations on cost or power. Despite their low cost, embedded computers often have lower tolerance for failure, since the results can vary upsetting to devastating. In consumeroriented embedded applications, such as a digital home appliance, dependability is achieved primarily through simplicity—the emphasis is on doing one function as perfectly as possible. In large embedded systems, techniques of redundancy from the server world are often employed.

## b. Welcome to the PostPC Era

&nbsp;&nbsp; **Personal mobile device(PMD)**[^6] is battery operated with wireless connectivity to the Internet, and, like PCs, users can download software("apps") to run on them. Unlike PCs, they no longer have a keyboard and mouse, and are more likely to rely on a touch-sensitibe screen or even speech input. Taday's PMD is a smart phone or a tablet computer, but tomorrow it may include electronic glasses.

&nbsp;&nbsp; Taking over from the traditional server is **Cloud Computing**[^7], which relies upon giant datacenters that are known as Warehouse Scale Computers(WSCs). Companies like Amazon and Google build these WSCs and then let companies rent portions of them. Indeed, **Software as a Service(SaaS)**[^8] deployed via the cloud is revolutionizing the software industry just as PMDs and WSCs are revolutionizing the hardware industry.

> ***Understanding Program Performance***
>
> &nbsp;&nbsp; The performace of a program depends on a combination of the effectiveness of the algorithms used in the program, the software systems used to create and translate the program into machine instructions, and the effectiveness of the computer in executing those instructions, which may include input/output(I/O) operations. This table summarize how the hardware affect performance.
>
> | **Hardware or software component** | **How this component affects performance** | **Where is this topic covered?** |
> |:-|:-|:-|
> |Algorithm|Determines both the number of source-level statements and the number of I/O operations executed|Other books|
> |Programming language, compiler, and architecture|Determines the number of computer instructions for each source-level statement|Chapter 2 and 3|
> |Processor and memory system|Determines how fast instructions can be executed|Chapters 4, 5, and 6|
> |I/O system (hardware and operating system)|Determines how fast I/O operations may be executed|Chapters 4, 5, and 6|

<div class="bg"></div>

# 1.2 Seven Great Ideas in Computer Architecture

&nbsp;&nbsp; We now introduce seven great ideas that computer architects have been invented in the last 60 years of computer design. These ideas have proven so powerful that they have endured long after their initial introduction, with newer architects showing their respect by emulating them. We will explore these ideas through various examples, using icons and highlighted terms to help readers easily recognize their influence throughout the chapters.

## a. Use Abstration to Simplify Design

<img class="lazy" data-src="https://github.com/user-attachments/assets/88804cf0-05c4-4f03-8319-3161edd6f5b7" alt="image" height="15%" width="15%">*ABSTRACTION*

&nbsp;&nbsp; A major productivity technique for hardware and software is to use **abstractions** to represent the design at different levels of representation; lower-level details are hidden to offer a simpler model at higher levels.

## b. Make the Common Case Fast

<img class="lazy" data-src="https://github.com/user-attachments/assets/d564b128-6384-454a-a8fd-182afbe5ebcb" alt="image" height="15%" width="15%">*COMMON CASE FAST*

&nbsp;&nbsp; Making the **common case fast** will tend to enhance performance better than optimizing the rare case. Ironically, the common case is often simpler than the rare case and hence is often easier to enhance. This common sense advice implies that you know what the common case is, which is only possible with careful experimentation and measurement.

## c. Performance via 

<img class="lazy" data-src="https://github.com/user-attachments/assets/f0e6cc2f-a921-4dad-a52a-dccd080125dd" alt="image" height="15%" width="15%">*PARALLELISM*

&nbsp;&nbsp; Since the dawn of computing, computer architects have offered designs that get more performance by performing operations in parallel.

## d. Performance via Pipelining

<img class="lazy" data-src="https://github.com/user-attachments/assets/2d4f131b-1d75-4d15-b842-748a12abf82e" alt="image" height="15%" width="15%">*PIPELINING*

&nbsp;&nbsp; A particular patern of parallelism is so prevalent in computer architecture that it merits its own name: **pipelining**.

## e. Performance via Prediction

<img class="lazy" data-src="https://github.com/user-attachments/assets/0fc5ecc4-2e97-4229-ac7f-e32b8d5def95" alt="image" height="15%" width="15%">*PREDICTION*

&nbsp;&nbsp; Following the saying that it can be beer to ask for forgiveness than to ask for permission, the next great idea is prediction. In some cases it can be faster on average to guess and start working rather than wait until you know for sure, assuming that the mechanism to recover from a misprediction is not too expensive and your prediction is relatively accurate.

## f. Hierarchy of Memories

<img class="lazy" data-src="https://github.com/user-attachments/assets/f9f6663b-63bb-493a-beeb-0c3513259233" alt="image" height="15%" width="15%">*HIERARCHY*

&nbsp;&nbsp; Programmers want memory to be fast, large, and cheap, as memory speed often shapes performance, capacity limits the size of problems that can be solved, and the cost of memory today is often the majority of computer cost. Architects have found that they can address these conflicting demands with a hierarchy of memories, with the fastest, smallest, and most expensive memory per bit at the top of the hierarchy and the slowest, largest, and cheapest per bit at the bottom. We use a layered triangle icon to represent the memory hierarchy. The shape indicates speed, cost, and size: the closer to the top, the faster and more expensive per bit the memory; the wider the base of the layer, the bigger the memory.

## g. Dependability via Redundancy

<img class="lazy" data-src="https://github.com/user-attachments/assets/dd898c34-d716-4990-b07e-9eb6b0bf625c" alt="image" height="15%" width="15%">*DEPENDABILITY*

&nbsp;&nbsp; Computers not only need to be fast; they need to be dependable. Since any physical device can fail, we make systems **dependable** by including redundant components that can take over when a failure occurs *and* to help detect failures. 

# 1.3 Below Your Program

<img class="lazy" data-src="https://github.com/user-attachments/assets/88804cf0-05c4-4f03-8319-3161edd6f5b7#right" alt="image" height="5%" width="5%">*&nbsp;&nbsp; The hardware in a computer can only execute extremely simple low-level instructions. To go from a complex application to the simple instructions involves several layers of software that interpret or translate high-level operations into simple computer instructions, an example of the great idea of **abstraction**.*

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/789e20a1-818f-43f4-8505-4dcaa0b7a9e9#center" alt="image" height="30%" width="30%">

&nbsp;&nbsp; Image shows that these layers of software are organized primarily in a hierarchical fashion, with applications being the outermost ring and a variety of **systems software**[^9] sitting between the hardware and applications software.

&nbsp;&nbsp; There are many types of systems software, but two types of systems software are central to every computer system today: an operating system and a compiler. An **operating system**[^10] interfaces between a user’s program and the hardware and provides a variety of services and supervisory functions. Among the most important functions are:

* Handling basic input and output operations
* Allocating storage and memory
* Providing for protected sharing of the computer among multiple applications using it simultaneously

<br>

&nbsp;&nbsp; **Compilers**[^11] perform another vital function: the translation of a program written in a high-level language, such as C, C++ or Java into instructions that the hardware can execute. Given the sophistication of modern programming languages and the simplicity of the instructions executed by the hardware, the translation from a high-level language program to hardware instructions is complex.

## a. From a High-Level Language to the Language of Harware

&nbsp;&nbsp; To speak to electronic hardware, you need to send electrical signals. The easiest signals for computers to understand are *on* and *off*, and so the computer alphabet is just two letters. These two letters of the computer alphabet do not limit what computers can do. The tow symbols for these two letters are the numbers 0 and 1, we refer to each "letter" as a **binary digit**[^12] or **bit**. Computers are slaves to our commands, which are called **instructions**[^13]. Instructions, which are just collections of bits that the computer understands and obeys, can be thought of as numbers.

### i. assembler

&nbsp;&nbsp; **Assembler** translates a symbolic version of an instruction into the binary version. For example, the programmar would write

```
add A, B
```

and the assembler would translate this notation into

```
1000110010100000
```

&nbsp;&nbsp; This instruction tells the computer to add the two numbers A and B. The name coined for this symbolic language, still used today, is **assembly language**[^14]. In contrast, the binary language that the machine understands is the **machine language**[^15]. However assembly language requires the programmer to write one line for every instruction that the computer will follow, forcing the programmer to think like the computer.

<img class="lazy" data-src="https://github.com/user-attachments/assets/88804cf0-05c4-4f03-8319-3161edd6f5b7#right" alt="image" height="5%" width="5%">*&nbsp;&nbsp; The recognition that a program could be written to translate a more powerful language into computer instructions was one of the great breakthroughs in the early days of computing. Programmers today owe their productivity—and their sanity—to the creation of **high-level programming languages**[^16] and compilers that translate programs in such languages into instructions. The figure below shows the relationships among these programs and languages, which are further examples of the power of **abstraction**.*

<img class="lazy" data-src="https://github.com/user-attachments/assets/745c66a1-9892-442f-9fa4-ec5eb098026d#center" alt="Light Mode Image" id="light-mode-img" height="60%" width="60%">
<img class="lazy" data-src="https://github.com/user-attachments/assets/87d8268e-7e6d-4c1e-80e7-1962316c90c9#center" alt="Dark Mode Image" id="dark-mode-img" height="60%" width="60%">

<div class="bg"></div>

&nbsp;&nbsp; High-level programming languages offer several important benefits. First, they allow the programmer to think in a more natural language, using English words and algebraic notation, resulting in programs that look much more like text than like tables of cryptic symbols. Moreover, they allow languages to be designed according to their intended use.

&nbsp;&nbsp; The second advantage of programming languages is improved programmer productivity. It takes less time to develop programs when they are writtn in languages that require fewer lines to express an idea. Conciseness is a clear advantage of high-level languages over assembly language.

&nbsp;&nbsp; The final advantage is that programming languages allow programs to be independent of the computer on which they were developed, since compilers and assemblers can translate high-level language programs to the binary instructions of any computer.

# 1.4 Under the Covers

&nbsp;&nbsp; Two key components of compters are **input devices**[^17], such as the microphone, and **output devices**[^18], such as the speaker. As the names suggest, input feeds the computer, and output is the result of computation sent to the user.

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/8a839a5b-f100-48e3-b178-3f6e5551f54a#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; The five classic components of a computer are input, output, memory, datapath, and control, with the last two sometimes combined and called the processor. This standard organization of computer is independent of harware technology: you can place every piece of every computer, past and present, into one of these five categories.

## a. Trough the Looking Glass

&nbsp;&nbsp; The most fascinating I/O device is probably the graphics display. Most personal mobile devices use **liquid crystal displays(LCDs)**[^19] to get a thin, low-power display. Today, most LCD displays use an **active matrix**[^20] that has a tiny transistor switch at each pixel to precisely control current and make sharper images.

&nbsp;&nbsp; The image is composed of a matrix of picture elements, or **pixels**[^21], which can be represented as a matrix of bits, called a *bit map*. A color display might use 8 bits for each of the three colors(red, blue, and green), for 24 bits per pixel, permitting millions of different colors to be displayed.

## b. Touchscreen

&nbsp;&nbsp; The tablets and smartphones of the PostPC era have replaced the keyboard and mouse with touch sensitive displays, which has the wonderful user interface advantage of users pointing directly what they are interested in rather than indirectly with a mouse.

## c. Opening the Box

<img class="lazy" data-src="https://github.com/user-attachments/assets/adfe0940-91da-4fc1-becb-c3c76cb120e3#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; The small rectangels contain the devices that drive our advancing technology, called **integrated circuits**[^22] and nicknamed **chips**. The *processor* is the active part of the computer, following the instructions of a program to the letter. It adds numbers, tests numbers, signals I/O devices to activate, and so on. Occasionally, people call the processor the **CPU**, for more bureaucratic-sounding **central processor unit**[^23].

&nbsp;&nbsp; The processor logically comprises two main components: datapath and control, the respective brawn and brain of the processor. The **datapath**[^24] performs the arithmetic operations, and **control**[^25] tells the datapath, memory, and I/O devices what to do according to the wishes of the instructions of the program.

&nbsp;&nbsp; The **memory**[^26] is where the programs are kept when they are running; it also contains the data needed by the running programs. The memory is a DRAM chip. *DRAM* stands for **dynamic random access memory**[^27]. DRAMs are used together to contain the instructions and data of a program.

<img class="lazy" data-src="https://github.com/user-attachments/assets/f9f6663b-63bb-493a-beeb-0c3513259233#right" alt="image" height="5%" width="5%">*&nbsp;&nbsp; Inside the processor is another type of memory—cache memory. **Cache memory**[^28] consists of a small, fast memory that acts as a buffer for the DRAM memory. Cache is built using a different memory technology, **static random access memory(SRAM)**[^29]. SRAM is faster but less dense, and hence more expensive, than DRAM. SRAM and DRAM are two layers of the **memory hierarchy**.*

&nbsp;&nbsp; One of the most important **abstractions** is the interface between the hardware and the lowest-level software. Software communicates to hardware via a vocabulary which are called instructions, and the vocabulary itself is called the **instruction set architecture**[^30], or simply **architecture**, of a computer. The intruction set architecture includes anything programmers need to know to make a binary machine language program work correctly, including instructions, I/O devices, and so on.

&nbsp;&nbsp; Typivally, the operating system will encapsulate the details of doing I/O, allocating memory, and other low-level system functions. The combination of the basic instruction set and the operating system interface provided for application programmers is called the **application binary interface(ABI)**[^31].

&nbsp;&nbsp; An instruction set architecture allows computer designers to talk about functions independently from the hardware that performs them. Computer designers distinguish architecture from an **implementation**[^32] of an architecture along the same lines: an implementation is hardware that obeys the architecture abstraction.

## d. A Safe Place for Date

&nbsp;&nbsp; If we were to lose power to the computer, everything would be lost because the memory inside the computer is **volatile**[^33]—that is, when it loses power, it forgets. In contrast, a DVD disk doesn't forget the movie when you turn off the power to the DVD player, and is thus a **nonvolatile memory**[^34] technology.

<img class="lazy" data-src="https://github.com/user-attachments/assets/f9f6663b-63bb-493a-beeb-0c3513259233#right" alt="image" height="5%" width="5%">*&nbsp;&nbsp; To distinguish between the volatile memory used to hold data and programs while they are running and this nonvolatile memory used to store data and programs between runs, the term **main memory** or **primary memory** is used for the former, and **secondary memory** for the latter. Secondary memory forms the next lower layer of the **memory hierarchy**.*

## e. Communicating with Other Computers

&nbsp;&nbsp; Networked computers have several major advantages:

* *Communication*: Information is exchanged between computers at high speeds.
* *Resource sharing*: Rather than each computer having its own I/O devices, computers on the network can share I/O devices.
* *Nonlocal access*: By connecting computers over long distances, users need not be near the computer they are using.

&nbsp;&nbsp; **Local area networks** are interconnected with switched that can also provide routing services and security. **Wide area networks** cross continents and are the backbone of the Internet, which supports the web. They are typically based on optical fibers and are leased from telecommunication companies. Currently available wireless technologies, called by the IEEE standard name 802.11ac, allow for transmission rates from 1 to 1300 million bits per second. Wireless technology is quite a bit different from wire-based networks, since all users in an immediate area share the airwaves.

# 1.5 Technologies for Building Processors and Memory

&nbsp;&nbsp; A **transistor** is simply an on/off switch controlled by electricity. The *integrated circuit*(IC) combined dozens to hundreds of transistors into a single chip. **Very large-scale integrated circuit**(VLSI) is a device containing hundreds of thousands to millions of transistors. 

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/066033fd-e539-4dc8-aee2-0ab2a2a68d8a#center" alt="image" height="90%" width="90%">*&nbsp;&nbsp; The DRAM industry quadrupled capacity almost every three years, a 60% increase per year, for 20 years. In recent years, the rate has slowed down and is somewhat closer to doubling three years. With the slowing of Moore's Law and difficulties in reliable manufacturing of smaller DRAM cells given the challenging aspect ratios of their three-dimensional structure.*

# 1.6 Performance

## a. Defining Performance

<img class="lazy" data-src="https://github.com/user-attachments/assets/c23dd429-68f4-46ea-9868-2c8bcd071a25#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; You could define the fastest plane as the one with the highest cruising speed, taking a single passenger from one point to another in the least time. If you were interested in transporting 500 passengers from one point to another, however, the Airbus A380-800 would clearly be the fastest. Similarly, we can define computer performance in several different ways.

&nbsp;&nbsp; As an individual computer user, you are interested in reducing **response time**[^35]—the time between the start and comletion of a task—also referred to as **excution time**. Datacenter managers are often interested in increasing **throughput**[^36] or **bandwidth**—the total amount of work done in a given time. Hence, in most cases, we will need different performance metrics as well as different sets of applications to benchmark personal mobile devices, which are more focused on response time, versus servers, which are more focused on throughput.

<div class="bg"></div>

&nbsp;&nbsp; To maximize performance, we want to minimize response time or execution time for a computer X:

$$
\textrm{Performance}_{\textrm{X}}=\frac{1}{\textrm{Execution time}_{\textrm{X}}}
$$

<div class="bg"></div>

&nbsp;&nbsp; This means that for two computers X and Y, if the performance of X is greater than the performance of Y, we have

$$
\begin{aligned}
\textrm{Performance}_{\textrm{X}}&> \textrm{Performance}_{\textrm{Y}} \\
\frac{1}{\textrm{Execution time}_{\textrm{X}}}&>\frac{1}{\textrm{Execution time}_{\textrm{Y}}} \\
\textrm{Execution time}_{\textrm{Y}}&>\textrm{Execution time}_{\textrm{X}}
\end{aligned}
$$

&nbsp;&nbsp; That is, the execution time on Y is longer than that on X, if X is faster than Y.

&nbsp;&nbsp; In discusing a computer design, we often to relate the performance of two different computers quantitatively. We will use the phrase "X is *n* times faster than Y"—or equivalently "X is *n* times as fast as Y"—to mean

$$
\frac{\textrm{Performance}_{\textrm{X}}}{\textrm{Performance}_{\textrm{Y}}}=n
$$

&nbsp;&nbsp; If X is *n* times as fast as Y, then the execution time on Y is *n* times as ling as it is on X:

$$
\frac{\textrm{Performance}_{\textrm{X}}}{\textrm{Performance}_{\textrm{Y}}}=\frac{\textrm{Execution time}_{\textrm{Y}}}{\textrm{Execution time}_{\textrm{X}}}=n
$$

## b. Measuring Performance

&nbsp;&nbsp; Time is the measure of computer performance: the computer that performs the same amount of work in the least time is the fastest. Time can be defined in different ways, depending on what we count. The most straightforward definition of time is called *wall clock time*, *response time*, or *elapsed time*. These terms mean the total time to complete a task, including disk accesses, memory accesses, *input/output* (I/O) activities, operating system overhead—everything.

&nbsp;&nbsp; **CPU execution time**[^37] or simply **CPU time**, which recognized this distinction, is the time the CPU spends computing for this task and does not include time spent waiting for I/O or running other programs. CPU time can be further divided into the CPU time spent in the program, called **user CPU time**[^38], and the CPU time spent in the operating system performing tasks on behalf of the program, called **system CPU time**[^39]. 

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/74f60a50-adcb-4c3b-aab6-ce7da4bbb949#center" alt="image" height="50%" width="50%">

&nbsp;&nbsp; We will use the term *system performance* to refer to elapsed time on an unloaded system and *CPU performance* to refer to user CPU time. Almost all computers are constructed using a clock that determines when events take place in the hardware. These discrete time intervals are called **clock cycles**[^40] (or **ticks**, **clock ticks**, **clock periods**, **clocks**, **cycles**). Designers refer to the length of a **clock period**[^41] both as the time for a complete *clock cycle* and as the *clock rate*, which is the inverse of the clock period.

* **Clock cycle**: The time between rising edges of a repetitive clock signal.
* **Clock rate**: Or clock speed typically refers to the frequency at which the clock generator of a processor can generate pulses, and is used as an indicator of the processor's speed. It is measured in the SI unit of frequency hertz (Hz).

$$
\begin{aligned}
    \textrm{Clock period (T)}&=\textrm{Clock cycle time(CCT)}\\
    &=\frac{1}{\textrm{Clock rate (f)}}
\end{aligned}
$$

## c. CPU Performance and Its Factors

&nbsp;&nbsp; The bottom-line performance measure is CPU execution time. A simple formula relates the most basic metrics (clock cycles and clock cycle time) to CPU time:

$$
\textrm{CPU}_\textrm{execution time for a program}=\textrm{CPU}_\textrm{clock cycles for a program} \times \textrm{Clock cycle time}
$$

&nbsp;&nbsp; Alternatively, because clock rate and clock cycle time are inverses,

$$
\textrm{CPU}_\textrm{execution time for a program}=\frac{\textrm{CPU}_\textrm{clock cycles for a program}}{\textrm{Clock rate}}
$$

&nbsp;&nbsp; This formula makes it clear that the hardware designer can improve performance by reducing the number of clock cycles required for a program or the length of the clock cycle. As we will see in later chapters, the designer often faces a trade-off between the number of clock cycles needed for a program and the length of each cycle. Many techniques that decrease the number of clock cycles may also increase the clock cycle time.

&nbsp;&nbsp; In other words, to summarize the formula once again:

$$
\begin{aligned}
    \textrm{CPU}_\textrm{time} &= \textrm{CPU}_\textrm{clock cycles} \times \textrm{Clock cycle time}\\
    &= \frac{\textrm{CPU}_\textrm{clock cycles}}{\textrm{Clock rate}}
\end{aligned}
$$

<div class="bg"></div>

> **Improving Performance**
> 
> &nbsp;&nbsp; Computer A runs a program in 10 seconds with a clock rate of 2 GHz. Computer B needs to run the same program in 6 seconds and will require 1.2 times as many clock cycles. What should be the target clock rate for computer B?
> <details><summary><strong>Answer</strong></summary>
> 
> Let's first find the number of clock cycles required for the program on A:
>
> $$
> \begin{aligned}
    \textrm{CPU}_{\textrm{time}_{\textrm{A}}}&=\frac{\textrm{CPU}_{\textrm{clock cycles}_{\textrm{A}}}}{\textrm{Clock rate}_{\textrm{A}}}\\\\
    \textrm{10}\ \textrm{seconds}&=\frac{\textrm{CPU}_{\textrm{clock cycles}_{\textrm{A}}}}{2 \times 10^{9}\frac{\textrm{cycles}}{second}} \quad (\because 1\textrm{GHz} = 10^{9}\textrm{Hz})
\end{aligned}
> $$
>
> $$
> \textrm{CPU}_{\textrm{clock cycles}_{\textrm{A}}}= 10\ \textrm{seconds} \times 2 \times 10^{9}\frac{\textrm{cycles}}{second}=20\times 10^{9} \textrm{cycles}
> $$
>
> &nbsp;&nbsp; CPU time for B can be found using this equation:
>
> $$
> \begin{aligned}
    \textrm{CPU}_{\textrm{time}_\textrm{B}}&=\frac{1.2 \times \textrm{CPU}_{\textrm{clock cycles}_{\textrm{A}}}}{\textrm{Clock rate}_{\textrm{B}}} \\\\
    6\ \textrm{seconds} &= \frac{1.2\times 20\times 10^{9}\ \textrm{cycles}}{\textrm{Clock rate}_\textrm{B}}
\end{aligned}
> $$
>
> $$
> \begin{aligned}
\textrm{Clock rate}_\textrm{B}&=\frac{1.2\times20\times10^9\ \textrm{cycles}}{6\ \textrm{seconds}}\\
&=\frac{0.2\times20\times10^9\ \textrm{cycles}}{\textrm{second}}\\
&=\frac{4\times 10^9 \ \textrm{cycles}}{\textrm{second}}\\
&=4\ \textrm{GHz}
\end{aligned}
> $$
>
> &nbsp;&nbsp; To run the program in 6 seconds, B must have twice the clock rate of A.
> </details>

## d. Instruction Performance

&nbsp;&nbsp; The performance equations above did not include any reference to the number of instructions needed for the program. However, since the compiler clearly generated instructions to execute, and the computer had to execute the instructions to run the program, the execution time must depend on the number of instructions in a program. One way to think about execution time is that it equals the number of instructions executed multiplied by the average time per instruction. Therefore, the number of clock cycles required for a program can be written as

$$
\begin{aligned}
  \textrm{CPU}_\textrm{clock cycles}&=\textrm{Instructions for a program}\times\textrm{Averageclock cycles per instruction}\\
  &= \textrm{Instruction count} \times \textrm{CPI}
\end{aligned}
$$

&nbsp;&nbsp; The term **clock cycles per instruction**[^42], which is the average number of clock cycles each instruction takes to execute, is often abbreviated as **CPI**. CPI is an average of all the instructions executed in the program. CPI provides one way of comparing two different implementations of the same instruction set architecture, since the number of instructions executed for a program will, of course, be the same.

<div class="bg"></div>

> **Using the Performance Equation**
>
> Two computers, A and B, use the same instruction set architecture. Computer A has a clock cycle time of 250 ps and a CPI of 2.0, while computer B has a clock cycle time of 500 ps and a CPI of 1.2. Which computer is faster, and by how much?
>
> <details><summary><strong>Answer</strong></summary>
> 
> We know that each computer executes the same number of instructions for the program; let's call this number *I*. Fisrt, find the number of processor clock cycles for each computer:
>
> $$
> \begin{aligned}
    \textrm{CPU}_{\textrm{clock cycle}_\textrm{A}} &= I \times 2.0 \\
    \textrm{CPU}_{\textrm{clock cycle}_\textrm{B}} &= I \times 1.2
\end{aligned}
> $$
>
> &nbsp;&nbsp; Now we can compute the CPU time for each computer:
>
> $$
> \begin{aligned}
    \textrm{CPU}_{\textrm{time}_\textrm{A}} &= \textrm{CPU}_{\textrm{clock cycle}_\textrm{A}} \times \textrm{Clock cycle time}\\
    &= I \times 2.0 \times 250 \ \textrm{ps}\\
    &= 500 \times I \ \textrm{ps}
\end{aligned}
> $$
>
> &nbsp;&nbsp; Likewise, for B:
>
> $$
> \begin{aligned}
    \textrm{CPU}_{\textrm{time}_\textrm{B}} &= I \times 1.2 \times 500 \ \textrm{ps}\\
    &= 600 \times I \ \textrm{ps}
\end{aligned}
> $$
>
> &nbsp;&nbsp; Clearly, computer A is faster. The amount faster is given by the ratio of the execution times:
>
> $$
> \begin{aligned}
    \frac{\textrm{CPU}_{\textrm{performance}_\textrm{A}}}{\textrm{CPU}_{\textrm{performance}_\textrm{B}}} &= \frac{\textrm{Execution time}_\textrm{A}}{\textrm{Execution time}_\textrm{B}}\\
    &= \frac{600 \times I \ \textrm{ps}}{500 \times I \ \textrm{ps}}\\
    &= 1.2
\end{aligned}
> $$
>
> &nbsp;&nbsp; We can conclude that computer A is 1.2 times as fast as computer B for this program.
> 
> </details>

## e. The Classic CPU Performance Equation

&nbsp;&nbsp; We can now write this basic performance equation in terms of **insruction count**[^43] (the number of instructions executed by the program), CPI, and clock cycle time:

$$
\textrm{CPU}_\textrm{times} = \textrm{Instruction count} \times \textrm{CPI} \times \textrm{Clock cycle time}
$$

&nbsp;&nbsp; or, since the clock rate is the inverse of clock cycle time:

$$
\textrm{CPU}_\textrm{times} = \frac{\textrm{Instruction count} \times \textrm{CPI}}{\textrm{Clock rate}}
$$

<div class="bg"></div>

> **Comparing Code Segments**
>
> &nbsp;&nbsp; CPI information provided by the hardware designer:
> 
> <style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-baqh{text-align:center;vertical-align:top}
.tg .tg-amwm{font-weight:bold;text-align:center;vertical-align:top}
> </style>
> <table class="tg"><thead>
>   <tr>
>     <th class="tg-amwm" colspan="4">CPI for each instruction class</th>
>   </tr></thead>
> <tbody>
>   <tr>
>     <td class="tg-baqh"></td>
>     <td class="tg-amwm">A</td>
>     <td class="tg-amwm">B</td>
>     <td class="tg-amwm">C</td>
>   </tr>
>   <tr>
>     <td class="tg-amwm">CPI</td>
>     <td class="tg-baqh">1</td>
>     <td class="tg-baqh">2</td>
>     <td class="tg-baqh">3</td>
>   </tr>
> </tbody>
> </table>
>
> <div class="bg"></div>
> <div class="bg"></div>
>
> &nbsp;&nbsp; Machine code generated by the compiler for the given program:
> 
> <table style="border-collapse:collapse;border-spacing:0" class="tg"><thead><tr><th style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal" colspan="4">Instruction counts for each instruction class</th></tr></thead><tbody><tr><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal"><span style="font-weight:bold">Code sequence</span></td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">A</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">B</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">C</td></tr><tr><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">1</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">2</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">1</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">2</td></tr><tr><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">2</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">4</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">1</td><td style="border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">1</td></tr></tbody></table>
> 
> <div class="bg"></div>
> 
> &nbsp;&nbsp; Which code sequence executes the most instructions? Which will be faster? What is the CPI for each sequence?
>
> <details><summary><strong>Answer</strong></summary>
>
> &nbsp;&nbsp; Sequence 1 executes 2+1+2=5 instructions. Sequence 2 executes 4+1+1=6 instructions. Therefore, sequence 2 executes more instructions.
>
> &nbsp;&nbsp; We can use the equation for CPU clock cycles based on instruction count and CPI to find the total number of clock cycles for each sequence:
> 
> $$
> \textrm{CPU}_\textrm{clock cycles} = \sum_{i=1}^{n}\left ( \textrm{CPI}_i \times \textrm{C}_i \right )
> $$
>
> &nbsp;&nbsp; This yields
>
> $$
> \begin{aligned}
    \textrm{CPU}_{\textrm{clock cycles}_1} &= (2 \times 1) + (1 \times 2) + (2 \times 3)\\
    &= 2 + 2 + 6\\
    &= 10 \ \textrm{cycles} \\\\
    \textrm{CPU}_{\textrm{clock cycles}_2} &= (4 \times 1) + (1 \times 2) + (1 \times 3)\\
    &= 4 + 2 + 3\\
    &= 9 \ \textrm{cycles}
\end{aligned}
> $$
>
> &nbsp;&nbsp; So code sequence 2 is faster, even though it executes one extra instructions. Since code sequence 2 takes fewer overall clock cycle but has more instructions, it must have a lower CPI. The CPI values can be computed by
>
> $$
> \begin{aligned}
  \textrm{CPI} &= \frac{\textrm{CPU}_\textrm{clock cycles}}{\textrm{Instruction count}} \\
  \textrm{CPI}_1 &= \frac{\textrm{CPU}_{\textrm{clock cycles}_1}}{\textrm{Instruction count}_1} = \frac{10}{5} = 2.0 \\
  \textrm{CPI}_2 &= \frac{\textrm{CPU}_{\textrm{clock cycles}_2}}{\textrm{Instruction count}_2} = \frac{9}{6} = 1.5 \\
\end{aligned}
> $$
>
> &nbsp;&nbsp; Code sequence 2 has a higher instruction count but fewer total clock cycles and a lower CPI, resulting in better performance. A higher instruction count does not necessarily mean slower program execution. In fact, the total number of CPU cycles and CPI are more critical performance metrics. A code sequence with fewer total CPU cycles and a lower CPI is faster. This indicates more efficient execution, with each instruction using fewer cycles at the same clock period.
> 
> </details>

## f. Summary of Key Points

<img class="lazy" data-src="https://github.com/user-attachments/assets/b714f9aa-1f44-4cac-a4c2-33670ee5f6a9#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; It shows the basic measurements at different levels in the computer and what is being measured in each case. We can see how these factors are combined to yield exectution time measured in seconds per program:

$$
\begin{aligned}
    \textrm{Time} &= \textrm{Seconds} / \textrm{Program} \\
                  &= \frac{\textrm{Instructions}}{\textrm{Program}} \times \frac{\textrm{Clock cycles}}{\textrm{Instruction}} \times \frac{\textrm{Seconds}}{\textrm{Clock cycle}}
\end{aligned}
$$

&nbsp;&nbsp; Always bear in mind that the only complete and reliable measure of computer performance is time. For example, changing the instruction set to lower the instruction count may lead to an organization with a slower clock cycle time or higher CPI that offsets the improvement in instruction count. Similarly, because CPI depends on type of instructions executed, the code that executes the fewest number of instructions may not be the fastest.

<div class="bg"></div>

&nbsp;&nbsp; We can measure the **CPU execution time**  by running the program, and the **clock cycle time** is usually published as part of the documentation for a computer. We can measure the **instruction count** by using software tools that profile the execution or by using a simulator of the architecture. The **CPI** depends on a wide variety of design details in the computer, including both the memory system and the processor structure, as well ass on the mix of instruction types executed in an application. Thus, CPI varies by application, as well as among implementations with the same instruction set.

> **Understanding Program Performance**
>
> &nbsp;&nbsp; The performance of a program depends on the algorithm, the language, the compiler, the architecture, and the actual hardware.
>
> <style type="text/css">.tg  {border-collapse:collapse;border-spacing:0;}.tg td{border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;overflow:hidden;padding:10px 5px;word-break:normal;}.tg th{border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}.tg .tg-iqjm{background-color:var(--color-primary-500);border-color:var(--color-primary-600);text-align:center;vertical-align:middle}.tg .tg-0pky{border-color:var(--color-primary-600);text-align:left;vertical-align:top}</style><table class="tg"><thead><tr><th class="tg-iqjm">Hardware or software component</th><th class="tg-iqjm">Affects what?</th><th class="tg-iqjm">How?</th></tr></thead><tbody><tr><td class="tg-0pky">Algorithm</td><td class="tg-0pky">Instruction count, possibly CPI</td><td class="tg-0pky">The algorithm determines the number of source program instructions executed and hence the number of processor instructions executed. The algorithm may also affect the CPI, by favoring slower or faster instructions. For example, if the algorithm uses more divides, it will tend to have a higher CPI.</td></tr><tr><td class="tg-0pky">Programming language</td><td class="tg-0pky">Instruction count, CPI</td><td class="tg-0pky">The programming language certainly affects the instruction count, since statements in the language are translated to processor instructions, which determine instruction count. The language may also affect the CPI because of its features; for example, a language with heavy support for data abstraction (e.g., Java) will require indirect calls, which will use higher CPI instructions.</td></tr><tr><td class="tg-0pky">Compiler</td><td class="tg-0pky">Instruction count, CPI</td><td class="tg-0pky">The efficiency of the compiler affects both the instruction count and average cycles per instruction, since the compiler determines the translation of the source language instructions into computer instructions. The compiler’s role can be very complex and affect the CPI in complicated ways.</td></tr><tr><td class="tg-0pky">Instruction set architecture</td><td class="tg-0pky">Instruction count, clock rate, CPI</td><td class="tg-0pky">The instruction set architecture affects all three aspects of CPU performance, since it affects the instructions needed for a function, the cost in cycles of each instruction, and the overall clock rate of the processor.</td></tr></tbody></table>

# 1.7 The Power Wall

<img class="lazy" data-src="https://github.com/user-attachments/assets/a57ecc50-84b9-4a21-9c72-49052a8fbf81#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; It shows the increase in clock rate and power of nine generations of Intel microprocessors over 36 years. Both clock rate and pewer increased rapidly for decades, and then flattened or dropped off recently.

&nbsp;&nbsp; The dominant technology for integrated circuits is called **CMOS**(complementary metal oxide semiconductor). For CMOS, the primary source of energy consumption is so-called dynamic energy—that is, energy that is consumed when transistors switch states from 0 to 1 and vice versa. The dynamic energy depends on the capacitive loading of each transistor and the voltage applied. This equation is the energy of a pulse during the logic transition of 0 → 1 → 0 or 1 → 0 → 1. The power required per transistor is just the product of energy of a transition and the frequency of transistions:

$$
Power \propto \frac{1}{2} \times Capacitive\ load \times Voltage^2 \times Frequency\ switched
$$

&nbsp;&nbsp; Frequency switched is a function of the clock rate. The capacitive load per transistor is a function of both the number of transistors connected to an output (called the *fanout*) and the technology, which determines the capacitance of both wires and transistors. In 20 years, voltages have gone from 5 V to 1 V, which is why the increase in power is only 30 times.

> **Relative Power**
>
> &nbsp;&nbsp; Suppose we developed a new, simpler processor that has 85% of the capacitive load of the more complex older processor. Further, assume that it has adjustable voltage so that it can reduce voltage 15% compared to processor B, which results in a 15% shrink in frequency. What is the impact on dynamic power?
> 
> <div class="bg"></div>
> 
> <details><summary><strong>Answer</strong></summary>
>
> $$
> \frac{\textrm{Power}_\textrm{new}}{\textrm{Power}_\textrm{old}} =  \frac{ \left< \textrm{Capacitive load} \times 0.85 \right> \times \left< \textrm{Voltage} \times 0.85 \right>^2 \times \left< \textrm{Frequency switched} \times 0.85 \right> }{ \textrm{Capacitive load} \times \textrm{Voltage}^2 \times \textrm{Frequency switched} }
> $$
>
> &nbsp;&nbsp; Thus the power ratio is
>
> $$
> 0.85^4 = 0.52
> $$
>
> &nbsp;&nbsp; Hence, the new processor uses about half the power of the old processor.
> 
> </details>

# 1.8 The Sea Change: The Switch from Uniprocessors to Multiprocessors.

<img class="lazy" data-src="https://github.com/user-attachments/assets/1eae69f2-5b01-4411-a5eb-c6dd6a324c56#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; Rather than continuing to decrease the response time of a single program running on the single processor, as of 2006 all desktop and server companies are shipping microprocessors with multiple processors per chip, where the benefit is often more on throughput than on response time. To reduce confusion between the words processorand microprocessor, companies refer to processors as "cores", and such microprocessors are generically called multicore microprocessor.

&nbsp;&nbsp; Today, for programmmers to get significant improvement in response time, they need to rewrite their programs to take advantage of muliple processors. Moreover, to get the historic benefit of running faster on new microprocessors, programmers will have to continue to improve performance of their code as the number of cores increases.

<img class="lazy" data-src="https://github.com/user-attachments/assets/f0e6cc2f-a921-4dad-a52a-dccd080125dd#right" alt="image" height="2.5%" width="2.5%"><img class="lazy" data-src="https://github.com/user-attachments/assets/2d4f131b-1d75-4d15-b842-748a12abf82e#right" alt="image" height="2.5%" width="2.5%">*&nbsp;&nbsp; To reinforce how the software and hardware systems work hand in hand, we use a special section, <em>Hardware/software Interface</em>. **Parallelism** has always been critical to performance in computing, but it was often hidden. **Pipelining** is one example of <em>instruction-level parallelism</em>, where the parallel nature of the hardware is abstracted away so the programmer and compiler can think of the hardware a executing instructions sequentially.*

&nbsp;&nbsp; Why has it been so hard for programmers to write explicitly parallel programs? The first reason is that parallel programming is by definition performance programming, which increases the difficulty programming. Not only does the program need to be correct, solve an important problem, and provide a useful interface to the people or other programs that invoke it, the program must also be fast.

&nbsp;&nbsp; The second reason is that fast for parallel hardware means that the programmer must divide an application so that each processor has roughly the same amount to do at the same time, and that the overhead of scheduling and coordination doesn’t fritter away the potential performance benefits of parallelism.

# 1.9 Real Stuff: Benchmarking the Intel Core i7

## a. SPEC CPU Benchmark

<img class="lazy" data-src="https://github.com/user-attachments/assets/d564b128-6384-454a-a8fd-182afbe5ebcb#right" alt="image" height="5%" width="5%">*&nbsp;&nbsp; The set of programs run would form a **workload**[^44]. To evaluate two computer systems, a user would simply compare the execution time of the workload on the two computers. This alternative is ususally followed by evaluating the computer using a sef of **benchmarks**—programs specifically chosen to measure performance. As we noted above, to make the **common case fast**, you first need to know accurately which case is common, so benchmarks play a critical role in computer architecture.*

&nbsp;&nbsp; **SPEC** (*System Performance Evaluation Cooperative*) is an effort funded and supported by a number of computer vendors to create standard sets of benchmarks for modern computer systems. In 1989, SPEC originally created a benchmark set focusing on processor performance (now called SEPC89), which has evolved through five generations. The latest is SPEC CPU2017, which consists of a set of 10 integer benchmarks (SPECspeed 2017 Integer) and 13 floating-point benchmarks (SPECspeed 2017 Floating Point). 

<div class="bg"></div>

<img class="lazy" data-src="https://github.com/user-attachments/assets/057838f0-a007-4636-aa99-5a06dd9777a0#center" alt="image" height="90%" width="90%">

&nbsp;&nbsp; It describes the SPEC integer benchmarks and their execution time on the Intel Core i7 and shows the factors that explain execution time: instruction count, CPI, and clock cycle time. Note that CPI varies by more than a factor of 4.

&nbsp;&nbsp; To simplify the marketing of computers, SPEC decided to report a single number to summarize all 10 integer benchmarks. Dividing the execution time of a reference processor by the execution time of the measured computer normalizes the execution time measurments; this normalization yields a measure, called the *SPECratio*, which has the advantage that bigger numeric results indicate faster performance. That is, the SPECratio is the inverse of execution time.

# 1.10 Fallacies and Pitfalls

<img class="lazy" data-src="https://github.com/user-attachments/assets/d564b128-6384-454a-a8fd-182afbe5ebcb#right" alt="image" height="5%" width="5%">*&nbsp;&nbsp; The great idea of making the common case fast has a demoralizing corollary that has plagued designers of both hardware and software. It reminds us that the opportunity for improvement is affected by how much time the event consumes.*

&nbsp;&nbsp; Suppose a program runs in 100 seconds on a computer, with multiply operations responsible for 80 seconds of this time. How much do I have to improve the speed of multiplication if I want my program to run five times faster?

&nbsp;&nbsp; The execution time of the program after making the improvement is given by the following simple equation known as **Amdahl's Law**[^45]:

$$
\textrm{Execution time after improvement} = \frac{ \textrm{Execution time affected by improvement} }{ \textrm{Amount of improvement} } + \textrm{Execution time unaffected}
$$

&nbsp;&nbsp; For this problem:

$$
\textrm{Execution time after improvement} = \frac{ \textrm{80 seconds} }{ n } + \textrm{20 seconds}
$$

&nbsp;&nbsp; Since we want the performance to be five times faster, the new execution time should be 20 seconds, giving

$$
\begin{aligned}
    \textrm{20 seconds} &= \frac{ \textrm{80 seconds} }{ n } + \textrm{20 seconds} \\
                      0 &= \frac{ \textrm{80 seconds} }{ n }
\end{aligned}
$$

&nbsp;&nbsp; That is, there is *no amount* by which we can enhance-multiply to achieve a fivefold increase in performance, if multiply accounts for only 80% of the workload. The performance enhancement possible with a given improvement is limited by the amount that the improved feature is used.

<div class="bg"></div>

&nbsp;&nbsp; We have already warned about the danger of predicting performance based on simply one of clock rate, instruction count, or CPI. Another common mistake is to use only two of the three factors to compare performance. Although using two of the three factors may be valid in a limited context, the concept is also easily misused.

&nbsp;&nbsp; One alternative to time is **MIPS (million instructions per second)**[^46]. For a given program, MIPS is simply

$$
\textrm{MIPS} = \frac{\textrm{Instruction count}}{ \textrm{Execution time} \times 10^6 }
$$

&nbsp;&nbsp; Since MIPS is an instruction execution rate, MIPS specifies performance inverselyto execution time; faster computers have a higher MIPS rating. The good news about MIPS is that it is easy to understand, and faster computers mean bigger MIPS, which matches intuition.

&nbsp;&nbsp; There are three problems with using MIPS as a measure for comparing computers. First, MIPS specifies the instruction execution rate but does not take into account the capabilities of the instructions. We cannot compare computers with different instruction sets using MIPS, since the instruction counts will certainly differ.

&nbsp;&nbsp; Second, MIPS varies between programs on the same computer; thus, a computer cannot have a single MIPS rating. For example, by substituting for execution time, we see the relationship between MIPS, clock rate, and CPI:

$$
\begin{aligned}
    \textrm{MIPS} &= \frac{ \textrm{Instruction count} }{ \frac{\textrm{Instruction count} \times \textrm{CPI} }{ \textrm{Clock rate} } \times 10^6 } \\
&= \frac{ \textrm{Clock rate} }{ \textrm{CPI} \times 10^6 }
\end{aligned}
$$

<div class="bg"></div>

&nbsp;&nbsp; Finally, and most importantly, if a new program executes more instructions but each instruction is faster, MIPS can vary independently from performance. As a result, since CPI can vary depending on the program even on the same computer, performance comparisons should take into account the number of instructions, CPI, and clock speed.

> **Check Yourself**[^47]
>
> &nbsp;&nbsp; Consider the follwing performance measurements for a program:
>
> <style type="text/css">.tg  {border-collapse:collapse;border-spacing:0;min-width:100%}.tg td{border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:0.875rem;overflow:hidden;padding:10px 5px;word-break:normal;}.tg th{border-color:var(--color-primary-600);border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:1rem;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}.tg .tg-iqjm{background-color:var(--color-primary-500);border-color:var(--color-primary-600);text-align:center;vertical-align:middle}.tg .tg-0pky{border-color:var(--color-primary-600);text-align:left;vertical-align:top}</style><table class="tg"><thead><tr><th class="tg-iqjm">Measurment</th><th class="tg-iqjm">Computer A</th><th class="tg-iqjm">Computer B</th></tr></thead><tbody><tr><td class="tg-0pky">Instruction count</td><td class="tg-0pky">10 biliion</td><td class="tg-0pky">8 billion</td></tr><tr><td class="tg-0pky">Clock rate</td><td class="tg-0pky">4 GHz</td><td class="tg-0pky">4 GHz</td></tr><tr><td class="tg-0pky">CPI</td><td class="tg-0pky">1.0</td><td class="tg-0pky">1.1</td></tr></tbody></table>
>
> <div class="bg"></div>
> 
> a. Which computer has the higher MIPS rating?
> 
> b. Which computer is faster?
> 
> <div class="bg"></div>
> 
> <details><summary><strong>Answer</strong></summary>
> 
> &nbsp;&nbsp; Since <strong>CPI</strong> means clock cycle per instruction count:
>
> $$
> \textrm{CPI} = \frac{ \textrm{CPU}_\textrm{clock cycles} }{ \textrm{Instruction count} }
> $$
>
> &nbsp;&nbsp; Thus, execution time can be expressed as the product of total clock cycles and clock period:
>
> $$
\begin{aligned}
    \textrm{CPU}_\textrm{times} &= \textrm{CPU}_\textrm{clock cycles} \times \textrm{Clock rate} \\
                                &= \textrm{CPI} \times \textrm{Instruction count} \times \textrm{Clock period} \\
                                &= \frac{ \textrm{CPI} \times \textrm{Instruction count} }{ \textrm{Clock rate}}
\end{aligned}
> $$
>
> &nbsp;&nbsp; Therefore, the MIPS formula is:
>
> $$
> \begin{aligned}
    \textrm{MIPS} &= \frac{ \textrm{Instruction count} }{ \textrm{Execution time} \times 10^6 } \\
                  &= \frac{ \textrm{Instruction count} }{ \frac{\textrm{Instruction count} \times \textrm{CPI} }{ \textrm{Clock rate} } \times 10^6 } \\
&= \frac{ \textrm{Clock rate} }{ \textrm{CPI} \times 10^6 } 
\end{aligned}
> $$
>
> <br>
>
> $$
> \begin{aligned}
    \textrm{MIPS}_\textrm{A} &= \frac{ 4 \times 10^9 }{ 1.0 \times 10^6 } = 4000 \textrm{MIPS} \\
    \textrm{MIPS}_\textrm{B} &= \frac{ 4 \times 10^9 }{ 1.1 \times 10^6 } = 3636 \textrm{MIPS}
\end{aligned}
> $$
>
> &nbsp;&nbsp; The MIPS value of Computer A is 4000, which is higher than the MIPS value of Computer B at 3636. Therefore, Computer A has a higher MIPS rating.
>
> $$
> \begin{aligned}
    \textrm{CPU}_{\textrm{times}_\textrm{A}} &= \frac{1.0 \times 10 \times 10^9}{4 \times 10^9 } = 2.5 \textrm{seconds} \\
    \textrm{CPU}_{\textrm{times}_\textrm{B}} &= \frac{1.1 \times 8 \times 10^9}{4 \times 10^9 } = 2.2 \textrm{seconds}
\end{aligned}
> $$
>
> &nbsp;&nbsp; The execution time of Computer B is 2.2 seconds, and the execution time of Computer A is 2.5 seconds, so Computer B is faster.
> 
> </details>


---

[^1]: A computer designed for use by an individual, usually incorporating a graphics display, a keyboard, and a mouse.
[^2]: A computer used for running larger programs for multiple users, often simultaneously, and typically accessed only via a network.
[^3]: A class of computers with the highest performance and cost; they are configured as servers and typically cost tens to hundreds of millions of dollars
[^4]: Originally 1,099,511,627,776(2<sup>40</sup>) bytes, although communications and secondary storage systems developers started using the term to mean 1,000,000,000,000(10<sup>12</sup>) bytes. To reduce confusion, we now use the term **tebibyte**(TiB) for 2<sup>40</sup> bytes, defining terabyte(TB) to mean 10<sup>12</sup> bytes. 
[^5]: A computer inside another device used for running one predetermined application or collection of software.
[^6]: Personal mobile devices (PMDs) are small wireless devices to connect to the Internet; they rely on batteries for power, and software is installed by downloading apps. Conventional examples are smart phones and tablets.
[^7]: Cloud Computing refers to large collections of servers that provide services over the Internet; some providers rent dynamically varying numbers of servers as a utility.
[^8]: Software as a Service (SaaS) delivers software and data as a service over the Internet, usually via a thin program such as a browser that runs on local client devices, instead of binary code that must be installed, and runs wholly on that device. Examples  include web search and social networking.
[^9]: Software that provides services that are commonly useful, including operating systems, compilers, loaders, and assemblers.
[^10]: Supervising program that manages the resources of a computer for the benefit of the programs that run on that computer. Examples of operating systems in use today are Linux, iOS, Android, and Windows.
[^11]: A program that translates high-level language statements into assembly language statements.
[^12]: Also called a **bit**. One of the two numbers in base 2 (0 or 1) that are the components of information.
[^13]: A command that computer hardware understands and obeys.
[^14]: A symbolic representation of machine instructions.
[^15]: A binary representation of machine instructions.
[^16]: A portable language such as C, C++, Java, or Visual Basic that is composed of words and algebraic notation that can be translated by a compiler into assembly language.
[^17]: A mechanism through which the computer is fed inforamation, such as keyboard.
[^18]: A mechanism that conveys the result of a computation to a user, such as a disply, or to another computer.
[^19]: A display technology using a thin layer of liquid polymers that can be used to transmit or block light according to whether a charge is applied.
[^20]: A liquid crystal display using a transistor to control the transmission of light at each individual pixel.
[^21]: The smallest individual picture element. Screens are composed of hundreds of thousands to millions of pixels, organized in a matrix.
[^22]: Also called a chip. A device combining dozens to millions of transistors.
[^23]: Also called processor. The active part of the computer, which contains the datapath and control and which adds numbers, tests number, signals I/O diveces to activate, and so on.
[^24]: The component of the processor that performs arithmetic operations.
[^25]: The component of the processor that commands the datapath, memory, and I/O devices according to the instructions of the program.
[^26]: The storage area in which programs are kept when they are running and that contains the data needed by the running programs.
[^27]: Memory built as an integrated circuit; it provides random access to any location. Access times are 50 nanoseconds and cost per gigabyte in 2020 was \\$3 to \\$6.
[^28]: A small, fast memory that acts as a buffer for a slower, larger memory.
[^29]: Also memory built as an integrated circuit, but faster and less dense than DRAM.
[^30]: Also called architecture. An abstract interface between the hardware and the lowest-level software that encompasses all the information necessary to write a machine language program that will run correctly, including instructions, registers, memory access, I/O, and so on
[^31]: The user portion of the instruction set plus the operating system interfaces used by application programmers. It defines a standard for binary portability across computers.
[^32]: Hardware that obeys the architecture abstraction.
[^33]: Storage, such as DRAM, that retains data only if it is receiving power.
[^34]: A form of memory that retains data even in the absence of a power source and that is used to store programs between runs. A DVD disk is nonvolatile.
[^35]: Also called execution time. The total time required for the computer to complete a task, including disk accesses, memory accesses, I/O activities, operating system overhead, CPU execution time, and so on.
[^36]: Also called bandwidth. Another measure of performance, it is the number of tasks completed per unit time.
[^37]: Also called CPU time. The actual time the CPU spends computing for a specific task.
[^38]: The CPU time spent in a program itself.
[^39]: The CPU time spent in the operating system performing tasks on behalf of the program.
[^40]: Also called **tick**, **clock tick**, **clock period**, **clock**, or **cycle**. The time for one clock period, usually of the processor clock, which runs at a constant rate.
[^41]: The length of each clock cycle.
[^42]: Average number of clock cycles per instruction for a program or program fragment. 
[^43]: The number of instructions executed by the program.
[^44]: A set of programs run on a computer that is either the actual collection of applications run by a user or constructed from real programs to approximate such a mix. A typical workload specifies both the programs and the relative frequencies.
[^45]: A rule stating that the performance enhancement possible with a given improvement is limited by the amount that the improved feature is used. It is a quantitative version of the law of diminishing returns.
[^46]: A measurement of program execution speed based on the number of millions of instructions. MIPS is computed as the instruction count divided by the product of the execution time and $10^{6}$.
[^47]: <style type="text/css">.tg{border-collapse:collapse;border-spacing:0;width:100%}.tg td,.tg th{border-color:#000;border-style:solid;border-width:1px;font-family:Arial,sans-serif;font-size:.875rem;overflow:hidden;padding:10px 5px;word-break:normal}.tg td{background-color:var(--color-primary-300)}.tg th{background-color:var(--color-primary-600)}.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}.tg .tg-yz93{border-color:inherit;text-align:right;vertical-align:middle}.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}.tg .tg-dvpl{border-color:inherit;text-align:right;vertical-align:top}</style><table class="tg"><colgroup><col style="width:33.33%"><col style="width:33.33%"><col style="width:33.33%"></colgroup><thead><tr><th class="tg-c3ow" colspan="3">NUMERICAL CHART</th></tr></thead><tbody><tr><td class="tg-yz93">1</td><td class="tg-c3ow">$10^{0}$</td><td class="tg-0pky">one</td></tr><tr><td class="tg-dvpl">10</td><td class="tg-c3ow">$10^{1}$</td><td class="tg-0pky">ten</td></tr><tr><td class="tg-yz93">100</td><td class="tg-c3ow">$10^{2}$</td><td class="tg-0pky">one hundred</td></tr><tr><td class="tg-yz93">1,000</td><td class="tg-c3ow">$10^{3}$</td><td class="tg-0pky">one thousand</td></tr><tr><td class="tg-yz93">10,000</td><td class="tg-c3ow">$10^{4}$</td><td class="tg-0pky">ten thousand</td></tr><tr><td class="tg-yz93">100,000</td><td class="tg-c3ow">$10^{5}$</td><td class="tg-0pky">one hundred thousand&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td class="tg-yz93">1,000,000</td><td class="tg-c3ow">$10^{6}$</td><td class="tg-0pky">one million</td></tr><tr><td class="tg-yz93">10,000,000</td><td class="tg-c3ow">$10^{7}$</td><td class="tg-0pky">ten million</td></tr><tr><td class="tg-yz93">100,000,000</td><td class="tg-c3ow">$10^{8}$</td><td class="tg-0pky">one hundred million</td></tr><tr><td class="tg-yz93">1,000,000,000</td><td class="tg-c3ow">$10^{9}$</td><td class="tg-0pky">one billion</td></tr><tr><td class="tg-yz93">10,000,000,000</td><td class="tg-c3ow">$10^{10}$</td><td class="tg-0pky">ten billion</td></tr><tr><td class="tg-yz93">100,000,000,000</td><td class="tg-c3ow">$10^{11}$</td><td class="tg-0pky">one hundred billion</td></tr><tr><td class="tg-yz93">1,000,000,000,000</td><td class="tg-c3ow">$10^{12}$</td><td class="tg-0pky">one trillion</td></tr><tr><td class="tg-yz93">10,000,000,000,000</td><td class="tg-c3ow">$10^{13}$</td><td class="tg-0pky">ten trillion</td></tr><tr><td class="tg-yz93">100,000,000,000,000</td><td class="tg-c3ow">$10^{14}$</td><td class="tg-0pky">one hundred trillion</td></tr></tbody></table>
