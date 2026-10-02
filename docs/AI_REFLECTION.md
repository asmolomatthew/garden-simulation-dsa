# AI Reflection Note — GardenSim v0.1.0

## How AI was used
AI assistance was used as a learning and development aid to:
- plan the architecture of the Garden Simulation;
- map required Data Structures topics to meaningful garden features;
- explain Stack, Queue, 2D lists, OOP, and hierarchical trees;
- identify and correct common implementation mistakes;
- help organize the technical journal and version history.

## Example prompt used
"Help me design a small Garden Simulation in Python that demonstrates OOP, Stack, Queue, a 2D list, and a hierarchical tree. Keep the implementation understandable for a Data Structures student and use only the instructor-approved browser stack."

## Student verification
The generated implementation was reviewed and tested in the browser. The student is expected to understand:
- why Stack uses LIFO;
- why Queue uses FIFO;
- how the 2D garden grid is indexed;
- how classes create objects;
- how a tree stores parent-child relationships;
- how preorder, inorder-style, and postorder traversal work.

## Learning reflection
AI was not treated as a substitute for understanding. The main goal was to use the generated explanations and implementation as a study guide, then verify the behavior through actual testing and prepare for individual Q&A.


# AI Reflection — GardenSim v0.2.0

## 1. Overview

GardenSim v0.2.0 used AI as a development assistant during the
transition from a basic Data Structures and Algorithms prototype
into an interactive farming simulation.

AI assistance was mainly used for:

- Planning new features
- Structuring the game interface
- Debugging implementation issues
- Integrating additional data structures
- Improving user interaction
- Reviewing possible solutions
- Organizing project documentation

The final implementation was reviewed, tested, and modified based
on the actual behavior of the GardenSim application.

---

## 2. AI as a Development Assistant

AI was not used as a replacement for understanding the project.

Suggestions were treated as possible solutions that needed to be
reviewed and tested.

During development, some generated solutions did not immediately
match the existing project structure. These were corrected through
testing and further prompting.

The development process followed:

1. Identify the problem.
2. Explain the existing project context.
3. Ask AI for a possible solution.
4. Implement the suggested approach.
5. Test the feature.
6. Identify problems or unexpected behavior.
7. Refine the implementation.
8. Test again.

---

## 3. Major AI-Assisted Development Iterations

### 3.1 Project Structure Refactoring

The original GardenSim prototype contained significant JavaScript
and Python logic inside `index.html`.

AI assistance was used to plan a cleaner project structure:

```text
garden-simulation-dsa/
├── index.html
├── style.css
├── script.js
├── garden_simulation.py
├── README.md
└── docs/
