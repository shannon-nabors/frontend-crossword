import { URL } from '../constants'

                         // SOLVE PUZZLE //

function solvedPuzzle(solve) {
  return (dispatch, getState) => {
    const { unsolvedPuzzles, solvedPuzzles } = getState()
    let puzzle = unsolvedPuzzles.find(puz => puz.id === solve.puzzle_id)
    let unsolved = unsolvedPuzzles.filter(puz => puz.id !== solve.puzzle_id)
    let solved = [...solvedPuzzles, puzzle]
    dispatch ({ type: "SOLVED_PUZZLE", unsolved, solved})
  }
}

function solvingPuzzle(userID, puzzleID) {
  return (dispatch) => {
    fetch(`${URL}/solves`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        solver_id: userID,
        puzzle_id: puzzleID
      })
    })
    .then(res => res.json())
    .then(solve => {
      console.log(solve)
     dispatch(solvedPuzzle(solve))
    })
  }
}

function changeGameStatus(status) {
  return { type: "CHANGE_GAME_STATUS", gameStatus: status}
}

function handleTimer() {
  return (dispatch, getState) => {
    const { paused } = getState()
    if (paused) {
      dispatch({ type: "HANDLE_TIMER", status: false})
    } else {
      dispatch({ type: "HANDLE_TIMER", status: true})
    }
  }
}

export { solvedPuzzle,
         solvingPuzzle,
         changeGameStatus,
         handleTimer }
