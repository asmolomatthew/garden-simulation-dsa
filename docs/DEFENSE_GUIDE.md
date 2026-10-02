# Thursday Individual Q&A — Quick Defense Guide

## 1. Why use OOP?
OOP lets the project model garden entities as objects. For example, a Plant object stores its name, category, growth days, and value.

## 2. Why Stack?
Action history needs LIFO behavior. The most recent garden action should be the first action removed during Undo.

## 3. What is LIFO?
Last In, First Out.

## 4. Stack complexity?
Push, pop, and peek are O(1) amortized when using the end of a Python list.

## 5. Why Queue?
Weather events should be processed in the same order they were added, so FIFO is appropriate.

## 6. What is FIFO?
First In, First Out.

## 7. Why a front index?
Removing index 0 from a list repeatedly can shift remaining elements. A front index lets the queue advance without shifting the whole list each time.

## 8. What is the 2D list?
The garden grid is a list of rows, where each row contains columns. `grid[row][column]` identifies one plot.

## 9. Why a hierarchical tree?
Plant categories naturally have parent-child relationships: Plants → Vegetables/Fruits → subcategories → plant names.

## 10. What is a tree traversal?
A traversal is a systematic way of visiting tree nodes.

## 11. Preorder?
Visit the current node first, then recursively visit its children.

## 12. Postorder?
Visit the children first, then the current node.

## 13. Is this a BST?
No. This milestone uses a general hierarchical tree. A BST will be added in a later milestone for ordered plant searching.

## 14. What is Big O?
Big O describes how an algorithm's running time or memory usage grows as the input size grows.

## One-minute project explanation
"GardenSim is a browser-based garden simulation designed to demonstrate Data Structures and Algorithms. Python classes model the garden and plants. A Stack stores action history for Undo using LIFO. A Queue stores weather events using FIFO. The garden itself uses a 2D list to represent plots. A hierarchical tree organizes plants into categories and supports traversal. The interface uses the instructor-approved HTML, Vanilla JavaScript, Tailwind CDN, Lucide CDN, and Pyodide stack."


# GardenSim v0.2.0 — Defense Guide

## 1. Project Overview

### Possible Question:
**What is GardenSim?**

### Suggested Answer:
GardenSim is a browser-based farming simulation developed for our
Data Structures and Algorithms project.

It combines a playable farming environment with actual data
structures and algorithms so that the concepts are demonstrated
through working features rather than isolated code examples.

The current version is GardenSim v0.2.0.

---

# 2. Data Structures and Algorithms

## 2.1 Python OOP

### Possible Question:
**Why did you use OOP?**

### Suggested Answer:

We used Python OOP to organize the different responsibilities of
GardenSim into classes.

Examples include:

- Plant
- Garden
- ActionHistoryStack
- WeatherQueue
- TreeNode
- PlantHierarchy

This makes the system more modular because each class is responsible
for a specific part of the application.

---

## 2.2 2D List / Array

### Possible Question:
**Where is the 2D List used?**

### Suggested Answer:

The 2D List represents the farm grid.

The first index represents the row and the second index represents
the column.

Conceptually:

```text
garden.grid[row][column]