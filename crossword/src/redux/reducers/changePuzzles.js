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
      debugger
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
    case "DELETED_PUZZLE":
      return action.newPuzzles
    case "CREATED_PUZZLE":
      return action.newPuzzles
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
    case "DELETED_PUZZLE":
      return action.newPuzzles
    case "CREATED_PUZZLE":
      return action.newPuzzles
    case "LOG_OUT_USER":
      return []
    default:
      return state
  }
}

export { loadingReducer,
         solvedPuzzlesReducer,
         unsolvedPuzzlesReducer,
         savedPuzzlesReducer,
         userPuzzlesReducer }
