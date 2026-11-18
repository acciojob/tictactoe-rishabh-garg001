//your JS code here. If required.
let player1 = "";
let player2 = "";

let currentPlayer = "";
let currentSymbol = "x";

let gameOver = false;

let board = ["", "", "", "", "", "", "", "", ""];

let submit = document.getElementById("submit");
let message = document.querySelector(".message");
let cells = document.querySelectorAll(".cell");


submit.addEventListener("click", function() {

    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    document.getElementById("player-form").style.display = "none";
    document.getElementById("game").style.display = "block";

    currentPlayer = player1;

    message.innerText = currentPlayer + ", you're up";
});


cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        if (gameOver) {
            return;
        }

        let index = Number(cell.id) - 1;

        // Cell is already filled
        if (board[index] !== "") {
            return;
        }

        // Put x or o
        board[index] = currentSymbol;
        cell.innerText = currentSymbol;


        // Winner check
        if (checkWinner()) {

            message.innerText =
                currentPlayer + " congratulations you won!";

            gameOver = true;

            return;
        }


        // Change player
        if (currentSymbol === "x") {

            currentSymbol = "o";
            currentPlayer = player2;

        } else {

            currentSymbol = "x";
            currentPlayer = player1;
        }

        message.innerText = currentPlayer + ", you're up";

    });

});


function checkWinner() {

    let winningPatterns = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    for (let i = 0; i < winningPatterns.length; i++) {

        let a = winningPatterns[i][0];
        let b = winningPatterns[i][1];
        let c = winningPatterns[i][2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }

    return false;
}