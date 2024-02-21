const gameboard = (function(){
    let board = [" "," "," "," "," "," "," "," "," "];

    const placeToken = (player, position) => {
        board[position] = player.getToken();
    }

    const getBoardPosition = (position) => {
        return board[position];
    }

    const resetBoard = () => {
        board = [" "," "," "," "," "," "," "," "," "];
    }

    return {placeToken, getBoardPosition, resetBoard};
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
    gameLoop(){
        while(this.gameover!=true){
            position = this.userInput(this.playerTurn);
            if(this.playerTurn === "X"){
                gameboard.placeToken(playerX, position);
            } else {
                gameboard.placeToken(playerO, position);
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
        }
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
    checkPosition(position, player){
        if(gameboard.getBoardPosition(position) === " "){
            return position;
        } else {
            this.setError("Position already taken!");
            display.displayError();
            this.setError("");
            return this.userInput(player);
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

    const displayGameboard = () => {
        console.clear();
        console.log(gameboard.getBoardPosition(0)," | ",gameboard.getBoardPosition(1)," | ",gameboard.getBoardPosition(2));
        console.log("--- ----- ---");
        console.log(gameboard.getBoardPosition(3)," | ",gameboard.getBoardPosition(4)," | ",gameboard.getBoardPosition(5));
        console.log("--- ----- ---");
        console.log(gameboard.getBoardPosition(6)," | ",gameboard.getBoardPosition(7)," | ",gameboard.getBoardPosition(8));
    }

    return {displayWinner, displayTie, displayError, displayPlayer, displayGameboard}
})();

game.gameLoop();