// Gameboard module (IIFE)
const Gameboard = (function() {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    // Public methods
    return {
        getBoard: function() {
            return board;
        },

        // Method to place a marker on the board
        makeMove: function(playerSymbol, row, col) {
            if (board[row][col] === null) {
                board[row][col] = playerSymbol;
                return true;
            }
            return false;
        },

        // Method to reset the board
        resetBoard: function() {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    board[i][j] = null;
                }
            }
        }
    };
})();

// Player factory
const Player = (name, symbol) => {
    return {
        name,
        symbol
    };
};

// GameController module
const GameController = (function() {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    // Switch turns between players
    const switchTurn = function() {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };

    // Check for a winner
    const checkWinner = function() {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
                return currentPlayer;
            }
        }

        return null;
    };

    // Public methods
    return {
        playRound: function(row, col) {
            if (Gameboard.makeMove(currentPlayer.symbol, row, col)) {
                const winner = checkWinner();
                if (winner) {
                    console.log(`${winner.name} wins!`);
                    return;
                }
                switchTurn();
            } else {
                console.log("Invalid move! Try again.");
            }
        },

        // Method to reset the game
        resetGame: function() {
            Gameboard.resetBoard();
            currentPlayer = player1; // Reset turn to player 1
        }
    };
})();

// Example of using the modules
GameController.playRound(0, 0); // Player 1 makes a move at (0,0)
GameController.playRound(1, 1); // Player 2 makes a move at (1,1)
GameController.playRound(0, 1); // Player 1 makes a move at (0,1)
GameController.playRound(1, 0); // Player 2 makes a move at (1,0)
GameController.playRound(0, 2); // Player 1 makes a move at (0,2) and wins


