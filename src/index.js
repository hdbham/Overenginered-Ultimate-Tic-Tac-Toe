document.addEventListener("DOMContentLoaded", function () {
    const allSubGrids = document.querySelectorAll(".sub-grid");
    const allSubCells = document.querySelectorAll(".sub-cell");
    const currentPlayerTag = document.getElementById("current-player");
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

    // Check if the current sub-grid is full
    const subCellsInGrid = currentSubGrid.querySelectorAll(".sub-cell");
    if (isSubGridFull(subCellsInGrid)) {
        // If it's full, set currentSubGrid to null (allow any sub-grid)
        currentSubGrid = null;
        allSubGrids.forEach(function (subGrid) {
            subGrid.classList.add("highlighted");
        });
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
                    // Mark the clicked cell with the current player's color
                    subCell.classList.add(currentPlayer);
    
                    // Get the data-position attribute of the clicked cell
                    const cellNum = subCell.getAttribute("data-position");
                    currentSubGrid = document.getElementById(cellNum);

                    // Check for a win in the sub-grid
                    const parentSubGrid = clickedSubGrid;
                    const subCellsInGrid = parentSubGrid.querySelectorAll(".sub-cell");
                    const winner = checkWin(subCellsInGrid);
                 
                    if (winner) {
                        alert(winner + " wins in this sub-grid!");
    
                        subCellsInGrid.forEach(function (cell) {
                            cell.classList.remove("red", "blue");
                            cell.classList.add(winner);
                        });

                        currentSubGrid = null;
                    } else if (isSubGridFull(subCellsInGrid)) {
                        // Update the current sub-grid to null (allow any sub-grid)
                        currentSubGrid = null;
                    }
                    currentPlayer = currentPlayer === "red" ? "blue" : "red";
                    highlightCurrentSubGrid()
                    checkGameWin();
                    // Toggle the current player
                } else {
                    // Handle the case where the player clicked on an invalid sub-grid
                    alert("Invalid move. You must play in the highlighted sub-grid.");
                }

                currentPlayerTag.innerHTML = "";
                currentPlayerTag.innerHTML = `Current player is ${currentPlayer}`;
            }
        });
    });
    function checkGameWin() {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    
        for (const combination of winCombinations) {
            const [a, b, c] = combination;
            const subGridA = allSubGrids[a];
            const subGridB = allSubGrids[b];
            const subGridC = allSubGrids[c];
    
            if (
                (subGridA.classList.contains("red") && subGridB.classList.contains("red") && subGridC.classList.contains("red")) ||
                (subGridA.classList.contains("blue") && subGridB.classList.contains("blue") && subGridC.classList.contains("blue"))
            ) {
                alert(subGridA.classList.contains("red") ? "Red" : "Blue" + " wins the game!");
                confetti();
                return;
            }
        }
    }
    


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
            subGrid[index].classList.add(currentPlayer);
            subGrid[index].closest(".sub-grid").classList.add(currentPlayer);
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


    // Initial highlight for the center sub-grid
    highlightCurrentSubGrid();
});
