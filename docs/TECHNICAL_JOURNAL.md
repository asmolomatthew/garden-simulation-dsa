# Technical Journal — GardenSim v0.1.0

## Date
September 21, 2026

## Milestone
Initial Garden Simulation foundation with four required data-structure areas.

## Architecture decision
The project uses a browser-based frontend and executes Python through Pyodide. Vanilla JavaScript handles DOM updates and button events. Tailwind CSS is used for styling and Lucide Icons for interface icons.

## Python OOP
The project defines classes such as:
- Plant
- Garden
- ActionHistoryStack
- WeatherQueue
- TreeNode
- PlantHierarchy

Objects hold their own data and behavior.

## Stack
The action history uses a list as the underlying storage. `append()` adds an action and `pop()` removes the latest action.

Expected complexity:
- push: O(1) amortized
- pop: O(1) amortized
- peek: O(1)

## Queue
Weather events are processed in FIFO order. A front index is maintained so that removing the first event does not require shifting every remaining item.

Expected complexity:
- enqueue: O(1) amortized
- dequeue: O(1)
- viewing remaining events: O(n)

## 2D List / Array
The garden is represented as rows and columns:
`grid[row][column]`

This models physical garden plots and provides direct access to a particular position.

## Hierarchical Tree
Plants are organized as:
Plants
- Vegetables
  - Root Crops
    - Carrot
    - Potato
  - Leafy
    - Lettuce
- Fruits
  - Tomato
  - Strawberry

The tree supports preorder, inorder-style left-to-right traversal, and postorder traversal.

## Testing performed
- Garden grid renders.
- Tomato and Carrot can be placed.
- Actions appear in the Stack.
- Undo removes the most recent Stack item.
- Weather events enter the Queue.
- The first Queue event is processed first.
- Tree traversals produce ordered sequences.

## Next milestone
Add BST, hash table, graph, sorting, searching, Dijkstra/greedy, and dynamic programming modules after the current progress requirement is secured.
