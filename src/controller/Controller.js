import { computeSquare } from '../boundary/Boundary.js';
import { Model, Key, Door } from '../model/Model.js';



export function moveNinjaSe(model, direction) {
    let ninjase = model.puzzle.ninjase;
    if (!ninjase) { return model; } //if null, no ninja
    
    if ((ninjase.row + direction.deltar) >= model.puzzle.nr || (ninjase.column + direction.deltac) >= model.puzzle.nc || (ninjase.row + direction.deltar) < 0 || (ninjase.column + direction.deltac)< 0) { //not out of puzzle
        return model;
    }

    if (model.puzzle.cells[ninjase.row + direction.deltar][ninjase.column + direction.deltac].wall) { //dont move into wall
        return model;
    }

    
    if (model.puzzle.cells[ninjase.row + direction.deltar][ninjase.column + direction.deltac].door.row !== -1) { //there is a locked door
        //check if you have the key
        if (model.puzzle.cells[ninjase.row + direction.deltar][ninjase.column + direction.deltac].door.color === ninjase.key.color) { //ninjase has the key
            model.puzzle = model.puzzle.unlockDoor(direction);
            model.checkVictory(); 
            
        }

        //if dont have the key, can't unlock
        else {
            return model;
        }
    }
    
   
        ninjase.move(direction);
    
    model.updateMoveCount(+1);
    //refresh display
    return model.copy();

}

export function selectLevel(model, level) {
    const newmodel = new Model(level);
    newmodel.initialize(level);
    return newmodel;
    
}

export function resetLevel(model, currentLevel) {
    const newmodel = new Model(currentLevel);
    newmodel.initalize(currentLevel);
    return newmodel;

}

export function pickUp(model) {

    let currentCell = model.puzzle.cells[model.puzzle.ninjase.row][model.puzzle.ninjase.column]
    if (currentCell.key.row === -1) { //make sure there is a key
        return model;
    }
    //must be key to pick up
    let newKey = currentCell.key; 
    let oldKey = model.puzzle.ninjase.key;
    if (oldKey.row === -1) {
        //no old key, just empty cell, add key to ninjase inventory and remove from cell
       model.puzzle.ninjase = model.puzzle.ninjase.pickUp(newKey)
       model.puzzle.cells[model.puzzle.ninjase.row][model.puzzle.ninjase.column].key = new Key ('none', -1, -1)
    }
    else { //ninjase was already holding a key
        model.puzzle.ninjase = model.puzzle.ninjase.pickUp(newKey)
        model.puzzle.cells[model.puzzle.ninjase.row][model.puzzle.ninjase.column].key = oldKey
    }

    model.updateMoveCount(+1);
    return model.copy();
   
};