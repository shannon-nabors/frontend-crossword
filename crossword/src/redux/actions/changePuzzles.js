import { URL } from '../constants'

                         // CHANGE PUZZLE STATE //

function loading() {
  return { type: "LOADING"}
}

// Fetch puzzles
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

function fetchingGuestPuzzles() {
  return (dispatch) => {
    dispatch(loading())
    fetch(`${URL}/puzzles`)
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
  return { type: "CREATED_PUZZLE", puzzle }
}

export { loading,
         fetchedPuzzles,
         fetchingPuzzles,
         fetchingGuestPuzzles,
         deletedPuzzle,
         createdPuzzle }
