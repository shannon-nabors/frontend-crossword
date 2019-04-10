import { combineReducers } from 'redux'

// const puzzlesReducer = (state = [], action) => {
//   switch (action.type) {
//     case "FETCHED_PUZZLES":
//       return action.puzzles
//     case "DELETED_PUZZLE":
//       return action.newPuzzles
//     case "CREATED_PUZZLE":
//       return action.newPuzzles
//     default:
//       return state
//   }
// }

const solvedPuzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles.solved_puzzles
    case "SOLVED_PUZZLE":
      return action.solved
    default:
      return state
  }
}

const unsolvedPuzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles.unsolved_puzzles
    case "SOLVED_PUZZLE":
      return action.unsolved
    default:
      return state
  }
}

const userPuzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles.user_puzzles
    case "DELETED_PUZZLE":
      return action.newPuzzles
    case "CREATED_PUZZLE":
      return action.newPuzzles
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

const newPuzzleReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NEW_PUZZLE_SIZE":
      return { ...state, size: action.num }
    case "UPDATED_PUZZLE":
      return action.puzzle
    case "TOGGLE_SHADE":
      return { ...state, cells: action.cells}
    case "UPDATE_ACROSS_CLUE":
      return { ...state, across_clues: action.clues}
    case "UPDATE_DOWN_CLUE":
      return { ...state, down_clues: action.clues}
    case "SET_LETTERS":
      return { ...state, cells: action.newCells }
    case "CLEAR_PUZZLE":
      return {}
    default:
      return state
  }
}

const currentPuzzleReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_PUZZLE":
      return action.puzzle
    default:
      return state
  }
}

// const solvedPuzzlesReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "SOLVED_PUZZLE":
//       return action.puzzle
//     default:
//       return state
// }

//

const rootReducer = combineReducers({
  // puzzles: puzzlesReducer,
  solvedPuzzles: solvedPuzzlesReducer,
  unsolvedPuzzles: unsolvedPuzzlesReducer,
  userPuzzles: userPuzzlesReducer,
  selectedCell: selectCellReducer,
  direction: directionReducer,
  highlightedCells: highlightCellReducer,
  enteredLetters: keyReducer,
  gameStatus: gameStatusReducer,
  formStage: formStageReducer,
  newPuzzle: newPuzzleReducer,
  currentPuzzle: currentPuzzleReducer
})

export default rootReducer
