import json


# ============================================================
# PLANT CLASS
# ============================================================

class Plant:

    def __init__(self, name, category, growth_days, value):

        self.name = name
        self.category = category
        self.growth_days = growth_days
        self.value = value


    def info(self):

        return f"{self.name} ({self.category})"



# ============================================================
# GARDEN CLASS
# ============================================================

class Garden:

    def __init__(self, rows=4, cols=5):

        self.rows = rows
        self.cols = cols

        # 2D LIST
        self.grid = [
            [None for _ in range(cols)]
            for _ in range(rows)
        ]

        self.inventory = []


    def plant_at(self, row, col, plant):

        if 0 <= row < self.rows and 0 <= col < self.cols:

            self.grid[row][col] = plant.name

            self.inventory.append(plant)

            return True

        return False


    def snapshot(self):

        return self.grid



# ============================================================
# STACK
# ============================================================

class ActionHistoryStack:

    def __init__(self):

        self.items = []


    def push(self, action):

        self.items.append(action)


    def pop(self):

        if self.items:

            return self.items.pop()

        return None


    def peek(self):

        if self.items:

            return self.items[-1]

        return None


    def is_empty(self):

        return len(self.items) == 0



# ============================================================
# QUEUE
# ============================================================

class WeatherQueue:

    def __init__(self):

        self.items = []

        self.front = 0


    def enqueue(self, event):

        self.items.append(event)


    def dequeue(self):

        if self.front < len(self.items):

            event = self.items[self.front]

            self.front += 1

            return event

        return None


    def values(self):

        return self.items[self.front:]



# ============================================================
# TREE NODE
# ============================================================

class TreeNode:

    def __init__(self, name):

        self.name = name

        self.children = []


    def add_child(self, node):

        self.children.append(node)



# ============================================================
# HIERARCHICAL TREE
# ============================================================

class PlantHierarchy:

    def __init__(self):

        self.root = TreeNode("Plants")


        # Categories
        vegetables = TreeNode("Vegetables")
        fruits = TreeNode("Fruits")


        # Subcategories
        root_crops = TreeNode("Root Crops")
        leafy = TreeNode("Leafy")


        vegetables.add_child(root_crops)
        vegetables.add_child(leafy)


        # Root Crops
        root_crops.add_child(
            TreeNode("Carrot")
        )

        root_crops.add_child(
            TreeNode("Potato")
        )


        # Leafy
        leafy.add_child(
            TreeNode("Lettuce")
        )


        # Fruits
        fruits.add_child(
            TreeNode("Tomato")
        )

        fruits.add_child(
            TreeNode("Strawberry")
        )


        # Root children
        self.root.add_child(vegetables)
        self.root.add_child(fruits)



    # ========================================================
    # PREORDER
    # ========================================================

    def preorder(self, node=None, result=None):

        if result is None:

            result = []


        if node is None:

            node = self.root


        result.append(node.name)


        for child in node.children:

            self.preorder(child, result)


        return result



    # ========================================================
    # INORDER-STYLE TRAVERSAL
    # ========================================================

    def inorder(self, node=None, result=None):

        if result is None:

            result = []


        if node is None:

            node = self.root


        if node.children:

            self.inorder(
                node.children[0],
                result
            )


        result.append(node.name)


        for child in node.children[1:]:

            self.inorder(
                child,
                result
            )


        return result



    # ========================================================
    # POSTORDER
    # ========================================================

    def postorder(self, node=None, result=None):

        if result is None:

            result = []


        if node is None:

            node = self.root


        for child in node.children:

            self.postorder(
                child,
                result
            )


        result.append(node.name)


        return result



# ============================================================
# OBJECTS
# ============================================================

garden = Garden()

stack = ActionHistoryStack()

weather = WeatherQueue()

hierarchy = PlantHierarchy()



# ============================================================
# PLANTS
# ============================================================

plants = {

    "Tomato":
        Plant(
            "Tomato",
            "Fruit",
            5,
            50
        ),

    "Carrot":
        Plant(
            "Carrot",
            "Root Crop",
            4,
            30
        )

}




# ============================================================
# GAME RESET
# ============================================================

def reset_game():

    global garden, stack, weather

    garden = Garden()
    stack = ActionHistoryStack()
    weather = WeatherQueue()

    return state()



# ============================================================
# BINARY SEARCH TREE — CROP SEARCH
# ============================================================

class BinarySearchTreeNode:

    def __init__(self, key, data):
        self.key = key
        self.data = data
        self.left = None
        self.right = None


