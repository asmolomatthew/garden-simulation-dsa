/*
  ============================================================
  SCREEN NAVIGATION
  ============================================================
*/


function goBack() {
  if (history.length > 1 && window.location.hash) {
    history.back();
  } else {
    showScreen("menuScreen");
  }
}

function showScreen(screenId, useBrowserHistory = true) {
  document.querySelectorAll(".app-screen").forEach((screen) => {
    screen.classList.remove("active-screen");
  });

  const target = document.getElementById(screenId);
  const gameHeader = document.getElementById("gameHeader");

  if (target) {
    target.classList.add("active-screen");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (gameHeader) {
    gameHeader.style.display =
      screenId === "menuScreen" ? "none" : "block";
  }

  if (screenId === "gameScreen") {
    setTimeout(() => prepareGameScreen(), 0);
  }

  if (screenId === "dsaDemoScreen") {
    setTimeout(() => prepareDsaDemoScreen(), 0);
  }

  if (useBrowserHistory) {
    history.pushState(
      { gardenSimScreen: screenId },
      "",
      `#${screenId}`
    );
  }
}

let pyodide;
    let initialized = false;
/*
      ============================================================
      INITIALIZE PYODIDE
      ============================================================
    */

    async function init() {

      try {

        pyodide = await loadPyodide();


        const pythonResponse = await fetch(
          "python/garden_simulation.py"
        );

        if (!pythonResponse.ok) {
          throw new Error(
            `Could not load python/garden_simulation.py (${pythonResponse.status})`
          );
        }

        const pythonCode = await pythonResponse.text();

        pyodide.runPython(pythonCode);


        initialized = true;


        const status =
          document.getElementById("status");


        status.className =
          "status-ready";


        status.textContent =
          "Python runtime ready. GardenSim is running in the browser through Pyodide.";


        render(
          JSON.parse(
            pyodide.runPython(
              "json.dumps(state())"
            )
          )
        );


        lucide.createIcons();


      } catch (error) {

        const status =
          document.getElementById("status");


        status.className =
          "status-error";


        status.textContent =
          "Pyodide failed to load: " + error;

      }

    }



    /*
      ============================================================
      CHECK PYTHON
      ============================================================
    */

    function requireReady() {

      if (!initialized) {

        alert(
          "Please wait for the Python runtime to finish loading."
        );

        return false;

      }


      return true;

    }



    /*
      ============================================================
      GET CURRENT STATE
      ============================================================
    */

    function getState() {

      return JSON.parse(
        pyodide.runPython(
          "json.dumps(state())"
        )
      );

    }



    /*
      ============================================================
      RENDER UI
      ============================================================
    */

    function render(s) {


      /*
        --------------------------
        GARDEN GRID
        --------------------------
      */

      const grid =
        document.getElementById(
          "gardenGrid"
        );


      grid.innerHTML = "";


      s.grid.forEach(
        (row, r) => {

          row.forEach(
            (cell, c) => {

              const element =
                document.createElement(
                  "div"
                );


              element.className =
                "garden-plot";


              element.textContent =
                cell
                  ? "🌱 " + cell
                  : `Plot ${r + 1},${c + 1}`;


              grid.appendChild(
                element
              );

            }
          );

        }
      );



      /*
        --------------------------
        STACK
        --------------------------
      */

      const stack =
        document.getElementById(
          "stack"
        );


      if (s.stack.length) {

        stack.innerHTML =
          s.stack
            .map(
              (item, index) => `

                <div class="stack-item">

                  ${
                    index === 0
                      ? "TOP → "
                      : ""
                  }

                  ${item}

                </div>

              `
            )
            .join("");

      } else {

        stack.innerHTML = `

          <p class="empty-message">
            Stack is empty.
          </p>

        `;

      }



      /*
        --------------------------
        QUEUE
        --------------------------
      */

      const queue =
        document.getElementById(
          "queue"
        );


      if (s.queue.length) {

        queue.innerHTML =
          s.queue
            .map(
              (item, index) => `

                <div class="queue-item">

                  ${
                    index === 0
                      ? "FRONT → "
                      : ""
                  }

                  ${item}

                </div>

              `
            )
            .join("");

      } else {

        queue.innerHTML = `

          <p class="empty-message">
            Queue is empty.
          </p>

        `;

      }



      /*
        --------------------------
        HIERARCHICAL TREE
        --------------------------
      */

      renderTree();

    }



    /*
      ============================================================
      RENDER TREE
      ============================================================
    */

    function renderTree() {

      const tree =
        document.getElementById(
          "tree"
        );


      tree.innerHTML = `

        <div class="tree-wrapper">


          <!-- ROOT -->
          <div class="tree-level">

            <div class="tree-node root" data-node-key="Plants">
              🌱 Plants
            </div>

          </div>


          <div class="tree-connector"></div>


          <!-- CATEGORIES -->
          <div class="tree-level">

            <div class="tree-branch">

              <div class="tree-node category" data-node-key="Fruits" data-node-key="Vegetables">
                🥕 Vegetables
              </div>


              <div class="tree-connector"></div>


              <!-- VEGETABLE SUBCATEGORIES -->
              <div class="tree-level">


                <div class="tree-branch">

                  <div class="tree-node subcategory" data-node-key="Leafy" data-node-key="Root Crops">
                    🥔 Root Crops
                  </div>


                  <div class="tree-children">

                    <div class="tree-node plant" data-node-key="Strawberry" data-node-key="Tomato" data-node-key="Lettuce" data-node-key="Potato" data-node-key="Carrot">
                      🥕 Carrot
                    </div>

                    <div class="tree-node plant">
                      🥔 Potato
                    </div>

                  </div>

                </div>


                <div class="tree-branch">

                  <div class="tree-node subcategory">
                    🥬 Leafy
                  </div>


                  <div class="tree-children">

                    <div class="tree-node plant">
                      🥬 Lettuce
                    </div>

                  </div>

                </div>

              </div>

            </div>



            <!-- FRUITS -->
            <div class="tree-branch">

              <div class="tree-node category">
                🍓 Fruits
              </div>


              <div class="tree-children">

                <div class="tree-node plant">
                  🍅 Tomato
                </div>

                <div class="tree-node plant">
                  🍓 Strawberry
                </div>

              </div>

            </div>

          </div>


          <!-- LEGEND -->
          <div class="tree-legend">

            <span>
              🌱 Root
            </span>

            <span>
              📂 Category
            </span>

            <span>
              🌿 Subcategory
            </span>

            <span>
              🌾 Plant
            </span>

          </div>


        </div>

      `;

    }



    /*
      ============================================================
      PLANT
      ============================================================
    */

    function plant(name) {

      if (!requireReady()) {

        return;

      }


      const code = `

plant = plants["${name}"]

placed = False


for r in range(garden.rows):

    for c in range(garden.cols):

        if garden.grid[r][c] is None and not placed:

            garden.plant_at(
                r,
                c,
                plant
            )


            stack.push(
                "Plant ${name} at ("
                + str(r + 1)
                + ","
                + str(c + 1)
                + ")"
            )


            placed = True

`;


      pyodide.runPython(
        code
      );


      render(
        getState()
      );

    }



    /*
      ============================================================
      WATER
      ============================================================
    */

    function water() {

      if (!requireReady()) {

        return;

      }


      pyodide.runPython(
        `stack.push("Water garden plot")`
      );


      render(
        getState()
      );

    }



    /*
      ============================================================
      UNDO / POP
      ============================================================
    */

    function undo() {

      if (!requireReady()) {

        return;

      }


      const result =
        pyodide.runPython(
          `stack.pop()`
        );


      alert(
        result
          ? "Popped: " + result
          : "Stack is empty."
      );


      render(
        getState()
      );

    }



    /*
      ============================================================
      ADD WEATHER
      ============================================================
    */

    function addWeather(eventName) {

      if (!requireReady()) {

        return;

      }


      pyodide.runPython(
        `weather.enqueue("${eventName}")`
      );


      render(
        getState()
      );

    }



    /*
      ============================================================
      PROCESS WEATHER
      ============================================================
    */

    function processWeather() {

      if (!requireReady()) {

        return;

      }


      const result =
        pyodide.runPython(
          `weather.dequeue()`
        );


      alert(

        result
          ? "Processed first event: " + result
          : "Queue is empty."

      );


      render(
        getState()
      );

    }



    /*
      ============================================================
      TREE TRAVERSAL
      ============================================================
    */

    let traversalAnimationRunning = false;
    let traversalTimer = null;

    function traverse(type) {

      if (!requireReady() || traversalAnimationRunning) {
        return;
      }

      const result =
        pyodide.runPython(
          `hierarchy.${type}()`
        );

      const nodes = Array.from(
        document.querySelectorAll("#tree .tree-node")
      );

      nodes.forEach((node) => {
        node.classList.remove("traversal-current", "traversal-visited");
      });

      if (traversalTimer) {
        clearTimeout(traversalTimer);
      }

      const statusText =
        document.getElementById("traversalStatusText");

      const statusBox =
        document.getElementById("traversalAnimationStatus");

      const buttons =
        document.querySelectorAll(".traversal-controls .btn");

      const buttonForType = {
        preorder: buttons[0],
        inorder: buttons[1],
        postorder: buttons[2]
      };

      buttons.forEach((button) => {
        if (button) {
          button.disabled = true;
          button.classList.remove("traversal-selected");
        }
      });

      if (buttonForType[type]) {
        buttonForType[type].classList.add("traversal-selected");
      }

      traversalAnimationRunning = true;

      if (statusBox) {
        statusBox.classList.add("is-playing");
      }

      const prettyName =
        type.charAt(0).toUpperCase() + type.slice(1);

      if (statusText) {
        statusText.textContent =
          `${prettyName}: starting traversal...`;
      }

      const traversalOutput =
        document.getElementById("traversal");

      if (traversalOutput) {
        traversalOutput.textContent =
          `${prettyName}: ${result.join(" → ")}`;
      }

      let index = 0;

      function animateNextNode() {

        if (index > 0) {
          const previousKey = result[index - 1];
          const previousNode =
            document.querySelector(
              `#tree .tree-node[data-node-key="${CSS.escape(previousKey)}"]`
            );

          if (previousNode) {
            previousNode.classList.remove("traversal-current");
            previousNode.classList.add("traversal-visited");
          }
        }

        if (index >= result.length) {
          traversalAnimationRunning = false;

          if (statusBox) {
            statusBox.classList.remove("is-playing");
            statusBox.classList.add("is-complete");
          }

          if (statusText) {
            statusText.textContent =
              `${prettyName}: complete — ${result.length} nodes visited.`;
          }

          buttons.forEach((button) => {
            if (button) {
              button.disabled = false;
            }
          });

          if (buttonForType[type]) {
            buttonForType[type].classList.remove("traversal-selected");
          }

          return;
        }

        const key = result[index];

        const node =
          document.querySelector(
            `#tree .tree-node[data-node-key="${CSS.escape(key)}"]`
          );

        if (node) {
          node.classList.remove("traversal-visited");
          node.classList.add("traversal-current");
          node.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest"
          });
        }

        if (statusText) {
          statusText.textContent =
            `${prettyName}: ${index + 1}/${result.length} → ${key}`;
        }

        index += 1;
        traversalTimer = setTimeout(animateNextNode, 700);
      }

      animateNextNode();
    }



    /*
      ============================================================
      START APPLICATION
      ============================================================
    */


    
