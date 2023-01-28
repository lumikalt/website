---
title: Maths 💜 Quantum Computing
pubDate: 26 Jan 2023
description: The basics of math required to understand quantum computing.
---

# The Maths essential for Quantum Computing

Most knowledge I have on this subject is from the book [**_Essential Mathematics for Quantum Computing_**](https://www.oreilly.com/library/view/essential-mathematics-for/9781801073141/), by L. Woody, 2022; and (the part about vectors) from [**_Principles of Quantum Mechanics_**](https://link.springer.com/book/10.1007/978-1-4757-0576-8) by R. Shankar, 1994.

## Introduction

We've all already heard about the wonders of Quantum Computing, a rapidly evolving field that holds the promise of solving problems beyond the capabilities of classical computers. However, most never actually hear about how it works. Thus, I'll try to explain the maths behind it, so you can find the beauty behind this technology.

## Geometry

$\mathbb{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$
$\cong$

### Vectors

You're probably familiar with vectors as arrows with some <abbr title="length">magnitude</abbr>, if you come from a physics background, or as a list of $n$ elements, if from computer science. However, mathematical vectors need not be arrows, i.e. have magnitude or direction.

You're probably used to the $\vec{v}$ syntax for vectors, but for the type of vectors that we're going to use later, it's handier to use the bra-ket notation, $\bra{v}$ and $\ket{v}$. More on this can be found in the [Appendix](#bra-ket).

So we can represent vectors, or rather, kets, as $
\ket{a} = \begin{bmatrix}
    1 \\
    2
\end{bmatrix}
$.

## Appendix

### Bra-Ket

