// redraw the Puzzle so I can see it

// Scaling Constants for Canvas
var BOXSIZE = 100;
const OFFSET = 8;

/** Represents a rectangle. */
export class Square {
    constructor(x, y, size) {
      this.x = x
      this.y = y
      this.size = size
    }
}

export function computeSquare(cell) {
    return new Square(BOXSIZE*cell.column + OFFSET, BOXSIZE*cell.row + OFFSET, BOXSIZE - 2*OFFSET, BOXSIZE-2*OFFSET)
}


/** Redraw entire canvas from model. */
export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  
   
    // showing the outermost information
    let nr = model.puzzle.nr
    let nc = model.puzzle.nc

    ctx.fillStyle = 'black'

    for (let r = 0; r < nr; r++) {
        for (let c = 0; c < nc; c++) {
            let cell = model.puzzle.cells[r][c]
            let sq = computeSquare(cell)

            // HERE is where you draw everything about this cell that you know about...
            if (cell.wall === true) {
                ctx.fillStyle ='black'
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)

            }
            if (r === model.puzzle.ninjase.row & c === model.puzzle.ninjase.column) {
                ctx.fillStyle ='purple'
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)

                if (model.puzzle.ninjase.key.row !== -1) {
                    let c = model.puzzle.ninjase.key.color
                    ctx.fillStyle =c
                    ctx.fillRect(sq.x + 35, sq.y + 5, 10, 10)
        
            }

            }
            if (cell.key.row != -1) {
                let c = cell.key.color
                ctx.fillStyle =c
                ctx.fillRect(sq.x + 25, sq.y + 25, 30, 30)

            }
            if (cell.door.row != -1) {
                ctx.fillStyle = 'black'
                ctx.fillRect(sq.x, sq.y, sq.size, sq.size)
                let c = cell.door.color
                ctx.fillStyle =c
                ctx.fillRect(sq.x + 10, sq.y + 10, sq.size -20, sq.size -20)
                ctx.fillStyle = 'white'
                ctx.fillRect(sq.x + 25, sq.y + 25, 30, 30)

            }
        

            
            ctx.strokeRect(sq.x, sq.y, sq.size, sq.size)
        }
    }
}