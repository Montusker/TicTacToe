const board = document.getElementById("board");
const gamePieces = Array.from(document.querySelectorAll('.gamepiece'));
const winnerDisplay = document.getElementById("winner");
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");


const playerFactory = (name, xo, turn, score) => {

    const symbol = () => {
        if (xo == true) {
            return "X";
        } else {
            return "O";
        }
    }; // could upload your own emblems?

    const takeTurn = () => {

    };




    return { name, xo, turn, score, symbol };
};

const player1 = playerFactory("Player 1", true, true, 0);
const player2 = playerFactory("Player 2", false, false, 0);

const gameBoard = (() => {
    'use strict';
    let tttBoard = ["", "", "", "", "", "", "", "", ""];

    const resetBoard = () => {

        gameBoard.tttBoard = ["", "", "", "", "", "", "", "", ""];

        player1.turn = true;
        player2.turn = false;
        displayController.displayBoard();

    }



    const _checkRows = () => {
        for (let i = 0; i < 3; i++) {
            let tempRow = [];

            for (let j = 0; j < 3; j++) {
                tempRow.push(gameBoard.tttBoard[j + (3 * i)]);
            }

            if (tempRow.every(field => field == "X") || tempRow.every(field => field == "O")) {

                return true;
            }
        }
    }

    const _checkCols = () => {
        for (let i = 0; i < 3; i++) {
            let tempCol = [];

            for (let j = 0; j < 3; j++) {
                tempCol.push(gameBoard.tttBoard[(i + 3 * j)]);
            }

            if (tempCol.every(field => field == "X") || tempCol.every(field => field == "O")) {

                return true;
            }
        }
    }
    const _checkDiag = () => {
        let tempDiag = [];
        for (let i = 0; i < 3; i++) {

            tempDiag.push(gameBoard.tttBoard[(i * 4)]);
        }
        if (tempDiag.every(field => field == "X") || tempDiag.every(field => field == "O")) {
            return true;
        }
    }
    const _checkRevDiag = () => {
        let tempDiag = [];
        for (let i = 0; i < 3; i++) {

            tempDiag.push(gameBoard.tttBoard[((i + 1) * 2)]);
        }
        if (tempDiag.every(field => field == "X") || tempDiag.every(field => field == "O")) {
            return true;
        }
    }

    const _checkGameOver = () => {

        if (_checkRows() || _checkCols() || _checkDiag() || _checkRevDiag())
            return true;
        else
            return false;
    }

    const turn = (index) => {

        gamePieces.forEach((piece, index) => piece.addEventListener('click', () => {
            if (_checkGameOver() || gameBoard.tttBoard[index]) {
                return 0;
            }

            if (player1.turn) {
                gameBoard.tttBoard[index] = "X";
                displayController.displayBoard();

                console.log(_checkGameOver());
                if (_checkGameOver()) {
                    displayController.declareWinner();

                }
                player1.turn = false;
                player2.turn = true;


            } else {
                gameBoard.tttBoard[index] = "O";
                console.log(_checkGameOver());
                displayController.displayBoard();

                if (_checkGameOver()) {
                    displayController.declareWinner();

                }
                player1.turn = true;
                player2.turn = false;

            }
        }));




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
    const declareWinner = () => {
        if (player1.turn) {
            winnerDisplay.innerHTML = player1.name + " won! Congratulations!";
            player1.score++;
            player1Score.innerHTML = player1.score;

        } else {
            winnerDisplay.innerHTML = player2.name + " won! Congratulations!";
            player2.score++;
            player2Score.innerHTML = player2.score;


        }
    }


    return { displayBoard, declareWinner };
})();

displayController.displayBoard();
const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', () => {
    gameBoard.resetBoard();
    winnerDisplay.innerHTML = "";
});

gameBoard.turn();