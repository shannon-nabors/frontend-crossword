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

export { solvedPuzzle,
         solvingPuzzle }
