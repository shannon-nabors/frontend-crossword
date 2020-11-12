
/////////////////////////////// EDIT/TYPE IN PUZZLE ///////////////////////////////

// select and deselect active cell
function selectCell(cell, fellows) {
  return (dispatch, getState) => {
    let { direction } = getState()
    dispatch({
      type: "SELECT_CELL",
      direction: direction,
      cell: cell,
      fellows: fellows
    })
  }
}

function deselectCell() {
  return { type: "DESELECT_CELL" }
}

// select and deselect active clue
function selectClue(clue) {
  return {
    type: "SELECT_CLUE",
    direction: clue.direction,
    clue: clue
  }
}

function deselectClue() {
  return { type: "DESELECT_CLUE" }
}

// change direction on second click
function toggleDirection(fellows) {
  return (dispatch, getState) => {
    const { direction, selectedCell } = getState()
    dispatch({
      type: "TOGGLE_DIRECTION",
      direction: direction,
      selectedCell: selectedCell,
      fellows: fellows
    })
  }
}

// set pressed key
function enterLetter(cellID, pressedKey) {
  return { type: "ENTER_LETTER", 
           cellID,
           letterToEnter: pressedKey}
}

// add multiple letters to one cell if rebus feature is enabled
function addLetter(cellID, pressedKey) {
  return (dispatch, getState) => {
    const { enteredLetters } = getState()
    if (enteredLetters[cellID]) {
      const letterToEnter = enteredLetters[cellID] + pressedKey
      console.log(letterToEnter)
      dispatch({ type: "ENTER_LETTER", cellID, letterToEnter})
    } else {
      console.log('else')
      dispatch({ type: "ENTER_LETTER", cellID, letterToEnter: pressedKey})
    }
  }
}


// remove all "entered letters" when puzzle is done
function resetAllLetters() {
  return { type: "RESET_ALL_LETTERS" }
}

export { selectCell,
         deselectCell,
         toggleDirection,
         enterLetter,
         addLetter,
         resetAllLetters,
         selectClue,
         deselectClue
       }
