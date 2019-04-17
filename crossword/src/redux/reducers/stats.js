const solvesReducer = (state = [], action) => {
  switch (action.type) {
    case "USER_SOLVES":
      return action.solves
    case "NEW_SOLVE":
      return [...state, action.solve]
    default:
      return state
  }
}

const puzzleSolvesReducer = (state = [], action) => {
  switch (action.type) {
    case "PUZZLE_SOLVES":
      return action.solves
    case "RESET_PUZZLE_SOLVES":
      return []
    default:
      return state
  }
}

const userFavoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "USER_FAVORITES":
      return action.favorites
    default:
      return state
  }
}

const puzzleFavoritesReducer = (state = [], action) => {
  switch (action.type) {
    case "PUZZLE_FAVORITES":
      return action.favorites
    case "RESET_PUZZLE_FAVORITES":
      return []
    default:
      return state
  }
}

export { solvesReducer,
         puzzleSolvesReducer,
         userFavoritesReducer,
         puzzleFavoritesReducer }
