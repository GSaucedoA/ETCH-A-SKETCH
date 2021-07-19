const grid = document.querySelector(".grid");
const clearButton = document.querySelector(".clear");
const blackButton = document.querySelector(".black");
const rainbowButton = document.querySelector(".rainbow");
const grayScaleButton = document.querySelector(".grayScale");

let gridSize = 16;
let backgroundColor = "#000";
let clicked = "Black";

let styles = document.createElement("style");

function generateNewStyles() {
  const cellSize = 800 / gridSize / 16;

  const gridStyle = `.grid {
    display: grid;
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
    width: 800px;
    height: 800px;
  }\n`;

  const cellStyle = `.cell {
    width: ${cellSize}rem;
    height: ${cellSize}rem;
    border: 1px solid lightgray;
    box-shadow: 1px 1px 1px lightgray;
    border-radius: 8px;
  }`;

  styles.textContent = gridStyle + cellStyle;
  document.body.appendChild(styles);
}
function randomRGB() {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  return `rgb(${R},${G},${B})`;
}

function grayScale(cell) {
  console.log(cell.style.backgroundColor);
  if (
    cell.classList[1] == undefined &&
    cell.style.backgroundColor !== "rgb(0, 0, 0)"
  ) {
    cell.classList.add("visited");
    backgroundColor = "rgba(0,0,0,0.1)";
  } else {
    if (cell.style.backgroundColor == "rgb(0, 0, 0)") return;
    let opacity =
      parseFloat(cell.style.backgroundColor.split(" ")[3].slice(0, 3)) * 10;
    opacity = (opacity + 1) / 10;
    backgroundColor = `rgba(0,0,0,${opacity})`;
    if (opacity == 1) cell.classList.remove("visited");
  }
}
function createGrid() {
  grid.textContent = "";
  generateNewStyles();
  const size = Math.pow(gridSize, 2);
  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("mouseover", function () {
      if (clicked == "Rainbow") {
        backgroundColor = randomRGB();
        this.classList.remove("visited");
      }
      if (clicked == "Black") {
        backgroundColor = "#000";
        this.classList.remove("visited");
      }
      if (clicked == "Gray Scale") {
        grayScale(this);
      }
      this.style.backgroundColor = backgroundColor;
    });
    grid.appendChild(div);
  }
}
function removeHover() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("hover");
  });
  gridSize = parseInt(prompt("Type new grid size (max is 100)"));
  gridSize <= 100 ? createGrid() : ((gridSize = 16), createGrid());
}

createGrid();
clearButton.addEventListener("click", removeHover);
blackButton.addEventListener("click", () => (clicked = "Black"));
rainbowButton.addEventListener("click", () => (clicked = "Rainbow"));
grayScaleButton.addEventListener("click", () => (clicked = "Gray Scale"));
