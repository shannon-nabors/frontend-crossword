
                         // EDIT/TYPE IN PUZZLE //

// select and deselect active cell
function selectCell(cell, fellows) {
  return (dispatch, getState) => {
    const { direction } = getState()
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
function setKey(cellID, pressedKey) {
  return { type: "SET_KEY", cellID, pressedKey}
}


// remove all "entered letters" when puzzle is done
function resetAllLetters() {
  return { type: "RESET_ALL_LETTERS" }
}

// switch game status between "in progress" and "won"
function toggleGameStatus() {
  return (dispatch, getState) => {
    const { gameStatus } = getState()
    dispatch({
      type: "TOGGLE_GAME_STATUS",
      gameStatus: gameStatus
    })
  }
}

export { selectCell,
         deselectCell,
         toggleDirection,
         setKey,
         resetAllLetters,
         toggleGameStatus
       }