/*
  ============================================================
  FARM GAME UI — v0.2.0
  Phase 3: visual game layer + selected plot/seed foundation
  ============================================================
*/

let selectedSeed = {
  name: "Carrot",
  cost: 10,
  icon: "🥕"
};


let selectedGamePlot = null;
let farmerName = "";
let gameStarted = false;
let cropStates = {};
const GAME_DAY_MS = 5000;



function getCropKey(row, col) {
  return `${row}-${col}`;
}

function resetLocalGameState() {
  cropStates = {};
  selectedGamePlot = null;
  gameStarted = false;
  farmerName = "";
  const label = document.getElementById("selectedPlotLabel");
  if (label) label.textContent = "Pick a plot";
}

function showGameStartModal() {
  const modal = document.getElementById("gameStartModal");
  const input = document.getElementById("farmerNameInput");
  if (!modal || !input) return;

  modal.classList.remove("hidden");
  input.value = "";
  setTimeout(() => input.focus(), 60);
}

function closeGameStartModal() {
  const modal = document.getElementById("gameStartModal");
  if (modal) modal.classList.add("hidden");
}

function startNewFarm() {
  const input = document.getElementById("farmerNameInput");
  const error = document.getElementById("startNameError");
  const name = (input?.value || "").trim();

  if (!name) {
    if (error) error.textContent = "Please enter your farmer name first.";
    input?.focus();
    return;
  }

  farmerName = name;
  gameStarted = true;
  cropStates = {};
  selectedGamePlot = null;

  try {
    if (pyodide) {
      const state = JSON.parse(pyodide.runPython("json.dumps(reset_game())"));
      render(state);
      renderGameFarm(state);
    }
  } catch (error) {
    console.error("Could not reset Python game state:", error);
  }

  const farmerNameTargets = document.querySelectorAll(".player-card h3");
  farmerNameTargets.forEach((el) => {
    el.textContent = farmerName;
  });

  closeGameStartModal();
  showGameMessage(`🌱 Welcome, ${farmerName}! Your farm is ready. Pick a seed and an empty plot.`);
}

