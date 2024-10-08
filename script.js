const Gameboard = (function() {

    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

// Pubic methods

 return {

    getBoard: function() {
        return board;
    },

    // Method to place a marker on the board

    makeMove: function(playerSymbol, row, col) {
    if (board[row][col] === null){
        board[row][col] = playerSymbol
        return true;
    }
    return false;
    },

    // Method to reset the board
    resetBoard: function(){
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board[i].length; j++){
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

const GameController = (function(){

  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let currentPlayer = player1;

  // switch turns between players

  const switchTurn = function(){
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    displayController.updateMessage(`${currentPlayer.name}'s turn`)
  };

  // Check for winner 

  const checkWinner = function(){
    const board = Gameboard.getBoard();
    const winningCombinations = [
        //rows
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
    playRound: function(row, col){
        if (Gameboard.makeMove(currentPlayer.symbol, row, col)) {
            displayController.render(Gameboard.getBoard());

            const winner = checkWinner();
            if (winner) {
                displayController.updateMessage(`${winner.name} wins!`);
                return;
            }
            switchTurn();
        } else {
            displayController.updateMessage('Invalid move. Try again.');
        }
    },

    // Method to reset the game

    resetGame: function() {
        Gameboard.resetBoard();
        currentPlayer = player1;
    }

  };


})();

const displayController = (function(){
    
    const gameboardElement = document.getElementById('gameBoard');
    const messageDisplay = document.getElementById('messageDisplay');

 // Function to update the message on the webpage

 const updateMessage = function(message) {
    messageDisplay.textContent = message;
 };

 // Render the contents of the gameboard array to the webpage
  
 const render = function(gameboard) {

 // Clear the gameboard container before rendering
    gameboardElement.innerHTML = '';

 // Loop through the gameboard array
  
  gameboard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) =>{
        // Create a new div for each cell
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell ? cell : '';

        // Add a data attribute to keep track of the cell's position
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;

        // Add event listener for clicks on the cell
        cellElement.addEventListener('click', () => {
            GameController.playRound(rowIndex, colIndex);
        });

        // Append the cell to the gameboard container
        gameboardElement.appendChild(cellElement);


    });
  });

 };

 return { render, updateMessage };


})();

// Initial render of the empty gameboard

displayController.render(Gameboard.getBoard());