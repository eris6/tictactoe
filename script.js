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

    const checkWin = () => {
        const winnerCoordinates = []
    }

    const printBoard = () =>{
        const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardValues);
    }
        
    return {getBoard, markBoard, checkWin, printBoard};
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


    const makeMove = (row, col) => {
        let cell = board.getBoard()[row][col];
        if (cell.getValue() === ' '){
            board.markBoard(row, col, activePlayer.getMarker());
            switchTurn();
        }


    }

    return {getPlayers, switchTurn, getActivePlayer, printNewRound, makeMove};
}


let game = Gameboard();
game.markBoard(1, 0, "X");
game.printBoard();