function ensureGameStarted() {
  if (!gameStarted) {
    showGameStartModal();
    return false;
  }
  return true;
}



function searchCropBST() {
  if (!requireReady()) return;

  const input = document.getElementById("bstSearchInput");
  const resultBox = document.getElementById("bstSearchResult");
  const query = (input?.value || "").trim();

  if (!query) {
    resultBox.innerHTML = "🔎 Enter a crop name first.";
    return;
  }

  try {
    const result = JSON.parse(
      pyodide.runPython(`json.dumps(search_crop(${JSON.stringify(query)}))`)
    );

    if (!result.found) {
      resultBox.innerHTML = `❌ <strong>${query}</strong> was not found in the Binary Search Tree.`;
      return;
    }

    const crop = result.crop;
    resultBox.innerHTML = `
      <div class="bst-found">
        <span class="bst-result-icon">${crop.icon}</span>
        <div>
          <strong>${crop.name}</strong>
          <small>${crop.category} • Buy ${crop.cost} coins • Harvest ${crop.harvest} coins</small>
        </div>
        <span class="bst-found-badge">FOUND</span>
      </div>
    `;
  } catch (error) {
    console.error("BST search failed:", error);
    resultBox.textContent = "Could not search the crop catalog.";
  }
}

function searchCropForGame() {
  if (!requireReady()) return;

  const input = document.getElementById("gameCropSearch");
  const resultBox = document.getElementById("gameCropSearchResult");
  const query = (input?.value || "").trim();

  if (!query) {
    resultBox.textContent = "🔎 Enter a crop name.";
    return;
  }

  try {
    const result = JSON.parse(
      pyodide.runPython(`json.dumps(search_crop(${JSON.stringify(query)}))`)
    );

    if (!result.found) {
      resultBox.textContent = `❌ ${query} not found in the crop catalog.`;
      return;
    }

    const crop = result.crop;
    resultBox.innerHTML = `
      <strong>${crop.icon} ${crop.name}</strong>
      <small>${crop.category} • ${crop.cost} coins</small>
    `;

    const seedCard = document.querySelector(
      `.seed-card[data-seed="${crop.name}"]`
    );

    if (seedCard && !seedCard.classList.contains("locked")) {
      selectSeed(crop.name, crop.cost, crop.icon);
      seedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  } catch (error) {
    console.error("Game BST search failed:", error);
    resultBox.textContent = "Could not search the crop catalog.";
  }
}

function findFarmPath() {
  if (!requireReady()) return;

  const start = document.getElementById("graphStart")?.value;
  const target = document.getElementById("graphTarget")?.value;
  const resultBox = document.getElementById("graphPathResult");

  if (!start || !target || !resultBox) return;

  if (start === target) {
    resultBox.innerHTML = `📍 You are already at <strong>${start}</strong>.`;
    return;
  }

  try {
    const code = `json.dumps(find_farm_path(${JSON.stringify(start)}, ${JSON.stringify(target)}))`;
    const result = JSON.parse(pyodide.runPython(code));

    if (!result.path?.length) {
      resultBox.textContent = "❌ No path found.";
      return;
    }

    resultBox.innerHTML = `
      <span class="path-label">BFS path</span>
      <strong>${result.path.join(" → ")}</strong>
      <small>${result.path.length - 1} edge${result.path.length - 1 === 1 ? "" : "s"}</small>
    `;

    highlightGraphPath(result.path);
  } catch (error) {
    console.error("Graph path failed:", error);
    resultBox.textContent = "Could not calculate the farm path.";
  }
}

function highlightGraphPath(path) {
  document.querySelectorAll(".farm-graph-visual .graph-node").forEach(node => {
    node.classList.remove("path-active");
  });

  const classMap = {
    "Farmhouse": ".farmhouse-node",
    "Garden": ".garden-node",
    "Seed Shop": ".shop-node",
    "Market": ".market-node",
    "Lake": ".lake-node"
  };

  path.forEach(location => {
    const node = document.querySelector(classMap[location]);
    if (node) node.classList.add("path-active");
  });
}

function prepareDsaDemoScreen() {
  if (!pyodide) return;

  try {
    const state = JSON.parse(pyodide.runPython("json.dumps(demo())"));
    render(state);
  } catch (error) {
    console.error("Could not restore DSA demo:", error);
  }
}

function prepareGameScreen() {
  if (!gameStarted) {
    showGameStartModal();
  }
}

function startGrowthTimer(key) {
  if (cropStates[key]?.timer) {
    clearInterval(cropStates[key].timer);
  }

  cropStates[key].timer = setInterval(() => {
    const crop = cropStates[key];
    if (!crop || crop.harvested) return;

    if (crop.watered && crop.growthDays < crop.requiredDays) {
      crop.growthDays += 1;
      updateGameCropVisual(crop.row, crop.col);

      if (crop.growthDays >= crop.requiredDays) {
        clearInterval(crop.timer);
        crop.timer = null;
        showGameMessage(`✨ ${crop.icon} ${crop.name} is fully grown! You can harvest it now.`);
        showGameToast(`✨ ${crop.name} is ready to harvest!`);
      }
    }
  }, GAME_DAY_MS);
}

function updateGameCropVisual(row, col) {
  const key = getCropKey(row, col);
  const crop = cropStates[key];
  const plot = document.querySelector(
    `.game-plot[data-row="${row}"][data-col="${col}"]`
  );
  if (!crop || !plot) return;

  plot.classList.toggle("watered", !!crop.watered);
  plot.classList.toggle("ready", crop.growthDays >= crop.requiredDays);

  const status = plot.querySelector(".plot-status");
  if (status) {
    if (crop.growthDays >= crop.requiredDays) {
      status.textContent = "Ready!";
    } else if (crop.watered) {
      status.textContent = `Growing ${crop.growthDays}/${crop.requiredDays}`;
    } else {
      status.textContent = "Needs water";
    }
  }
}

function showGameToast(message) {
  const toast = document.getElementById("gameToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function playWateringAnimation(row, col) {
  const plot = document.querySelector(
    `.game-plot[data-row="${row}"][data-col="${col}"]`
  );
  if (!plot) return;

  plot.classList.add("watering");

  const farmer = document.createElement("span");
  farmer.className = "watering-farmer";
  farmer.innerHTML = `
    <span class="farmer-sprite">🧑‍🌾</span>
    <span class="watering-can">🪣</span>
    <span class="water-drops">💦</span>
  `;

  plot.appendChild(farmer);

  setTimeout(() => {
    farmer.remove();
    plot.classList.remove("watering");
  }, 1500);
}

function advanceGameDay() {
  if (!ensureGameStarted()) return;

  Object.values(cropStates).forEach((crop) => {
    if (crop.timer) clearInterval(crop.timer);
  });

  let advanced = 0;
  Object.values(cropStates).forEach((crop) => {
    if (!crop.harvested && crop.watered && crop.growthDays < crop.requiredDays) {
      crop.growthDays += 1;
      advanced += 1;
    }
  });

  Object.values(cropStates).forEach((crop) => {
    if (!crop.harvested && crop.growthDays < crop.requiredDays) {
      startGrowthTimer(getCropKey(crop.row, crop.col));
    }
  });

  const dayEl = document.getElementById("gameDay");
  if (dayEl) {
    dayEl.textContent = String(Number(dayEl.textContent || "1") + 1);
  }

  Object.values(cropStates).forEach((crop) => updateGameCropVisual(crop.row, crop.col));

  if (advanced) {
    showGameMessage(`☀️ A new day begins. ${advanced} watered crop${advanced > 1 ? "s are" : " is"} growing.`);
  } else {
    showGameMessage("☀️ A new day begins. Water your crops so they can grow.");
  }
}

function playHarvestAnimation(row, col) {
  const plot = document.querySelector(
    `.game-plot[data-row="${row}"][data-col="${col}"]`
  );
  if (!plot) return;

  plot.classList.add("harvesting");

  const farmer = document.createElement("span");
  farmer.className = "harvest-farmer";
  farmer.innerHTML = `
    <span class="harvest-sprite">🧑‍🌾</span>
    <span class="shovel-sprite">🪏</span>
    <span class="harvest-sparkles">✨</span>
  `;

  plot.appendChild(farmer);

  setTimeout(() => {
    farmer.remove();
    plot.classList.remove("harvesting");
  }, 1100);
}

async function harvestSelectedPlot() {
  if (!ensureGameStarted()) return;

  if (!selectedGamePlot) {
    showGameMessage("🧺 Choose a crop first.");
    return;
  }

  const { row, col } = selectedGamePlot;
  const key = getCropKey(row, col);
  const crop = cropStates[key];

  if (!crop) {
    showGameMessage("🧺 There's nothing to harvest on this plot.");
    return;
  }

  if (crop.growthDays < crop.requiredDays) {
    showGameToast("🌱 Not yet fully grown!");
    showGameMessage(`🌱 ${crop.name} is still growing. Water it and wait until it's fully grown.`);
    const plot = document.querySelector(
      `.game-plot[data-row="${row}"][data-col="${col}"]`
    );
    if (plot) {
      plot.classList.add("not-ready");
      setTimeout(() => plot.classList.remove("not-ready"), 800);
    }
    return;
  }

  const value = crop.value;

  // Show the actual harvesting action before removing the crop.
  playHarvestAnimation(row, col);
  showGameMessage(`🧑‍🌾 Harvesting ${crop.name}...`);

  await new Promise(resolve => setTimeout(resolve, 900));

  crop.harvested = true;

  const code = `
garden.grid[${row}][${col}] = None
garden.inventory = [
    plant for plant in garden.inventory
    if plant.name != "${crop.name}"
]
stack.push("Harvest ${crop.name} at (${row + 1},${col + 1})")
json.dumps(state())
`;
  const state = JSON.parse(pyodide.runPython(code));

  render(state);
  renderGameFarm(state);

  const coins = document.getElementById("gameCoins");
  if (coins) coins.textContent = String(Number(coins.textContent || "100") + value);

  delete cropStates[key];
  selectedGamePlot = null;

  showGameToast(`🧺 Harvested ${crop.name}! +${value} coins`);
  showGameMessage(`🎉 Great job, ${farmerName}! ${crop.icon} ${crop.name} was harvested.`);
}


document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.getElementById("gameStartModal")?.classList.contains("hidden") === false) {
    startNewFarm();
  }
});

