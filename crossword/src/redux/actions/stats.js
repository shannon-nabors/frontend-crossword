import { URL } from '../constants'

                         // SOLVE PUZZLE //

function userSolves(solves) {
  return { type: "USER_SOLVES", solves}
}

function findSolveData(userID) {
  return (dispatch) => {
    fetch(`${URL}/solves/user/${userID}`)
    .then(res => res.json())
    .then(solves => {
      console.log(solves)
     dispatch(userSolves(solves))
    })
  }
}

export { findSolveData }
