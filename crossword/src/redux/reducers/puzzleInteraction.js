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

const selectClueReducer = (state = null, action) => {
  switch (action.type) {
    case "SELECT_CLUE":
      return action.clue
    case "SELECT_CELL":
      return action.cell.clues.find(clue => clue.direction === action.direction)
    case "TOGGLE_DIRECTION":
      return action.selectedCell.clues.find(clue => clue.direction !== action.direction)
    case "DESELECT_CLUE":
      return null
    default:
      return state
  }
}

const directionReducer = (state = "across", action) => {
  switch (action.type) {
    case "TOGGLE_DIRECTION":
      return state === "across" ? "down" : "across"
    case "SELECT_CLUE":
      return action.direction
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
        return action.fellows
      } else {
        return action.fellows
      }
    case "TOGGLE_DIRECTION":
      if (action.direction === "across") {
        return action.fellows
      } else {
        return action.fellows
      }
    default:
      return state
  }
}

const keyReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_KEY":
      return {...state, [action.cellID]: action.pressedKey}
    case "TOGGLE_SHADE":
      return {...state, [action.cellID]: undefined }
    case "SET_ENTERED_LETTERS":
      return action.payload
    case "RESET_ALL_LETTERS":
      return {}
    default:
      return state
  }
}

export { selectCellReducer,
         selectClueReducer,
         directionReducer,
         highlightCellReducer,
         keyReducer }