function selectSeed(name, cost, icon) {
  selectedSeed = { name, cost, icon };

  document.querySelectorAll(".seed-card[data-seed]").forEach((card) => {
    card.classList.toggle("selected", card.dataset.seed === name);
  });

  const label = document.getElementById("selectedSeedLabel");
  if (label) {
    label.textContent = `${icon} ${name}`;
  }

  showGameMessage(`${icon} ${name} selected. Now choose a farm plot.`);
}

function selectGamePlot(row, col) {
  selectedGamePlot = { row, col };

  document.querySelectorAll(".game-plot").forEach((plot) => {
    plot.classList.remove("selected");
  });

  const plot = document.querySelector(
    `.game-plot[data-row="${row}"][data-col="${col}"]`
  );

  if (plot) {
    plot.classList.add("selected");
  }

  const label = document.getElementById("selectedPlotLabel");
  if (label) {
    label.textContent = `Plot ${row + 1}, ${col + 1}`;
  }

  const crop = cropStates[getCropKey(row, col)];
  if (crop) {
    const status = crop.growthDays >= crop.requiredDays
      ? "✨ Fully grown — ready to harvest!"
      : crop.watered
        ? `🌿 Growing ${crop.growthDays}/${crop.requiredDays}`
        : "💧 Needs water";
    showGameMessage(`Plot ${row + 1}, ${col + 1}: ${crop.icon} ${crop.name} — ${status}`);
  } else {
    showGameMessage(`Plot ${row + 1}, ${col + 1} is empty. Choose a seed to plant.`);
  }
}

