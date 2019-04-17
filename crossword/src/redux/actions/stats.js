import { URL } from '../constants'

                         // SOLVE PUZZLE //

function userSolves(solves) {
  return { type: "USER_SOLVES", solves}
}

function puzzleSolves(solves) {
  return { type: "PUZZLE_SOLVES", solves}
}

function resetPuzzleSolves() {
  return { type: "RESET_PUZZLE_SOLVES" }
}

function findSolveData(type, id) {
  return (dispatch) => {
    fetch(`${URL}/solves/${type}/${id}`)
    .then(res => res.json())
    .then(solves => {
     type === "user" ? dispatch(userSolves(solves)) : dispatch(puzzleSolves(solves))
    })
  }
}

function setUserFavorites(favorites) {
  return { type: "USER_FAVORITES", favorites}
}

function setPuzzleFavorites(favorites) {
  return { type: "PUZZLE_FAVORITES", favorites}
}

function resetPuzzleFavorites() {
  return { type: "RESET_PUZZLE_FAVORITES" }
}

function getFavorites(type, id) {
  return (dispatch) => {
    fetch(`${URL}/favorites/${type}/${id}`)
    .then(res => res.json())
    .then(favorites => {
     type === "user" ? dispatch(setUserFavorites(favorites)) : dispatch(setPuzzleFavorites(favorites))
    })
  }
}

function addFavorite(puzzleID) {
  return (dispatch, getState) => {
    const { currentUser, userFavorites, puzzleFavorites } = getState()
    fetch(`${URL}/favorites`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: currentUser.id,
        puzzle_id: puzzleID
      })
    }).then(res => res.json())
    .then(favorite => {
      let newUserFavs = [...userFavorites, favorite]
      let newPuzzleFavs = [...puzzleFavorites, favorite]
      dispatch(setUserFavorites(newUserFavs))
      dispatch(setPuzzleFavorites(newPuzzleFavs))
    })
  }
}

export { findSolveData, resetPuzzleSolves, resetPuzzleFavorites, getFavorites, addFavorite }
