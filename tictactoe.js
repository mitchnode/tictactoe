const gameboard = (function(){
    let board = [" "," "," "," "," "," "," "," "," "];

    const placeToken = (player, position) => {
        board[position] = player.getToken();
    }

    const displayGameboard = () => {
        console.clear();
        console.log(board[0]," | ",board[1]," | ",board[2]);
        console.log("--- ----- ---");
        console.log(board[3]," | ",board[4]," | ",board[5]);
        console.log("--- ----- ---");
        console.log(board[6]," | ",board[7]," | ",board[8]);
    }

    const getBoardPosition = (position) => {
        return board[position];
    }

    return {placeToken, displayGameboard, getBoardPosition}
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
    gameLoop(){
        while(this.gameover!=true){
            position = this.userInput(this.playerTurn);
            if(this.playerTurn === "X"){
                gameboard.placeToken(playerX, position);
            } else {
                gameboard.placeToken(playerO, position);
            }
            gameboard.displayGameboard();
            this.changeTurn();
            this.checkGameover();
            this.updateRound();
        }
    },
    checkGameover(){
        if(this.roundCount >= 3){
            this.gameover = true;
            //Just for testing, need to test for a win or tie.
        }
    },
    changeTurn(){
        if (this.playerTurn === "X"){
            this.playerTurn = "O";
        } else {
            this.playerTurn = "X";
        }
    },
    displayPlayer(){
        if (this.playerTurn === "X"){
            console.log("X's Turn");
        } else {
            console.log("O's Turn");
        }
    },
    updateRound(){
        this.roundCount += 1;
    },
    userInput(player){
        let input = prompt(player + "'s turn, please choose a position");
        input = Number(input);
        if(input <= 9 && input >= 0){
            return this.checkPosition(input);
        } else {
            this.displayError("Invalid entry");
            return this.userInput();
        }
    },
    checkPosition(position){
        if(gameboard.getBoardPosition(position) === " "){
            return position;
        } else {
            this.displayError("Position already taken!");
            return this.userInput();
        }
    },
    displayError(error){
        console.log(error);
    }
    
}

game.gameLoop();