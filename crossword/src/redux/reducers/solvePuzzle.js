const gameStatusReducer = (state = null, action) => {
  switch (action.type) {
    case "CHANGE_GAME_STATUS":
      return action.gameStatus
    default:
      return state
  }
}

const pausedReducer = (state = false, action) => {
  switch (action.type) {
    case "HANDLE_TIMER":
      return action.status
    default:
      return state
  }
}

export { gameStatusReducer, pausedReducer }
