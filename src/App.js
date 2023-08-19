import React from 'react';

import { layout } from './Layout.js';
import { level1, level2, level3} from './model/Levels.js'
import { redrawCanvas} from './boundary/Boundary.js'
import { Down, Key, Left, Model, Right, Up, move} from './model/Model.js'
import { moveNinjaSe, selectLevel, pickUp } from './controller/Controller.js'

// you might try this quick and dirty way to position buttons where you want (and other elements)

var firstlevel = JSON.parse(JSON.stringify(level1));   // parses string into JSON object, used below.
var secondlevel = JSON.parse(JSON.stringify(level2));   // parses string into JSON object, used below.
var thirdlevel = JSON.parse(JSON.stringify(level3));   // parses string into JSON object, used below.

function App() {
  const [model, setModel] = React.useState(() => {
    const model = new Model(firstlevel);
    model.initialize(firstlevel);
    return model;
  });
  const [redraw, forceRedraw] = React.useState(0);       // used to conveniently request redraw after model change
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
    redrawCanvas(model, canvasRef.current)
  }, [model, redraw])   // arguments that determine when to refresh

  return (
    <main>
      <canvas tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width  = "800"
        height = "800" />
      

      { model.checkVictory() ? (<label data-testid="victory-label" style={layout.victory}>You've Won!</label>) : null }
      <label data-testid="moveLabel" style={layout.moveLabel}>{"  number moves: " + model.numMoves}</label>
      <div style={layout.buttons}>
           <button data-testid="upbutton" style={layout.upbutton} onClick={(e) => setModel(moveNinjaSe(model, Up))}>^</button>
           <button data-testid="leftbutton" style={layout.leftbutton} onClick={(e) => setModel(moveNinjaSe(model, Left))}  >&lt;</button>
           <button data-testid="rightbutton" style={layout.rightbutton} onClick={(e) => setModel(moveNinjaSe(model, Right))}>&gt;</button>
           <button data-testid="downbutton" style={layout.downbutton} onClick={(e) => setModel(moveNinjaSe(model, Down))} >v</button>
           <button data-testid="level1button" style={layout.level1button} onClick={(e) => setModel(selectLevel(model,firstlevel))}>Level 1</button>
           <button data-testid="level2button" style={layout.level2button} onClick={(e) => setModel(selectLevel(model, secondlevel))} >Level 2</button>
           <button data-testid="level3button" style={layout.level3button} onClick={(e) => setModel(selectLevel(model, thirdlevel))}>Level 3</button>
           <button data-testid="pickUpbutton" style={layout.pickUpbutton} onClick={(e) => setModel(pickUp(model))}>Pick up Key</button>
           <button data-testid="resetbutton" style={layout.resetbutton} onClick={(e) => setModel(selectLevel(model, model.level))}>Reset Level</button>
      </div>
    </main>
  );
}

export default App;
