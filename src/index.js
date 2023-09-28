document.addEventListener("DOMContentLoaded", function () {
    const allSubGrids = document.querySelectorAll(".sub-grid");
    const allSubCells = document.querySelectorAll(".sub-cell");

    let currentPlayer = "red";
    let currentSubGrid = document.querySelector(".center-sub-grid");

    // Function to highlight the current sub-grid
    function highlightCurrentSubGrid() {
        allSubGrids.forEach(function (subGrid) {
            subGrid.classList.remove("highlighted");
        });

        if (currentSubGrid) {
            currentSubGrid.classList.add("highlighted");
        }
    }

    // Function to check if a sub-grid is full
    function isSubGridFull(subGrid) {
        for (const cell of subGrid) {
            if (!cell.classList.contains("red") && !cell.classList.contains("blue")) {
                return false;
            }
        }
        return true;
    }
    allSubCells.forEach(function (subCell) {
    subCell.addEventListener("click", function () {
        if (!subCell.classList.contains("red") && !subCell.classList.contains("blue")) {
            const clickedSubGrid = subCell.closest(".sub-grid");
            if (currentSubGrid === null || clickedSubGrid === currentSubGrid) {
                subCell.classList.add(currentPlayer);
                currentPlayer = currentPlayer === "red" ? "blue" : "red";

                const parentSubGrid = subCell.closest(".sub-grid");
                const subCellsInGrid = parentSubGrid.querySelectorAll(".sub-cell");

                const winner = checkWin(subCellsInGrid);

                if (winner) {
                    alert(winner + " wins in this sub-grid!");

                    subCellsInGrid.forEach(function (cell) {
                        cell.classList.remove("red", "blue");
                        cell.classList.add(winner);
                    });

                    // Update the current sub-grid to null (allow any sub-grid)
                    currentSubGrid = null;
                    highlightCurrentSubGrid();
                } else if (isSubGridFull(subCellsInGrid)) {
                    // Update the current sub-grid to null (allow any sub-grid)
                    currentSubGrid = null;
                    highlightCurrentSubGrid();
                } else {
                    // Update the current sub-grid to the one corresponding to the clicked cell
                    currentSubGrid = clickedSubGrid;
                    highlightCurrentSubGrid();
                }
            }
        }
    });
});


    function checkWin(subGrid) {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const combination of winCombinations) {
            const [a, b, c] = combination;
            const cellA = subGrid[a];
            const cellB = subGrid[b];
            const cellC = subGrid[c];

            if (cellA.classList.contains("red") && cellB.classList.contains("red") && cellC.classList.contains("red")) {
                highlightWinningCells(subGrid, combination);
                return "red";
            } else if (cellA.classList.contains("blue") && cellB.classList.contains("blue") && cellC.classList.contains("blue")) {
                highlightWinningCells(subGrid, combination);
                return "blue";
            }
        }

        return null;
    }

    function highlightWinningCells(subGrid, combination) {
        for (const index of combination) {
            subGrid[index].classList.add("winner");
        }
    }

    function isGameDraw() {
        for (const subGrid of allSubGrids) {
            if (!isSubGridFull(subGrid.querySelectorAll(".sub-cell")) && !checkWin(subGrid.querySelectorAll(".sub-cell"))) {
                return false;
            }
        }
        return true;
    }

    function checkGameResult() {
        if (checkWin(allSubGrids)) {
            alert(currentPlayer + " wins the game!");
        } else if (isGameDraw()) {
            alert("It's a draw!");
        }
    }

    // Check for a game result after each move
    allSubCells.forEach(function (subCell) {
        subCell.addEventListener("click", checkGameResult);
    });

    // Initial highlight for the center sub-grid
    highlightCurrentSubGrid();
});
