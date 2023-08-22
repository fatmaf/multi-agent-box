const CellState ={
    Empty:0, 
    Obstacle:1,
    Goal:2,
    Start:3 
}
class GridCell{
    state: CellState.Empty;
    constructor(row,col)
    {
        this.row = row; 
        this.col = col; 
    }
}
class Grid{
    // a grid consists of a number of cells 
    // a cell has state 
    constructor(max_rows,max_cols)
    {
        this.max_rows=max_rows; 
        this.max_cols=max_cols;
    }
}