function renderGameFarm(state) {
  const grid = document.getElementById("gameGardenGrid");
  if (!grid || !state?.grid) return;

  grid.innerHTML = "";

  state.grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const plot = document.createElement("button");
      plot.type = "button";
      plot.className = "game-plot" + (cell ? " occupied" : "");
      plot.dataset.row = r;
      plot.dataset.col = c;
      plot.onclick = () => selectGamePlot(r, c);

      if (selectedGamePlot?.row === r && selectedGamePlot?.col === c) {
        plot.classList.add("selected");
      }

      const crop = cropStates[getCropKey(r, c)];

      if (cell) {
        const cropIcon = crop?.icon || (cell === "Tomato" ? "🍅" : "🥕");
        const statusText = crop
          ? (crop.growthDays >= crop.requiredDays
              ? "Ready!"
              : crop.watered
                ? `Growing ${crop.growthDays}/${crop.requiredDays}`
                : "Needs water")
          : "Growing";

        plot.innerHTML = `
          <span class="plot-crop">${cropIcon}</span>
          <span class="plot-name">${cell}</span>
          <span class="plot-status">${statusText}</span>
        `;
      } else {
        plot.innerHTML = `
          <span class="plot-empty">+</span>
          <span class="plot-label">Empty Plot</span>
        `;
      }

      grid.appendChild(plot);

      if (crop) {
        updateGameCropVisual(r, c);
      }
    });
  });
}