class CropSearchBST:

    def __init__(self):
        self.root = None

    def insert(self, key, data):
        node = BinarySearchTreeNode(key.lower(), data)

        if self.root is None:
            self.root = node
            return

        current = self.root

        while True:
            if node.key < current.key:
                if current.left is None:
                    current.left = node
                    return
                current = current.left
            elif node.key > current.key:
                if current.right is None:
                    current.right = node
                    return
                current = current.right
            else:
                current.data = data
                return

    def search(self, key):
        current = self.root
        target = key.strip().lower()

        while current is not None:
            if target == current.key:
                return current.data
            if target < current.key:
                current = current.left
            else:
                current = current.right

        return None

    def inorder(self):
        result = []

        def walk(node):
            if node is None:
                return
            walk(node.left)
            result.append(node.data)
            walk(node.right)

        walk(self.root)
        return result


crop_bst = CropSearchBST()

for _crop in [
    ("Carrot", {"name": "Carrot", "icon": "🥕", "cost": 10, "harvest": 30, "category": "Root Crop"}),
    ("Lettuce", {"name": "Lettuce", "icon": "🥬", "cost": 20, "harvest": 35, "category": "Leafy"}),
    ("Strawberry", {"name": "Strawberry", "icon": "🍓", "cost": 30, "harvest": 55, "category": "Fruit"}),
    ("Tomato", {"name": "Tomato", "icon": "🍅", "cost": 15, "harvest": 50, "category": "Fruit"}),
]:
    crop_bst.insert(_crop[0], _crop[1])


def search_crop(name):
    result = crop_bst.search(name)

    if result is None:
        return {"found": False, "query": name}

    return {"found": True, "crop": result}


# ============================================================
# GRAPH — FARM MAP
# ============================================================

class FarmGraph:

    def __init__(self):
        self.adjacency = {}

    def add_location(self, location):
        if location not in self.adjacency:
            self.adjacency[location] = []

    def add_edge(self, first, second):
        self.add_location(first)
        self.add_location(second)

        if second not in self.adjacency[first]:
            self.adjacency[first].append(second)

        if first not in self.adjacency[second]:
            self.adjacency[second].append(first)

    def neighbors(self, location):
        return self.adjacency.get(location, [])

    def bfs_path(self, start, target):
        if start not in self.adjacency or target not in self.adjacency:
            return []

        queue = [start]
        visited = {start}
        parent = {start: None}

        while queue:
            current = queue.pop(0)

            if current == target:
                break

            for neighbor in self.adjacency[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    parent[neighbor] = current
                    queue.append(neighbor)

        if target not in parent:
            return []

        path = []
        current = target

        while current is not None:
            path.append(current)
            current = parent[current]

        path.reverse()
        return path


farm_graph = FarmGraph()

for _location in ["Farmhouse", "Garden", "Seed Shop", "Market", "Lake"]:
    farm_graph.add_location(_location)

farm_graph.add_edge("Farmhouse", "Garden")
farm_graph.add_edge("Garden", "Seed Shop")
farm_graph.add_edge("Garden", "Market")
farm_graph.add_edge("Market", "Lake")


def farm_map():
    return {
        "locations": list(farm_graph.adjacency.keys()),
        "edges": [
            ["Farmhouse", "Garden"],
            ["Garden", "Seed Shop"],
            ["Garden", "Market"],
            ["Market", "Lake"],
        ],
    }


def find_farm_path(start, target):
    return {
        "start": start,
        "target": target,
        "path": farm_graph.bfs_path(start, target),
    }


# ============================================================
# CURRENT STATE
# ============================================================

def state():

    return {

        "grid":
            garden.snapshot(),

        "stack":
            list(
                reversed(stack.items)
            ),

        "queue":
            weather.values(),

        "tree":
            hierarchy.preorder(),

        "inventory":
            [
                plant.name
                for plant in garden.inventory
            ]

    }



# ============================================================
# INITIAL DEMO DATA
# ============================================================

def demo():

    garden.plant_at(
        0,
        0,
        plants["Tomato"]
    )


    garden.plant_at(
        1,
        2,
        plants["Carrot"]
    )


    stack.push(
        "Plant Tomato at (1,1)"
    )


    stack.push(
        "Plant Carrot at (2,3)"
    )


    weather.enqueue("Rain")

    weather.enqueue("Heatwave")


    return state()


json.dumps(demo())
