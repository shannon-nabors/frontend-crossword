const loadingReducer = (state = false, action) => {
  switch(action.type){
    case "LOADING":
      return true
    case "FETCHED_PUZZLES":
      return false
    case "UPDATED_PUZZLE":
      return false
    default:
      return state
  }
}

const solvedPuzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles.solved_puzzles
    case "SOLVED_PUZZLE":
      return action.solved
    case "EDIT_SOLVED_FAVS":
      return action.puzzles
    case "LOG_OUT_USER":
      return []
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
    case "EDIT_UNSOLVED_FAVS":
      debugger
      return action.puzzles
    case "LOG_OUT_USER":
      return []
    default:
      return state
  }
}

const userPuzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles.user_puzzles
    case "DELETED_USER_PUZZLE":
      return action.newPuzzles
    case "CREATED_PUZZLE":
      return [...state, action.puzzle]
    case "LOG_OUT_USER":
      return []
    default:
      return state
  }
}

const savedPuzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles.saved_puzzles
    case "DELETED_SAVED_PUZZLE":
      return action.newPuzzles
    case "SET_LETTERS":
      return (state.find(puz => puz.id === action.updatedPuzzle.id) ? [...state.filter(puz => puz.id !== action.updatedPuzzle.id), action.updatedPuzzle] : [...state, action.updatedPuzzle])
    case "CREATED_PUZZLE":
      return state.filter(p => p.id !== action.puzzle.id)
    case "LOG_OUT_USER":
      return []
    default:
      return state
  }
}

const printImageReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_PRINT":
      return action.image
    default:
      return state
  }
}


export { loadingReducer,
         solvedPuzzlesReducer,
         unsolvedPuzzlesReducer,
         savedPuzzlesReducer,
         printImageReducer,
         userPuzzlesReducer }
