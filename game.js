const gameBoard = (() => {
    'use strict';
    let _gameBoard = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];

    const resetBoard = () => {
        _gameBoard = ["", "", "", "", "", "", "", "", ""]
    }

    return {
        _gameBoard,
        resetBoard,

    };
});

const displayController = (() => {
    'use strict';


    return {};
});

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