function plantSelectedSeed() {
  if (!requireReady()) return;
  if (!ensureGameStarted()) return;

  if (!selectedGamePlot) {
    showGameMessage("Choose an empty plot first.");
    return;
  }

  const { row, col } = selectedGamePlot;

  const code = `
plant = plants["${selectedSeed.name}"]
placed = False

if garden.grid[${row}][${col}] is None:
    garden.plant_at(${row}, ${col}, plant)
    stack.push("Plant ${selectedSeed.name} at (${row + 1},${col + 1})")
    placed = True

json.dumps({"placed": placed, "state": state()})
`;

  const result = JSON.parse(pyodide.runPython(code));

  if (!result.placed) {
    showGameMessage("That plot is already occupied. Choose another plot.");
    return;
  }

  renderGameFarm(result.state);
  render(result.state);

  const key = getCropKey(row, col);
  const requiredDays = selectedSeed.name === "Tomato" ? 5 : 4;

  cropStates[key] = {
    row,
    col,
    name: selectedSeed.name,
    icon: selectedSeed.icon,
    value: selectedSeed.name === "Tomato" ? 50 : 30,
    requiredDays,
    growthDays: 0,
    watered: false,
    harvested: false,
    timer: null
  };

  updateGameCropVisual(row, col);
  showGameMessage(
    `${selectedSeed.icon} ${selectedSeed.name} planted on Plot ${row + 1}, ${col + 1}. 💧 Water it to start growing!`
  );
}

