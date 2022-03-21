const board = document.getElementById("board");
const gamePieces = Array.from(document.querySelectorAll('.gamepiece'));


const playerFactory = (name, xo, turn) => {
    const sayHello = () => console.log('hello!');

    const symbol = () => {
        if (xo == true) {
            return "X";
        } else {
            return "O";
        }
    }; // could upload your own emblems?

    const takeTurn = () => {

    };




    return { name, xo, turn, sayHello, symbol };
};

const player1 = playerFactory("Player 1", true, true);
const player2 = playerFactory("Player 2", false, false);

const gameBoard = (() => {
    'use strict';
    let tttBoard = ["X", "O", "X", "O", "X", "X", "O", "X", "X"];

    const resetBoard = () => {

        gameBoard.tttBoard = ["", "", "", "", "", "", "", "", ""];
        displayController.displayBoard();

    }

    const turn = (index) => {

        if (player1.turn) {
            gameBoard.tttBoard[index] = "X";
            player1.turn = false;
            player2.turn = true;

            displayController.displayBoard();

        } else {
            gameBoard.tttBoard[index] = "O";
            player1.turn = true;
            player2.turn = false;
            displayController.displayBoard();

        }



    };
    return {
        tttBoard,
        resetBoard,
        turn,

    };
})();

const displayController = (() => {
    'use strict';

    const displayBoard = () => {
        gamePieces.forEach((piece, index) => {
            piece.innerHTML = gameBoard.tttBoard[index];
        })


    };



    return { displayBoard };
})();

displayController.displayBoard();
const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', () => {
    gameBoard.resetBoard();
});

gamePieces.forEach((piece, index) => piece.addEventListener('click', () => {
    gameBoard.turn(index);
}));


player1.sayHello();
player2.sayHello();