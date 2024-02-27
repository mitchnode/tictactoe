
const DOM = (function(){
    const container = document.querySelector(".container");
    const info = document.querySelector(".info");

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
    name: "Player 1",
    getToken(){
        return this.token;
    },
    getName(){
        return this.name;
    },
    setName(name){
        this.name = name;
    }
}

const playerO = {
    token : "O",
    name: "Player 2",
    getToken(){
        return this.token;
    },
    getName(){
        return this.name;
    },
    setName(name){
        this.name = name;
    }

}

const game = {
    gameover : false,
    playerTurn : "X",
    roundCount : 1,
    position : 0,
    initGame(){
        display.createGameboard();
    },
    gameLoop(index){
        if(game.checkPosition(index) == index){
            gameboard.placeToken(this.getPlayerTurn(),index);
            display.displayGameboard();
            this.checkGameover();
            if (this.gameover == false){
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
        display.initDisplay();
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
        display.displayPlayer(this.getPlayerTurn());
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
    },
    checkPosition(position){
        if(game.gameover === false){
            if(gameboard.getBoardPosition(position) === " "){
                return position;
            } else {
                this.setError("Position already taken!");
                display.displayError();
                this.setError("");
                return false;
            }
        }       
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
        DOM.container.innerHTML = "";
        DOM.info.innerHTML = "";
        const start = document.createElement("div");
        start.classList = "startbutton";
        start.textContent = "START";
        start.addEventListener('click', function(){
            DOM.container.removeChild(start);
            const player1 = document.getElementById("player1");
            const player2 = document.getElementById("player2");
            if (player1.value == ""){
                playerX.setName(player1.placeholder);
            }else {
                playerX.setName(player1.value);
            }
            if (player2.value == ""){
                playerO.setName(player2.placeholder);
            }else {
                playerO.setName(player2.value);
            }
            game.initGame();
        })
        DOM.container.appendChild(start);
        displayNameForm();
    }

    const displayNameForm = () => {
        const p = document.createElement("p");
        const player1 = document.createElement("input");
        const player1label = document.createElement("label");
        const player2 = document.createElement("input");
        const player2label = document.createElement("label");
        p.textContent = "Please enter player names and click start!";
        player1.placeholder = playerX.getName();
        player2.placeholder = playerO.getName();
        player1.id = "player1";
        player1label.htmlFor = "player1";
        player1label.textContent = "Player 1 Name:";
        player2.id = "player2";
        player2label.htmlFor = "player2";
        player2label.textContent = "Player 2 Name:";
        DOM.info.appendChild(p);
        DOM.info.appendChild(player1label);
        DOM.info.appendChild(player1);
        DOM.info.appendChild(player2label);
        DOM.info.appendChild(player2);
    }

    const disableBoard = () => {
        for (i = 0; i < gameboard.getBoardLength(); i++){
            let square = document.getElementById(i);
            square.classList = "square square-taken";
        }
        
        const reset = document.createElement('div');
        reset.classList = 'resetbutton';
        reset.textContent = "Reset"
        reset.addEventListener('click', () => {
            game.restartGame();
        }, {once: true})
        DOM.info.appendChild(reset);
    }

    const displayInfo = (info) => {
        DOM.info.innerHTML = "";

        const gameinfo = document.createElement("p");
        gameinfo.classList = "gameinfo";
        gameinfo.textContent = info;
        DOM.info.appendChild(gameinfo);
    }

    const displayWinner = (player) => {
        displayInfo(game.getPlayerTurn().getName() + " Wins!");
        disableBoard();
    }

    const displayTie = () => {
        console.log("It's a tie!");

        displayInfo("It's a Tie!");
        disableBoard();
    }

    const displayPlayer = (player) => {
        displayInfo(player.getName() + "'s Turn (" + player.getToken() + ")");
    }
    
    const createGameboard = () => {
        const position = [];
        for (i = 0; i < gameboard.getBoardLength(); i++){
            position[i] = document.createElement("div");
            position[i].id = i;
            position[i].classList = "square";
            let index = i;
            position[i].addEventListener('click', () => {
                game.gameLoop(index);
            });
            DOM.container.appendChild(position[i]);
        }
        displayPlayer(game.getPlayerTurn());

    }

    const displayGameboard = () => {
        const square = [];
        for (i = 0; i < gameboard.getBoardLength(); i++){
            square[i] = document.getElementById(i);
            square[i].textContent = gameboard.getBoardPosition(i);
            if (square[i].textContent !== " ") {
                square[i].classList = "square square-taken";
            }
            DOM.container.appendChild(square[i]);
        }
    }

    return {initDisplay, displayWinner, displayTie, displayPlayer, createGameboard, displayGameboard}
})();

display.initDisplay();