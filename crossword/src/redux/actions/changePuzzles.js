import { URL } from '../constants'

                         // CHANGE PUZZLE STATE //

function loading() {
  return { type: "LOADING"}
}

// Fetch puzzles when app mounts
function fetchedPuzzles(puzzles) {
  return { type: "FETCHED_PUZZLES", puzzles}
}

function fetchingPuzzles(id) {
  return (dispatch) => {
    dispatch(loading())

    fetch(`${URL}/puzzles/user/${id}`)
    .then(res => res.json())

    .then(puzzles => {
    dispatch(fetchedPuzzles(puzzles))
  })
 }
}

// Alter "userPuzzles" state when a puzzle is created or deleted
function deletedPuzzle(puzzle) {
  return (dispatch, getState) => {
    const { userPuzzles } = getState()

    let newPuzzles = userPuzzles.filter(p => p.id !== puzzle.id)

    dispatch({ type: "DELETED_PUZZLE", newPuzzles })
  }
}

function createdPuzzle(puzzle) {
  return (dispatch, getState) => {
    const { userPuzzles, newPuzzle } = getState()

    let newPuzzles = [...userPuzzles, newPuzzle]

    dispatch({ type: "CREATED_PUZZLE", newPuzzles })
  }
}

export { loading,
         fetchedPuzzles,
         fetchingPuzzles,
         deletedPuzzle,
         createdPuzzle }
