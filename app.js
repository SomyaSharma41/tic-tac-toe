let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetbutton");
let newGameButton = document.querySelector("#newgamebutton");
let msgContainer = document.querySelector(".msgcontainer");
let winMsg = document.querySelector("#msg");

let count = 0;
let turnO = true;
const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>{
    turnO = true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("box was clicked")
        if(turnO){
            box.innerText = "O"
            turnO = false;
        }
        else{
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;

    count++;
    checkWinner();
    });
});

const disableBoxes = () =>{
    for (box of boxes) {
        box.disabled=true;
    }
}
const enableBoxes = () =>{
    for (box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner = (winner) => {
    winMsg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    winMsg.innerText = "Game is a Draw.";
    msgContainer.classList.remove("hide");
}

const checkWinner = () =>{
    let winnerFound = false;
    for(let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }
    if (!winnerFound && count === 9) {
        showDraw();
}
}

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
