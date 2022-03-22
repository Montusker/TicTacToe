const board = document.getElementById("board");
const gamePieces = Array.from(document.querySelectorAll('.gamepiece'));
const winnerDisplay = document.getElementById("winner");
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");

const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");

const formExpand = document.getElementById("expand-form");
const formHolder = document.getElementById("form-holder");
const formSubmit = document.getElementById("name-changer");

const resetScore = document.getElementById("score-resetter");

const resetButton = document.getElementById("reset");

const playerFactory = (name, xo, turn, score) => {
    let playerName = name;
    let playerXO = xo;
    let playerTurn = turn;

    const getName = () => playerName;
    const getXO = () => {
        if (playerXO) {
            return "X";
        } else {
            return "O";
        }
    };
    const getTurn = () => playerTurn;
    const setName = (newName) => {
        playerName = newName;
    }
    const takeTurn = () => {
        if (getTurn()) {
            playerTurn = false;
        } else {
            playerTurn = true;
        }
    };
    const setTurn = (isTurn) => {
        playerTurn = isTurn;
    };
    return { getName, score, setTurn, takeTurn, getXO, setName, getTurn };
};

const player1 = playerFactory("Player 1", true, true, 0);
const player2 = playerFactory("Player 2", false, false, 0);

const gameBoard = (() => {
    'use strict';
    let tttBoard = ["", "", "", "", "", "", "", "", ""];

    const resetBoard = () => {
        gameBoard.tttBoard = ["", "", "", "", "", "", "", "", ""];
        player1.setTurn(true);
        player2.setTurn(false);
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
            if (player1.getTurn()) {
                gameBoard.tttBoard[index] = player1.getXO();
            } else {
                gameBoard.tttBoard[index] = player2.getXO();
            }
            displayController.displayBoard();
            if (_checkGameOver()) {
                displayController.declareWinner();
            } else {
                player1.takeTurn();
                player2.takeTurn();
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
        if (player1.getTurn()) {
            winnerDisplay.innerHTML = player1.getName() + " won! Congratulations!";
            player1.score++;
            player1Score.innerHTML = player1.score;

        } else {
            winnerDisplay.innerHTML = player2.getName() + " won! Congratulations!";
            player2.score++;
            player2Score.innerHTML = player2.score;
        }
    }

    return { displayBoard, declareWinner };
})();


resetButton.addEventListener('click', () => {
    gameBoard.resetBoard();
    winnerDisplay.innerHTML = "Tic-Tac-Toe";
});

formExpand.addEventListener('click', () => {
    if (formHolder.style.display === "none") {
        formHolder.style.display = "block";
    } else {
        formHolder.style.display = "none";
    }
});

formSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    let playerName1 = document.getElementById('player1Name').value;
    let playerName2 = document.getElementById('player2Name').value;
    player1.setName(playerName1);
    player2.setName(playerName2);
    player1Name.innerHTML = player1.getName();
    player2Name.innerHTML = player2.getName();
});

resetScore.addEventListener('click', (event) => {
    event.preventDefault();

    player1.score = 0;
    player2.score = 0;
    player1Score.innerHTML = player1.score;
    player2Score.innerHTML = player2.score;

});

gameBoard.turn();