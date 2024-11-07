function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            let cell = Square();
            board[i].push(cell);
        }
    }

    const getBoard = () => board;

    const markBoard = (row, col, player) =>{
        let cell = board[row][col];
        if (cell.getValue() === ' '){
            cell.markSquare(player);
        }
        return;
    }

    const printBoard = () =>{
        const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardValues);
    }
        
    return {getBoard, markBoard, printBoard};
}

function Square(){
    let value = ' ';
    const markSquare = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {markSquare, getValue};
}

function Player(){
    let playerName = ' ';
    let playerMarker = ' ';

    const getPlayerName = () => playerName;
    const getMarker = () => playerMarker;

    const setPlayerName = (newName) => {
        playerName = newName;
    }

    const setMarker = (newMarker) =>{
        playerMarker = newMarker;
    }

    return {getPlayerName, getMarker, setPlayerName, setMarker};
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two"){
    let playerOne = Player();
    playerOne.setMarker('X');
    playerOne.setPlayerName(playerOneName);
    let playerTwo = Player();
    playerTwo.setMarker('O');
    playerTwo.setPlayerName(playerTwoName);

    const players = [playerOne, playerTwo];
    let board = Gameboard();

    const getPlayers = () => {
        players.forEach((player) => {
            console.log(player.getPlayerName());
            console.log(player.getMarker());
        })
    };

    let activePlayer = players[0];

    const switchTurn = () =>{
        if (activePlayer == players[0]){activePlayer = players[1];}
        else {activePlayer = players[0];}
    }

    const getActivePlayer = () => activePlayer.getPlayerName();

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer()}'s turn`)
    }

    const checkWin = () => {

    if (board.getBoard()[0][0].getValue() !== ' ' && board.getBoard()[0][0].getValue() === board.getBoard()[0][1].getValue()
            && board.getBoard()[0][1].getValue() === board.getBoard()[0][2].getValue()){
        return true;
    }
    if (board.getBoard()[1][0].getValue() !== ' ' && board.getBoard()[1][0].getValue() === board.getBoard()[1][1].getValue()
        && board.getBoard()[1][1].getValue() === board.getBoard()[1][2].getValue()){
    return true;
    }
    if (board.getBoard()[2][0].getValue() !== ' ' && board.getBoard()[2][0].getValue() === board.getBoard()[2][1].getValue()
        && board.getBoard()[2][1].getValue() === board.getBoard()[2][2].getValue()){
    return true;
    }   

    if (board.getBoard()[0][0].getValue() !== ' ' && board.getBoard()[0][0].getValue() === board.getBoard()[1][0].getValue()
    && board.getBoard()[1][0].getValue() === board.getBoard()[2][0].getValue()){
        return true;
    }
    if (board.getBoard()[0][1].getValue() !== ' ' && board.getBoard()[0][1].getValue() === board.getBoard()[1][1].getValue()
        && board.getBoard()[1][1].getValue() === board.getBoard()[2][1].getValue()){
            return true;
    }
    if (board.getBoard()[0][2].getValue() !== ' ' && board.getBoard()[0][2].getValue() === board.getBoard()[1][2].getValue()
        && board.getBoard()[1][2].getValue() === board.getBoard()[2][2].getValue()){
            return true;
        }
    if (board.getBoard()[0][0].getValue() !== ' ' && board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue()
        && board.getBoard()[1][1].getValue() === board.getBoard()[2][2].getValue()){
            return true;
    }
    if (board.getBoard()[0][2].getValue() !== ' ' && board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue()
        && board.getBoard()[1][1].getValue() === board.getBoard()[2][0].getValue()){
            return true;
    }           
    return false; 
    }

    const checkDraw = () => {
        let cellCount = 0;
        for (let i = 0; i < board.getBoard().length; i++){
            for (let j = 0; j < board.getBoard()[i].length; j++){
                if (board.getBoard()[i][j].getValue() !== ' '){
                    cellCount++;
                }
            }
        }
        return (cellCount == 9);
    }

    const makeMove = (row, col) => {
        let cell = board.getBoard()[row][col];
        if (cell.getValue() === ' '){
            board.markBoard(row, col, activePlayer.getMarker());
            if (checkWin()){
                console.log(`${getActivePlayer()} wins!`);
                board.printBoard();
                return;
            }
            if (checkDraw()){
                console.log("No winner! It's a draw!")
                board.printBoard();
                return;
            }
            switchTurn();
            printNewRound();
        }
    }

    return {getPlayers, switchTurn, checkWin, checkDraw, getActivePlayer, printNewRound, makeMove, getBoard: board.getBoard};
}

function ScreenDisplay(){
    const game = GameController();
    const playerTurn = document.querySelector('#player-header');
    const boardDiv = document.querySelector('#board');

    const updateTurn = () => {
        playerTurn.textContent = "";
        let activePlayer = game.getActivePlayer();

        if (game.checkDraw()){
            playerTurn.textContent = `No winner! It's a draw!`;
        }
        else{
            playerTurn.textContent = `${activePlayer}'s Turn!`;
            console.log(activePlayer);    
        }
    }


    const updateScreen = () => {
        boardDiv.textContent = "";  
        let board = game.getBoard();
        updateTurn();

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement("div");
                cellButton.classList.add("square");
                boardDiv.appendChild(cellButton);

                cellButton.addEventListener('click', () =>{
                    if (!game.checkWin()){
                        game.makeMove(rowIndex, colIndex);
                    }

                    updateTurn();
                    cellButton.textContent = cell.getValue();
                    if (game.checkWin()){
                        let activePlayer = game.getActivePlayer();
                        playerTurn.textContent = `${activePlayer} Wins!`;
                    }
                })
            })
        })
    };
    updateScreen();

   

}


const reset = document.querySelector("#reset");
reset.addEventListener('click', () =>{
  ScreenDisplay();      
})


ScreenDisplay();

