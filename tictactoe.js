
const DOM = (function(){
    const container = document.querySelector(".container");
    const info = document.querySelector("info");

    return {container, info};
})()


const gameboard = (function(){
    let board = [" "," "," "," "," "," "," "," "," "];

    const placeToken = (player, position) => {
        board[position] = player.getToken();
    }

    const getBoardPosition = (position) => {
        return board[position];
    }

    const getBoardLength = () => {
        return board.length;
    }

    const resetBoard = () => {
        board = [" "," "," "," "," "," "," "," "," "];
    }

    return {placeToken, getBoardPosition, getBoardLength, resetBoard};
})()

const playerX = {
    token : "X",
    getToken(){
        return this.token;
    }
}

const playerO = {
    token : "O",
    getToken(){
        return this.token;
    }
}

const game = {
    gameover : false,
    playerTurn : "X",
    roundCount : 1,
    error : "",
    position : 0,
    gameLoop(){
        display.createGameboard();
        /* while(this.gameover!=true){
            //position = this.userInput(this.playerTurn);
            if(this.playerTurn === "X"){
                gameboard.placeToken(playerX, this.position);
            } else {
                gameboard.placeToken(playerO, this.position);
            }
            display.displayGameboard();
            if(this.error !== ""){
                display.displayError();
                break;
            }
            this.checkGameover();
            if(this.gameover !=true){
                this.changeTurn();
                this.updateRound();
            } 
        } */
    },
    restartGame(){
        gameboard.resetBoard();
        this.roundCount = 1;
        this.error = "";
        this.gameover = false;
        this.playerTurn = "X";
        this.gameLoop();
    },
    checkGameover(){
        this.checkWin("X");
        this.checkWin("O");
        if(this.roundCount >= 9){
            this.gameover = true;
            display.displayTie();
        }
        
    },
    changeTurn(){
        if (this.playerTurn === "X"){
            this.playerTurn = "O";
        } else {
            this.playerTurn = "X";
        }
    },
    getPlayerTurn(){
        if (this.playerTurn == "X"){
            return playerX;
        } else {
            return playerO;
        }
    },
    updateRound(){
        this.roundCount += 1;
        display.displayPlayer(this.playerTurn);
    },
    userInput(player){
        let input = prompt(player + "'s turn, please choose a position (1-9)");
        input = Number(input);
        return this.checkInput(input, player);
    },
    checkInput(input, player){
        if(input <= 9 && input >= 1){
            return this.checkPosition(input - 1,player);
        } else if (input === 0){
            this.setError("Game Cancelled!");
            this.gameover = true;
        } else {
            this.setError("Invalid entry");
            display.displayError();
            this.setError("");
            return this.userInput(player);
        }
    },
    checkPosition(position){
        console.log("Position chosen: " + position);
        if(gameboard.getBoardPosition(position) === " "){
            return position;
        } else {
            this.setError("Position already taken!");
            display.displayError();
            this.setError("");
            return false;
        }
    },
    setError(error){
        this.error = error;
    },
    getError(error){
        return this.error;
    },
    checkWin(player){
        if((gameboard.getBoardPosition(0) == player && gameboard.getBoardPosition(1) == player && gameboard.getBoardPosition(2) == player) ||
            (gameboard.getBoardPosition(3) == player && gameboard.getBoardPosition(4) == player && gameboard.getBoardPosition(5) == player) ||
            (gameboard.getBoardPosition(6) == player && gameboard.getBoardPosition(7) == player && gameboard.getBoardPosition(8) == player) ||
            (gameboard.getBoardPosition(0) == player && gameboard.getBoardPosition(3) == player && gameboard.getBoardPosition(6) == player) ||
            (gameboard.getBoardPosition(1) == player && gameboard.getBoardPosition(4) == player && gameboard.getBoardPosition(7) == player) ||
            (gameboard.getBoardPosition(2) == player && gameboard.getBoardPosition(5) == player && gameboard.getBoardPosition(8) == player) ||
            (gameboard.getBoardPosition(0) == player && gameboard.getBoardPosition(4) == player && gameboard.getBoardPosition(8) == player) ||
            (gameboard.getBoardPosition(2) == player && gameboard.getBoardPosition(4) == player && gameboard.getBoardPosition(6) == player)){
            this.gameover = true;
            display.displayWinner(player);
        }
    },
     
}

const display = (function(){
    const initDisplay = () => {
        const start = document.createElement("div");
        start.classList = "startbutton";
        start.textContent = "START";
        start.addEventListener('click', function(){
            DOM.container.removeChild(start);
            game.gameLoop();
        })
        DOM.container.appendChild(start);
    }

    const displayWinner = (player) => {
        console.log("The Winner is " + player + "!");
    }

    const displayTie = () => {
        console.log("It's a tie!");
    }

    const displayError = () => {
        console.log(game.getError());
    }

    const displayPlayer = (playerTurn) => {
        if (playerTurn === "X"){
            console.log("X's Turn");
        } else {
            console.log("O's Turn");
        }
    }

    const createGameboard = () => {
        //const container = document.querySelector(".container");
        const position = [];
        for (i = 0; i < gameboard.getBoardLength(); i++){
            position[i] = document.createElement("div");
            position[i].id = i;
            position[i].classList = "square";
            let index = i;
            position[i].addEventListener('click', function eventHandler(){
                if(game.checkPosition(index) == index){
                    gameboard.placeToken(game.getPlayerTurn(),index);
                    this.removeEventListener("click", eventHandler);
                    displayGameboard();
                    game.changeTurn();
                }

            }, false);
            DOM.container.appendChild(position[i]);
        }

    }

    const displayGameboard = () => {
        console.clear();
        console.log(gameboard.getBoardPosition(0)," | ",gameboard.getBoardPosition(1)," | ",gameboard.getBoardPosition(2));
        console.log("--- ----- ---");
        console.log(gameboard.getBoardPosition(3)," | ",gameboard.getBoardPosition(4)," | ",gameboard.getBoardPosition(5));
        console.log("--- ----- ---");
        console.log(gameboard.getBoardPosition(6)," | ",gameboard.getBoardPosition(7)," | ",gameboard.getBoardPosition(8));
        
        //TODO: Add to DOM object instead
        

        const square = [];
        for (i = 0; i < gameboard.getBoardLength(); i++){
            console.log(gameboard.getBoardPosition(i))
            square[i] = document.getElementById(i);
            square[i].textContent = gameboard.getBoardPosition(i);
            if (square[i].textContent !== " ") {
                square[i].classList = "square square-taken";
            }
            DOM.container.appendChild(square[i]);
        }
    }

    return {initDisplay, displayWinner, displayTie, displayError, displayPlayer, createGameboard, displayGameboard}
})();

display.initDisplay();