const rows = 50;
const cols = 50;
const doc = document;
const gridNode = doc.getElementById("grid");
let currentGrid = [];

const createEmptyMatrix = () => {
  let arr = Array.from(new Array(rows));
  return arr.map(row => Array.from(new Array(cols)));
};

const createNextGenGrid = () => {
  let nextGenGrid = createEmptyMatrix();

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      let cellState = currentGrid[i][j];
      let aliveNeighbours = countAliveNeighbours(currentGrid, i, j);

      if (cellState === 0 && aliveNeighbours === 3) {
        nextGenGrid[i][j] = 1;
      } else if (
        cellState === 1 &&
        (aliveNeighbours < 2 || aliveNeighbours > 3)
      ) {
        nextGenGrid[i][j] = 0;
      } else {
        nextGenGrid[i][j] = cellState;
      }
    }
  }

  currentGrid = nextGenGrid;
};

const countAliveNeighbours = (currentGrid, posY, posX) => {
  let sum = 0;

  for (let i = -1; i < 2; i += 1) {
    for (let j = -1; j < 2; j += 1) {
      let r = (posY + i + rows) % rows;
      let c = (posX + j + cols) % cols;

      sum += currentGrid[r][c];
    }
  }

  return sum - currentGrid[posY][posX];
};

const draw = () => {
  gridNode.innerHTML = "";

  currentGrid.forEach(row => {
    let rowNode = doc.createElement("div");
    rowNode.setAttribute("class", "row");

    row.forEach(col => {
      let colNode = doc.createElement("div");
      colNode.setAttribute("class", "col");
      colNode.dataset.value = col;
      // if (col === 1) {
      //   colNode.style.backgroundColor = "#000";
      // } else {
      //   colNode.style.backgroundColor = "#fff";
      // }

      rowNode.appendChild(colNode);
    });

    gridNode.appendChild(rowNode);
  });
};

const setup = () => {
  let initialGrid = createEmptyMatrix();

  currentGrid = initialGrid.map(row =>
    row.map(col => Math.round(Math.random()))
  );
  return currentGrid;
};

const tick = () => {
  setInterval(() => {
    createNextGenGrid();
    hihglightCellsByValue();
  }, 500);
};

const hihglightCellsByValue = () => {
  let cellNodes = doc.querySelectorAll('.col');
  // console.log(currentGrid);

  currentGrid.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      let currentCellNode = cellNodes[rIdx * cols + cIdx];
      currentCellNode.dataset.value = col;

      // if (col === 1) {
      //   currentCellNode.style.backgroundColor = '#000';
      // } else {
      //   currentCellNode.style.backgroundColor = "#fff";
      // }
    });
  });
};

const testOne = () => {
  let initialGrid = createEmptyMatrix();
  initialGrid = initialGrid.map((row, rIdx) => {
    return row.map((col, cIdx) => {
      if (
        (rIdx === 3 && cIdx === 5) ||
        (rIdx === 4 && cIdx === 5) ||
        (rIdx === 5 && cIdx === 5) ||
        (rIdx === 5 && cIdx === 4) ||
        (rIdx === 4 && cIdx === 3)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  });

  currentGrid = initialGrid;
};

const testTwo = () => {
  let initialGrid = createEmptyMatrix();
  initialGrid = initialGrid.map((row, rIdx) => {
    return row.map((col, cIdx) => {
      if (
        (rIdx === 4 && cIdx === 5) ||
        (rIdx === 4 && cIdx === 6) ||
        (rIdx === 4 && cIdx === 7) ||
        (rIdx === 5 && cIdx === 4) ||
        (rIdx === 5 && cIdx === 5) ||
        (rIdx === 5 && cIdx === 6)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  });

  currentGrid = initialGrid;
};

const init = () => {
  setup();
  // testOne();
  // testTwo();
  draw();

  tick();
};

init();
