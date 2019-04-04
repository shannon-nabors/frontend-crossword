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

const keyReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_KEY":
      return action.pressedKey
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
  pressedKey: keyReducer
})

export default rootReducer
