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

export { solvesReducer }
