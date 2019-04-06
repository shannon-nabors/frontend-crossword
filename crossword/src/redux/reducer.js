import { combineReducers } from 'redux'

const puzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles
    default:
      return state
  }
}

const selectCellReducer = (state = null, action) => {
  switch (action.type) {
    case "SELECT_CELL":
      return action.cell
    case "DESELECT_CELL":
      return null
    default:
      return state
  }
}

const directionReducer = (state = "across", action) => {
  switch (action.type) {
    case "TOGGLE_DIRECTION":
      return state === "across" ? "down" : "across"
    default:
      return state
  }
}

const highlightCellReducer = (state = null, action) => {
  switch (action.type) {
    case "DESELECT_CELL":
      return null
    case "SELECT_CELL":
      if (action.direction === "down") {
        return action.cell.fellow_down
      } else {
        return action.cell.fellow_across
      }
    case "TOGGLE_DIRECTION":
      if (action.direction === "across") {
        return action.selectedCell.fellow_down
      } else {
        return action.selectedCell.fellow_across
      }
    default:
      return state
  }
}

const keyReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_KEY":
      return {...state, [action.cellID]: action.pressedKey}
    case "RESET_ALL_LETTERS":
      return {}
    default:
      return state
  }
}

const gameStatusReducer = (state = "in progress", action) => {
  switch (action.type) {
    case "TOGGLE_GAME_STATUS":
      return state === "won" ? "in progress" : "won"
    default:
      return state
  }
}

const formStageReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FORM_STAGE":
      return action.stage
    default:
      return state
  }
}

const puzzleReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NEW_PUZZLE_SIZE":
      return { ...state, size: action.num }
    // case "CREATE_NEW_PUZZLE_CELLS":
    //   return { ...state, cells: action.cells }
    case "POSTED_PUZZLE":
      return action.puzzle
    case "TOGGLE_SHADE":
      return { ...state, cells: action.cells}
    default:
      return state
  }
}

//

const rootReducer = combineReducers({
  puzzles: puzzlesReducer,
  selectedCell: selectCellReducer,
  direction: directionReducer,
  highlightedCells: highlightCellReducer,
  enteredLetters: keyReducer,
  gameStatus: gameStatusReducer,
  formStage: formStageReducer,
  newPuzzle: puzzleReducer
})

export default rootReducer
