export class MoveType {
    constructor(dr, dc) {
        this.deltar = dr;
        this.deltac = dc;
    }
    
    static parse(s) {
        if ((s === "down")  || (s === "Down"))   { return Down; }
        if ((s === "up")    || (s === "Up"))     { return Up; }
        if ((s === "left")  || (s === "Left"))   { return Left; }
        if ((s === "right") || (s === "Right"))  { return Right; }
        
        return NoMove;
    }
}
export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");  // no move is possible

export class Cell {
    constructor(r, c) {
        this.row = r;
        this.column = c
        this.ninjase = new Ninjase(-1, -1, new Key ("none", -1, -1));
        this.wall = false;
        this.door = new Door ("none", -1, -1);
       this.key = new Key ("none", -1, -1);
    }
    //fill in methods
}

export class Ninjase {
    constructor(r, c) {
       this.row = r;
       this.column = c;
       this.key = new Key("none", -1, -1);
    }
    move(direction) { //move row or column of ninjase
        this.row += direction.deltar;
        this.column += direction.deltac;
    }
    pickUp(newKey) { 
        let newNinja = this
            newNinja.key = newKey; 
            return newNinja
        }

}
export class Key {
    constructor(color,r, c) {
        this.color = color;
        this.row = r;
        this.column = c;
       
    }
    //other methods
}
export class Door {
    constructor(color, r, c) {
        this.color= color;
        this.row = r;
       this.column = c;
    }
    

    //other methods
}
export class Puzzle {
    constructor(nr, nc, ninja, wall, door, key, locks) {
        this.nr = nr
        this.nc = nc
        this.wall = wall
        this.ninjase = ninja
        this.door = door
        this.key = key
        this.totalLocks = locks;


        //2D array 
        this.cells = []
        for (let r = 0; r < nr; r++) { 
            this.cells[r] = []; 
            for (let c = 0; c < nc; c++) {
                this.cells[r][c] = new Cell(r, c)
            }
        }
        //initalize ninja se, walls, keys, and doors
       let ninjacell = this.cells[this.ninjase.row][this.ninjase.column];
        ninjacell.ninjase = this.ninjase
       
        wall.forEach((w) => {
            this.cells[w.row][w.column].wall = true;
        }
        )

        key.forEach((k) => {
            this.cells[k.row][k.column].key = new Key (k.color, k.row, k.column);
        }
        )
        door.forEach((d) => {
            this.cells[d.row][d.column].door = new Door (d.color, d.row, d.column);

        }
        )
        
    
    }
    clone() {
        let copy = new Puzzle(this.nr, this.nc, this.ninjase, this.wall, this.door, this.key, this.totalLocks);
       
        copy.cells = []
        for (let r = 0; r < this.nr; r++) { 
            copy.cells[r] = []; 
            for (let c = 0; c < this.nc; c++) {
                 copy.cells[r][c] = this.cells[r][c]
            }
        }

        return copy;
    }


    unlockDoor(direction) {
        
    this.totalLocks += 1;
    this.cells[this.ninjase.row + direction.deltar][this.ninjase.column + direction.deltac].door = new Door ('none', -1, -1)
    this.removeKeyInventory(direction);
    

        return this;

    
}
    

    removeKeyInventory(direction) {
        
        //remove key from the list of keys in puzzle
      
this.cells[this.ninjase.row + direction.deltar][this.ninjase.column + direction.deltac].key = new Key ("none", -1, -1)
this.ninjase.key = new Key ('none', -1, -1)
    }
}
    




// Model knows the level (you need 3). Knows the Puzzle
export class Model {

    constructor(level) {
        this.level = level
    }
    
    initialize(levels) {
        let rows = levels.rows;
        let columns = levels.columns;
        let ninjase = new Ninjase(levels.ninjase.row, levels.ninjase.column)
        let walls = levels.walls;
        let doors = levels.doors;
        let keys = levels.keys;
        
        this.puzzle= new Puzzle(rows, columns, ninjase, walls, doors ,keys, 0)
        //initalize each cell, 
        this.numMoves = 0;
        this.victory = false;
    
    }
    
    
    copy() {
        let m = new Model(this.level);                 
        m.puzzle = this.puzzle.clone();
        m.numMoves = this.numMoves;
        m.totalLocks = this.totalLocks
        return m;
    }
    

    updateMoveCount(delta) {
        this.numMoves += delta;
    }
    
    numberMoves() {
        return this.numMoves;
    }
   
    checkVictory() {
    if (this.puzzle.key.length === this.puzzle.totalLocks) {
        this.victory = true; 
        return true
}
return false
    }

}
