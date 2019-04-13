const gameStatusReducer = (state = null, action) => {
  switch (action.type) {
    case "CHANGE_GAME_STATUS":
      return action.gameStatus
    default:
      return state
  }
}

export { gameStatusReducer }
