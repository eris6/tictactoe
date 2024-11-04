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

