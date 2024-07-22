const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function checkWinner() {
    for (const [a, b, c] of winningCombinations) {
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.every(cell => cell) ? 'Tie' : null;
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] || checkWinner()) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class based on current player

    const winner = checkWinner();
    if (winner) {
        statusDiv.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameBoard.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove player-specific classes
    });
    statusDiv.textContent = '';
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