function waterSelectedPlot() {
  if (!requireReady()) return;
  if (!ensureGameStarted()) return;

  if (!selectedGamePlot) {
    showGameMessage("💧 Choose a plot first.");
    return;
  }

  const { row, col } = selectedGamePlot;
  const key = getCropKey(row, col);
  const crop = cropStates[key];

  if (!crop) {
    showGameMessage("💧 There's no crop here yet. Plant something first.");
    return;
  }

  if (crop.harvested) {
    showGameMessage("This plot is empty. Plant a new crop.");
    return;
  }

  if (crop.watered && crop.growthDays < crop.requiredDays) {
    showGameMessage(`💧 ${crop.name} is already watered and growing.`);
    return;
  }

  crop.watered = true;
  updateGameCropVisual(row, col);

  pyodide.runPython(
    `stack.push("Water ${crop.name} at (${row + 1},${col + 1})")`
  );

  const state = getState();
  render(state);
  renderGameFarm(state);

  // Render first, then animate the newly-created plot DOM node.
  playWateringAnimation(row, col);

  startGrowthTimer(key);

  showGameMessage(
    `💧 ${crop.name} watered! Watch it grow.`
  );
}

function showGameMessage(message) {
  const element = document.getElementById("gameMessage");
  if (element) {
    element.textContent = message;
  }
}

function updateGameView(state) {
  renderGameFarm(state);
}

/* Extend the existing render so the new game farm stays synchronized. */
const originalRender = render;
render = function (state) {
  originalRender(state);
  updateGameView(state);
};


/*
      ============================================================
      BROWSER HISTORY NAVIGATION
      Browser Back/Forward buttons now work with app screens.
      ============================================================
    */

    window.addEventListener("popstate", (event) => {
      const screenId =
        event.state?.gardenSimScreen ||
        window.location.hash.replace("#", "") ||
        "menuScreen";

      showScreen(screenId, false);
    });

    function initializeNavigation() {
      const initialScreen =
        window.location.hash.replace("#", "") || "menuScreen";

      history.replaceState(
        { gardenSimScreen: initialScreen },
        "",
        `#${initialScreen}`
      );

      showScreen(
        document.getElementById(initialScreen)
          ? initialScreen
          : "menuScreen",
        false
      );
    }

    init();
    initializeNavigation();
