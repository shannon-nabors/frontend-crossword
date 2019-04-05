
const URL = `http://localhost:3000/puzzles`

function fetchedPuzzles(puzzles) {
  return { type: "FETCHED_PUZZLES", puzzles}
}

function fetchingPuzzles() {
  return (dispatch) => {
    fetch(URL)
    .then(res => res.json())
    .then(puzzles => {
      dispatch(fetchedPuzzles(puzzles))
    })
  }
}

function selectCell(cell) {
  return (dispatch, getState) => {
    const { direction } = getState()
    dispatch({
      type: "SELECT_CELL",
      direction: direction,
      cell: cell
    })
  }
}

function deselectCell() {
  return { type: "DESELECT_CELL" }
}

function toggleDirection() {
  return (dispatch, getState) => {
    const { direction, selectedCell } = getState()
    dispatch({
      type: "TOGGLE_DIRECTION",
      direction: direction,
      selectedCell: selectedCell
    })
  }
}

function setKey(cellID, pressedKey) {
  return { type: "SET_KEY", cellID, pressedKey}
}

function settingKey(cellID, pressedKey) {
  return (dispatch) => {
    dispatch(setKey(cellID, pressedKey))
  }
}

function resetAllLetters() {
  return { type: "RESET_ALL_LETTERS" }
}

function toggleGameStatus() {
  return (dispatch, getState) => {
    const { gameStatus } = getState()
    dispatch({
      type: "TOGGLE_GAME_STATUS",
      gameStatus: gameStatus
    })
  }
}

function setFormStage(stage) {
  return { type: "SET_FORM_STAGE", stage}
}

function setNewPuzzleSize(num) {
  return { type: "SET_NEW_PUZZLE_SIZE", num}
}

function createNewPuzzleCells(cells) {
  return { type: "CREATE_NEW_PUZZLE_CELLS", cells }
}

export { fetchingPuzzles,
         selectCell,
         deselectCell,
         toggleDirection,
         settingKey,
         resetAllLetters,
         toggleGameStatus,
         setNewPuzzleSize,
         createNewPuzzleCells,
         setFormStage }
