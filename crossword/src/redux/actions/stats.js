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

export { findSolveData, resetPuzzleSolves }
