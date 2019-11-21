const formStageReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FORM_STAGE":
      return action.stage
    default:
      return state
  }
}

const interactionTypeReducer = (state = null, action) => {
  switch (action.type) {
    case "TOGGLE_INTERACTION_TYPE":
      return action.interactionType
    default:
      return state
  }
}

const newPuzzleReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NEW_PUZZLE_SIZE":
      return { ...state, size: action.num, constructor: action.currentUser }
    case "UPDATED_PUZZLE":
      return action.puzzle
    case "TOGGLE_SHADE":
      return { ...state, cells: action.cells}
    case "UPDATE_ACROSS_CLUE":
      return { ...state, across_clues: action.clues}
    case "UPDATE_DOWN_CLUE":
      return { ...state, down_clues: action.clues}
    case "UPDATE_TITLE":
      return { ...state, title: action.content}
    case "SET_LETTERS":
      // return { ...state, cells: action.newCells }
      return action.updatedPuzzle
    case "CLEAR_PUZZLE":
      return {}
    default:
      return state
  }
}

export { formStageReducer,
         newPuzzleReducer,
         interactionTypeReducer }
