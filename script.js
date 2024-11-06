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

    const checkWin = (row, col) => {
        if (board.getBoard()[row][0].getValue() === board.getBoard()[row][1].getValue()
            && board.getBoard()[row][1].getValue() === board.getBoard()[row][2].getValue()){
        return true;
    }
    if (board.getBoard()[0][col].getValue() === board.getBoard()[1][col].getValue()
    && board.getBoard()[1][col].getValue() === board.getBoard()[2][col].getValue()){
        return true;
    }      
    return false; 
    }

    const checkDraw = () => {
        for (let i = 0; i < board.rows; i++){
            console.log('hi');
        }
    }

    const makeMove = (row, col) => {
        let cell = board.getBoard()[row][col];
        if (cell.getValue() === ' '){
            board.markBoard(row, col, activePlayer.getMarker());
            if (checkWin(row, col)){
                console.log(`${getActivePlayer()} wins!`);
                board.printBoard();
                return;
            }
            checkDraw();
            switchTurn();
            printNewRound();
        }
    }

    return {getPlayers, switchTurn, getActivePlayer, printNewRound, makeMove};
}


let gameController = GameController();
gameController.printNewRound();
gameController.makeMove(1,1);
gameController.makeMove(1,2);
gameController.makeMove(0,0);
gameController.makeMove(0, 2);
gameController.makeMove(2,1);
gameController.makeMove(2,2);
