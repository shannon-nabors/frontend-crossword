const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      return action.user
    case "LOG_OUT_USER":
      return {}
    default:
      return state
  }
}

const loggedInReducer = (state = false, action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      return true
    case "LOG_OUT_USER":
      return false
    default:
      return state
  }
}

export { currentUserReducer,
         loggedInReducer }
