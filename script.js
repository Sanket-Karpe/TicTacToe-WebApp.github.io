const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const restartGameBtn = document.querySelector("#restart");
const newGameBtn = document.querySelector("#newGame");
const popUp = document.querySelector(".popup");
const mesg = document.getElementById("message");


let currentPlayer;
let gameGrid;

beginTheGame();

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function beginTheGame() {
    currentPlayer = "x";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    popUp.classList.remove("active");
}


function endGame(winner) {


}

function checkGameOver() {
    let winner = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) &&
            (gameGrid[position[1]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] === "x")
                winner = "x";
            else
                winner = "o";

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //it means we have a winner
            if (winner !== "") {
                gameInfo.innerText = `Winner Player - ${winner}`;
                setTimeout(() => {
                    popUp.classList.add("active");
                    if (winner !== "") {
                        mesg.innerText = `Player'${winner}'is Winner 🎉`;
                    }
                }, 1500);
                return;
            }
        }
    });

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;

    });

    //board is Filled, game is TIE
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        setTimeout(() => {
            popUp.classList.add("active");
            mesg.innerText = "Game Tied ! 🙂";
        }, 1500);
    }
}

function swapPlayer() {
    if (currentPlayer === "x")
        currentPlayer = "o";
    else
        currentPlayer = "x";

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function manageClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // console.log(gameGrid[index]);
        swapPlayer(); 
        // check game is over
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        manageClick(index);
    });
});

newGameBtn.addEventListener("click", () => {
    beginTheGame();
})
restartGameBtn.addEventListener("click", () => {
    beginTheGame();
})