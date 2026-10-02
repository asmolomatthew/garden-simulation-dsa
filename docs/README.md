# GardenSim v0.1.0

## Purpose
GardenSim is the initial progress build for the Data Structures & Algorithms final project.

The current milestone demonstrates:
1. Python OOP
2. Stack
3. Queue
4. 2D list / array representation
5. Hierarchical tree and traversals

## Approved technical environment
- HTML5
- Vanilla JavaScript
- Tailwind CSS via CDN
- Lucide Icons via CDN
- Pyodide for browser-side Python execution

No backend, framework, or unapproved Python package is required.

## How to run
1. Keep `index.html` in the project folder.
2. Open it in a browser with internet access because the approved CDN resources and Pyodide runtime are loaded from CDNs.
3. Wait until the green "Python runtime ready" message appears.
4. Demonstrate the Garden Grid, Stack, Queue, and Tree traversal buttons.

## Current data structures
- `Plant` and `Garden`: Python OOP classes.
- `ActionHistoryStack`: LIFO action history.
- `WeatherQueue`: FIFO event queue.
- `Garden.grid`: 2D list.
- `PlantHierarchy` + `TreeNode`: hierarchical tree.

## Important defense point
The project is intentionally at v0.1.0. The remaining final-project topics will be integrated in later versions rather than adding unrelated code before the current progress submission.


# 🌱 GardenSim

### Smart Garden Game — Data Structures & Algorithms

**GardenSim v0.2.0**

GardenSim is an interactive browser-based farming simulation
developed as a Data Structures and Algorithms project.

The project combines a playable farming environment with practical
implementations of Data Structures and Algorithms.

Instead of presenting the structures only as isolated code examples,
GardenSim connects each structure to an actual feature of the game.

---

## 🎮 Project Overview

In GardenSim, the player manages a small farm by:

- Planting crops
- Watering crops
- Growing crops
- Harvesting crops
- Earning coins
- Managing inventory
- Buying seeds
- Completing farm tasks
- Exploring connected farm locations

The application also contains a dedicated **DSA Lab** where the
implemented data structures can be demonstrated directly.

---

# 🧠 Data Structures & Algorithms

GardenSim v0.2.0 currently demonstrates seven major areas:

| DSA Topic | GardenSim Application |
|---|---|
| Python OOP | Game and DSA system classes |
| 2D List / Array | Farm Grid |
| Stack | Action History / Undo |
| Queue | Weather Events |
| Hierarchical Tree | Plant Classification |
| Binary Search Tree | Crop / Seed Search |
| Graph | Farm Map and Pathfinding |

---

## 1. Python OOP

Python classes organize the major components of the system.

Examples include:

```text
Plant
Garden
ActionHistoryStack
WeatherQueue
TreeNode
PlantHierarchy