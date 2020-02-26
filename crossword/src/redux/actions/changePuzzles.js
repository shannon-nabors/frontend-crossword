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
  let targetUrl = (id ? `${URL}/puzzles/user/${id}` : `${URL}/puzzles`)
  return (dispatch) => {
    dispatch(loading())

    fetch(targetUrl)
    .then(res => res.json())

    .then(puzzles => {
    dispatch(fetchedPuzzles(puzzles))
  })
 }
}

// function fetchedPuzzle(puzzle) {
//   return { type: "FETCHED_PUZZLES", puzzle}
// }

// function fetchingPuzzles(id) {
//   return (dispatch) => {
//     dispatch(loading())

//     fetch(`${URL}/puzzles/${id}`)
//     .then(res => res.json())

//     .then(puzzle => {
//     dispatch(fetchedPuzzle(puzzle))
//   })
//  }
// }

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
function deletedUserPuzzle(puzzle, saved) {
  return (dispatch, getState) => {
    const { userPuzzles } = getState()
    let newPuzzles = userPuzzles.filter(p => p.id !== puzzle.id)
    dispatch({ type: "DELETED_USER_PUZZLE", newPuzzles })
  }
}

function deletedSavedPuzzle(puzzle, saved) {
  return (dispatch, getState) => {
    const { savedPuzzles } = getState()
    let newPuzzles = savedPuzzles.filter(p => p.id !== puzzle.id)
    dispatch({ type: "DELETED_SAVED_PUZZLE", newPuzzles })
  }
}

function createdPuzzle(puzzle) {
  return { type: "CREATED_PUZZLE", puzzle }
}

function savedPuzzle(puzzle) {
  return (dispatch, getState) => {
    const { savedPuzzles } = getState()
    let newPuzzles
    let alreadySaved = savedPuzzles.find(puz => puz.id === puzzle.id)
    if (alreadySaved) {
      newPuzzles = [...savedPuzzles.filter(p => p.id !== puzzle.id), puzzle]
    } else {
      newPuzzles = [...savedPuzzles, puzzle]
    }

    dispatch({ type: "SAVED_PUZZLE", newPuzzles })
  }
}

function setPrint(image) {
  return { type: "SET_PRINT", image: image}
}

export { loading,
         fetchedPuzzles,
         fetchingPuzzles,
         fetchingGuestPuzzles,
         deletedUserPuzzle,
         deletedSavedPuzzle,
         createdPuzzle,
         setPrint,
         savedPuzzle }
