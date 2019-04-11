const gameStatusReducer = (state = "in progress", action) => {
  switch (action.type) {
    case "TOGGLE_GAME_STATUS":
      return state === "won" ? "in progress" : "won"
    default:
      return state
  }
}

export { gameStatusReducer }
