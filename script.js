// Sample Sudoku puzzle
const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const board = document.getElementById('sudoku-board');
const validateBtn = document.getElementById('validate-btn');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

// Generate Sudoku grid
function generateGrid() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = 1;
            cell.classList.add('cell');
            if (puzzle[i][j] !== 0) {
                cell.value = puzzle[i][j];
                cell.setAttribute('readonly', true);
            }
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
        }
    }
}

// Validate Sudoku solution
function validateSolution() {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());

    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);
        const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        const value = Number(cell.value);

        if (isNaN(value) || value < 1 || value > 9) {
            message.textContent = 'Invalid input. Please enter numbers between 1 and 9.';
            return false;
        }

        if (rows[row].has(value) || cols[col].has(value) || boxes[box].has(value)) {
            message.textContent = 'Incorrect solution.';
            return false;
        }

        rows[row].add(value);
        cols[col].add(value);
        boxes[box].add(value);
    }

    message.textContent = 'Congratulations! You solved the puzzle!';
    return true;
}

// Reset the Sudoku board
function resetGrid() {
    generateGrid();
    message.textContent = '';
}

// Event listeners
validateBtn.addEventListener('click', validateSolution);
resetBtn.addEventListener('click', resetGrid);

// Initialize the grid
generateGrid();
