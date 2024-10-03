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

