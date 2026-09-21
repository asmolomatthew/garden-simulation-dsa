Technical Journal — GardenSim v0.1.0

1. Date

September 21, 2026

2. Milestone

Initial GardenSim foundation implementing the five required areas for the current project progress:

Python OOP

Stack

Queue

2D List / Array

Hierarchical Tree

The five areas are integrated into one browser-based garden simulation.

3. Architecture Decision

GardenSim uses a browser-based frontend with Python executed through Pyodide.

The project uses:

HTML5 for application structure

Vanilla JavaScript for DOM updates, button events, and interface state

Tailwind CSS CDN for utility-based styling

Lucide Icons CDN for interface icons

External CSS (style.css) for project-specific styling

Pyodide to execute Python in the browser

The purpose of this architecture is to demonstrate Data Structures and Algorithms through an interactive garden simulation.

4. Module: Python OOP

Implementation

GardenSim uses Python classes to separate the responsibilities of the simulation:

Plant

Garden

ActionHistoryStack

WeatherQueue

TreeNode

PlantHierarchy

Each class contains related data and methods.

Time / Space Complexity

Complexity depends on the operation performed by each class. The main data-structure operations are documented in the sections below.

Architectural Choice

Python OOP keeps the project modular. Each major component has its own class and responsibility instead of placing all simulation logic in one block of code.

AI Reflection Note

The Prompt Used:
During development, AI assistance was used to help design and explain Python classes for the GardenSim requirements, particularly the Stack, Queue, 2D garden grid, and Hierarchical Tree.

What the AI Initially Got Wrong:
Some generated implementation ideas did not completely match the final project structure and required review and adjustment.

How I Fixed It:
The suggestions were reviewed against the course requirements, tested in the browser, and adjusted so that each structure could be demonstrated through the GardenSim interface.

Screenshot

Insert screenshot of the GardenSim interface showing the implemented OOP-based modules.

5. Module: Action History Stack (LIFO)

Implementation

The ActionHistoryStack class uses a Python list as its underlying storage.

append() adds an action, functioning as push.

pop() removes the most recently added action.

peek() returns the current top item without removing it.

is_empty() checks whether the Stack is empty.

The Stack follows LIFO (Last In, First Out) behavior.

For example, if the user performs:

Plant Tomato

Plant Carrot

the Plant Carrot action is on top and is removed first when Undo / Pop is used.

Time / Space Complexity

Push: O(1) amortized

Pop: O(1) amortized

Peek: O(1)

Space: O(n) for n actions

Architectural Choice

The Stack was selected for Action History because the most recent garden action should be the first action removed during Undo.

AI Reflection Note

The Prompt Used:
AI assistance was used to help structure the ActionHistoryStack class and explain how Python list operations could demonstrate Stack behavior in the GardenSim interface.

What the AI Initially Got Wrong:
The early implementation required correction because the generated code did not completely match the final GardenSim method structure and variable naming.

How I Fixed It:
The Stack was reviewed and tested using actual garden actions. The final version uses append() for push and pop() for Undo, with the result displayed in the interface.

Screenshot

Insert screenshot showing the Action History Stack and the Undo / Pop result.

6. Module: Weather Queue (FIFO)

Implementation

The WeatherQueue class stores weather events in a Python list and maintains a front index.

Events are added to the end of the Queue, while processing uses the current front position.

The Queue follows FIFO (First In, First Out) behavior.

Example:

Rain is added.

Heatwave is added.

Rain is processed first.

The front-index approach avoids repeatedly shifting all remaining elements.

Time / Space Complexity

Enqueue: O(1) amortized

Dequeue / Process First: O(1)

Viewing remaining events: O(n)

Space: O(n)

Architectural Choice

A Queue is appropriate for weather events because the earliest event should be processed before events that arrive later.

AI Reflection Note

The Prompt Used:
AI assistance was used to help implement a FIFO weather-event structure compatible with the Python code running through Pyodide.

What the AI Initially Got Wrong:
The implementation required adjustment so that processing the first event followed FIFO behavior without unnecessarily shifting the remaining list items.

How I Fixed It:
A front index was maintained in WeatherQueue. The queue was tested by adding multiple weather events and processing the first event through the GardenSim interface.

Screenshot

Insert screenshot showing Rain and Heatwave in the Weather Events Queue and the Process First control.

7. Module: Garden Grid — 2D List / Array

Implementation

The GardenSim garden is represented using a two-dimensional Python list:

grid[row][column]

The first index identifies the row and the second identifies the column.

The current interface displays a 4 × 5 garden grid, providing 20 visible plot positions.

