import { fetchingPuzzles } from './changePuzzles'
import { findSolveData, getFavorites } from './stats'

                         // HANDLE USER STUFF //

function logInUser(user) {
  return (dispatch, getState) => {
    dispatch(fetchingPuzzles(user.id))
    dispatch(findSolveData("user", user.id))
    dispatch(getFavorites("user", user.id))
    dispatch({ type: "LOG_IN_USER", user })
  }
}

function logOutUser(user) {
  return { type: "LOG_OUT_USER", user}
}


export { logInUser,
         logOutUser }
