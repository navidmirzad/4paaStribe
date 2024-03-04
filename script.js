"use strict";

window.addEventListener("load", start);

// Controller

let currentplayer = 1;

function start() {
    console.log("JavaScript kører");
    displayBoard();
    makeBoardClickable();
}

function reload() {
    window.location.reload();
}

function selectCell(row, col) {
    if (readFromCell(row, col) === 0) {
        writeToCell(row, col, currentplayer);
        displayBoard();
        nextTurn();
        return true;
    } else {
        return false; 
    }
}

function nextTurn() {
    if (currentplayer === 1) {
        currentplayer = 2;
    } else if (currentplayer === 2) {
        currentplayer = 1;
    }
}

// Model

const model = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];


function writeToCell(row, col, value) {
    for (let i = model.length - 1; i >= 0; i--) {
        if (model[i][col] === 0) {
            model[i][col] = value;
            return;
        }
    }
}

function readFromCell(row, col) {
    return model[row][col];
}   

function findWinner() {
    // Check Horizontal Victories
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            let value = model[row][col];
            if (value !== 0 && value === model[row][col + 1] && value === model[row][col + 2] && value === model[row][col + 3]) {
                alert("Winner Winner Chicken Dinner")
                return value; // Return the color of the winner
            }
        }
    }

    // Check Vertical Victories
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            let value = model[row][col];
            if (value !== 0 && value === model[row + 1][col] && value === model[row + 2][col] && value === model[row + 3][col]) {
                alert("Winner Winner Chicken Dinner")
                return value; // Return the color of the winner
            }
        }
    }

    // Check Diagonal Victories (Upward)
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            let value = model[row][col];
            if (value !== 0 && value === model[row - 1][col + 1] && value === model[row - 2][col + 2] && value === model[row - 3][col + 3]) {
                alert("Winner Winner Chicken Dinner")
                return value; // Return the color of the winner
            }
        }
    }

    // Check Diagonal Victories (Downward)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            let value = model[row][col];
            if (value !== 0 && value === model[row + 1][col + 1] && value === model[row + 2][col + 2] && value === model[row + 3][col + 3]) {
                alert("Winner Winner Chicken Dinner")
                return value; // Return the color of the winner
            }
        }
    }
    
    // If no winner is found, return null
    return null;
}


// View

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", reload);

function makeBoardClickable() {
    document.querySelector("#board")
    .addEventListener("click", boardClicked);
}

function boardClicked(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    console.log(`Clicked on row: ${row} col: ${col}`);
    selectCell(row, col);
}

function displayBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const value = readFromCell(row, col);
            const cell = document
            .querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = value;

            switch(value) {
                case 0: cell.textContent = " "; break;
                case 1: cell.textContent = "📘"; break;
                case 2: cell.textContent = "📙"; break;
            }

        }
    }
    findWinner();
}