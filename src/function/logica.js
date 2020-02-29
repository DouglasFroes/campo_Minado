import Field from "../components/Field";

const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) =>{
        return Array(columns).fill(0).map((_, column) =>{
            return {
                row,
                column,
                opened: false,
                flegged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) =>{
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while(minesPlanted < minesAmount){
        const rowSel = parseInt(Math.random() * rows, 10)
        const colummSel = parseInt(Math.random() * columns, 10)

        if(!board[rowSel][colummSel].mined){
            board[rowSel][colummSel].mined=true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines (board, minesAmount)
    return board
}

const cloneBoard = board =>{
    return board.map(rows =>{
        return rows.map(Field =>{
            return {...Field}
        })
    })
}

const getNeighbors = (board, row, column) =>{
    const neigbors =[];
    const rows = [row-1, row, row+1];
    const columns = [column-1, column, column+1];

    rows.forEach(r=>{
        columns.forEach(c=>{
            const difente = r !== row || c!==column;
            const validRow = r>=0 && r<board.length;
            const validCol = c>=0 && c<board[0].length;

            if(difente && validRow && validCol){
                neigbors.push(board[r][c]);
            }
        });
    });
    return neigbors;
}

const safeNeighbirs = (board, row, column) =>{
    const safes = (result, neighbor) => result && !neighbor.mined;
    return getNeighbors(board, row, column).reduce(safes, true);
}

const openField = (board, row, column) =>{
    const field = board[row][column];

    if(!field.opened){
        field.opened = true;
        if(field.mined){
            field.exploded = true;
        }else if(safeNeighbirs(board, row, column)){
            getNeighbors(board, row, column)
            .forEach(n => openField(board, n.row, n.column));
        } else{
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length;
        }
    }
}

const fields = board =>[].concat(...board);
const hadExplosion = board => fields(board)
        .filter(field => field.exploded).length>0;
const pendding = field => (field.mined && !field.flegged) 
                        || (!field.mined && !field.opened);
const wonGame = board => fields(board).filter(pendding).length === 0;
const showMines = board =>fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true);
const inverteFlag = (board, row, column) =>{
    const field = board[row][column];
    field.flegged = !field.flegged;
}
const flagsUsed= board => fields(board).filter(field=>field.flegged).length;

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    inverteFlag,
    flagsUsed
 }