
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

function setKey(pressedKey) {
  return { type: "SET_KEY", pressedKey}
}

function settingKey(pressedKey) {
  return (dispatch) => {
    dispatch(setKey(pressedKey))
  }
}

export { fetchingPuzzles, selectCell, toggleDirection, settingKey }
