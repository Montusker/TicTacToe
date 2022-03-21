const board = document.getElementById("board");

const gameBoard = (() => {
    'use strict';
    let tttBoard = ["X", "O", "X", "O", "X", "X", "O", "X", "X"];

    const resetBoard = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""]
    }

    return {
        tttBoard: tttBoard,
        resetBoard: resetBoard,

    };
})();




const displayController = (() => {
    'use strict';

    const displayBoard = () => {
        const gamePieces = Array.from(document.querySelectorAll('.gamepiece'));
        gamePieces.forEach((piece, index) => {
            piece.innerHTML = gameBoard.tttBoard[index];
        })


    };



    return { displayBoard };
})();

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

player1.sayHello();
player2.sayHello();