Time / Space Complexity

Indexed access: O(1)

Space: O(r × c), where r is rows and c is columns

Architectural Choice

A 2D list is a natural representation for a garden because the simulation has physical rows and columns. It allows the program to associate a plant with a specific plot.

AI Reflection Note

The Prompt Used:
AI assistance was used to help connect the garden's row-and-column layout with a Python 2D list and integrate plant placement into the simulation.

What the AI Initially Got Wrong:
Some initial implementation details required adjustment so that the Python grid state and the visual garden grid remained consistent.

How I Fixed It:
The grid indexing and plant-placement behavior were tested through the GardenSim interface and adjusted so that a selected plant is associated with the intended row and column.

Screenshot

Insert screenshot showing the Garden Grid with Tomato and Carrot placed in different plots.

8. Module: Plant Hierarchy — Hierarchical Tree

Implementation

The PlantHierarchy uses TreeNode objects to organize plants into a hierarchical structure.

Plants
├── Vegetables
│   ├── Root Crops
│   │   ├── Carrot
│   │   └── Potato
│   └── Leafy
│       └── Lettuce
└── Fruits
    ├── Tomato
    └── Strawberry

The root node is Plants, followed by categories, subcategories, and plant names.

Time / Space Complexity

For a traversal that visits all n nodes:

Traversal: O(n)

Auxiliary space: O(h) for recursive traversal, where h is tree height

Architectural Choice

A hierarchical tree was selected because plants naturally fit a category-based structure. It represents relationships such as:

Plants → Vegetables → Root Crops → Carrot

and

Plants → Fruits → Tomato

The interface provides preorder, inorder-style left-to-right, and postorder traversal controls.

Note: The project's "inorder-style" traversal is adapted to the general hierarchical tree. Standard inorder traversal is normally defined for a binary tree.

AI Reflection Note

The Prompt Used:
AI assistance was used to help design a hierarchical plant classification using TreeNode objects and traversal methods for GardenSim.

What the AI Initially Got Wrong:
The first hierarchy presentation was difficult to read and could make the relationships between the root, categories, subcategories, and plant nodes confusing.

How I Fixed It:
The hierarchy structure was simplified and the visual presentation was revised so the parent-child relationships could be understood more clearly. The traversal controls were connected to the tree implementation.

Screenshot

Insert screenshot showing the Plant Hierarchy Tree and traversal buttons.

9. Testing Performed

The following behaviors were tested in the browser:

Garden grid renders correctly.

Tomato can be placed into a plot.

Carrot can be placed into a plot.

Plant actions appear in the Action History Stack.

Undo / Pop removes the most recent Stack item.

Weather events can be added to the Queue.

The first Queue event is processed first.

The Plant Hierarchy is displayed.

Preorder, inorder-style, and postorder traversal controls can be triggered.

The Python runtime successfully executes through Pyodide.

Example Stack test:

TOP → Plant Tomato at (1,1)

After pressing Undo / Pop:

Popped: Plant Tomato at (1,1)

This demonstrates the LIFO behavior of the Action History Stack.

10. AI Usage and Learning Reflection

AI was used as a development assistant rather than as a replacement for understanding the implementation.

Generated suggestions were reviewed, adapted to the actual project architecture, tested, and corrected when behavior did not match the requirements.

The main learning outcomes were:

OOP organizes the simulation into classes and objects.

Stack provides LIFO behavior for recent actions and Undo.

Queue provides FIFO behavior for weather events.

2D List represents the garden's rows and columns.

Hierarchical Tree represents plant categories and parent-child relationships.

These concepts can be demonstrated directly through the working GardenSim interface.

11. Current Version

GardenSim v0.1.0

This version represents the initial integrated project progress for the required data structures.

The project has been committed and pushed to its GitHub repository together with its documentation.

12. Next Milestone

After the current progress requirement is secured, future versions may integrate additional course topics:

Binary Search Tree (BST)

Hash Tables, collisions, and rehashing

Graphs and adjacency structures

DFS / BFS

Sorting algorithms

Searching algorithms

Dijkstra's algorithm and greedy patterns

Dynamic Programming

Memoization

Divide-and-Conquer

These topics will be added incrementally and documented through subsequent project versions.

13. Screenshots

Attach the following evidence:

GardenSim Main Interface — Garden Grid, Action History Stack, Weather Queue, and Plant Hierarchy.

Stack Operation — Undo / Pop result.

Queue Operation — queued weather events and FIFO processing.

Hierarchical Tree — plant hierarchy and traversal controls.