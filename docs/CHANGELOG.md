# GardenSim — Changelog

All notable changes to the GardenSim project are documented here.

---

## [v0.2.0] — October 2026

### Added

- Added a new GardenSim Main Menu.
- Added Game Mode for the interactive farming simulation.
- Added How to Play section.
- Added DSA Lab section for demonstrating Data Structures and Algorithms.
- Added About section.
- Added browser Back navigation support between application screens.
- Added player name and farm initialization.
- Added farming plots and interactive farm grid.
- Added seed selection and Seed Shop.
- Added inventory system.
- Added coins and Farm XP.
- Added planting mechanics.
- Added watering mechanics.
- Added crop growth states.
- Added harvesting mechanics.
- Added harvest validation for crops that are not yet fully grown.
- Added watering animation.
- Added harvesting animation.
- Added Binary Search Tree for crop/seed searching.
- Added Graph structure for connected farm locations and pathfinding.
- Added interactive Preorder traversal animation.
- Added interactive Inorder-style traversal animation.
- Added interactive Postorder traversal animation.

### Changed

- Expanded GardenSim from a DSA demonstration into an interactive farming simulation.
- Separated Game Mode state from DSA demonstration state.
- New Game Mode now starts with an empty farm instead of the sample DSA plants.
- Improved the visual presentation of the Plant Hierarchy.
- Improved DSA traversal demonstrations with sequential node highlighting.
- Refined the user interface for a more game-oriented experience.
- Continued separation of HTML, CSS, JavaScript, and Python responsibilities.

### Fixed

- Fixed Pyodide loading and external Python file integration issues.
- Fixed navigation behavior when moving between GardenSim screens.
- Fixed browser Back navigation handling.
- Fixed sample DSA crops appearing when starting a new farm.
- Fixed watering interaction and animation behavior after farm-grid updates.
- Fixed harvest behavior for crops that have not completed their growth stage.
- Fixed visual interaction issues encountered during the integration of new game features.

---

## [v0.1.0] — September 2026

### Added

- Added the initial GardenSim browser-based DSA prototype.
- Added Python OOP implementation.
- Added `Plant` and `Garden` classes.
- Added `ActionHistoryStack`.
- Added `WeatherQueue`.
- Added `TreeNode` and `PlantHierarchy`.
- Added 2D List / Array representation for the garden.
- Added Stack demonstration using LIFO behavior.
- Added Queue demonstration using FIFO behavior.
- Added Hierarchical Tree and traversal demonstrations.
- Added Garden Grid interface.
- Added Action History interface.
- Added Weather Events interface.
- Added Plant Hierarchy visualization.
- Added Pyodide integration for running Python in the browser.

### Documentation

- Added Technical Journal.
- Added AI Reflection documentation.
- Added Defense Guide.
- Added project README.
- Added version-controlled Git development.

---

## Versioning

GardenSim follows semantic versioning:

- **MINOR** — used when new functionality or features are added.
- **PATCH** — used for bug fixes and small corrections.

### Current Version

**GardenSim v0.2.0**

### Previous Version

**GardenSim v0.1.0**