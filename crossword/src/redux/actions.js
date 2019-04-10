
const URL = `http://localhost:3000`

                         // DISPLAY PUZZLES //

// Fetch puzzles and solves when app mounts
function fetchedPuzzles(puzzles) {
  return { type: "FETCHED_PUZZLES", puzzles}
}

function fetchingPuzzles() {
  return (dispatch) => {
    fetch(`${URL}/puzzles/user/1`)
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

                         // CREATE PUZZLE //

// Allow user to progress through create form
function setFormStage(stage) {
 return { type: "SET_FORM_STAGE", stage}
}

// First step: set puzzle size
function setNewPuzzleSize(num) {
 return { type: "SET_NEW_PUZZLE_SIZE", num}
}

// Update "newPuzzle" in state as user progresses through create form
function updatedPuzzle(puzzle) {
  return { type: "UPDATED_PUZZLE", puzzle}
}

function postingPuzzle() {
  return (dispatch, getState) => {
    const { newPuzzle } = getState()

    fetch(`${URL}/puzzles/create/${newPuzzle.size}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(puzzle => {
      dispatch(updatedPuzzle(puzzle))
    })
  }
}

// these can be combined
function updatingPuzzle(str) {
  return (dispatch, getState) => {
    const { newPuzzle } = getState()
    console.log(newPuzzle)

    fetch(`${URL}/puzzles/${str}/${newPuzzle.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ puzzle: newPuzzle })
    })
    .then(res => res.json())
    .then(puzzle => {
      console.log(puzzle)
      dispatch(updatedPuzzle(puzzle))
      if (str === "enter") {
        dispatch(clearNewPuzzle())
      }
    })
  }
}

// Step 2: shade in squares
function toggleShade(cellID) {
  return (dispatch, getState) => {
    const { newPuzzle } = getState()
    let cell = newPuzzle.cells.find(c => c.id === cellID)
    let toggledCell = {...cell, shaded: !cell.shaded}
    let newCells = newPuzzle.cells.map(c => {
      return c.id === cellID ? toggledCell : c
    })
    dispatch({
      type: "TOGGLE_SHADE",
      cells: newCells
    })
  }
}

// Step 3: enter letters and clues
function setLetters() {
  return (dispatch, getState) => {
    const { newPuzzle, enteredLetters } = getState()
    let cells = []
    for (let key in enteredLetters) {
      let cell = newPuzzle.cells.find(c => c.id === parseInt(key))
      let letteredCell = {...cell, letter: enteredLetters[key]}
      cells.push(letteredCell)
    }
    let newCells = newPuzzle.cells.map(c => {
      let updated = cells.find(cell => cell.id === c.id)
      return updated ? updated : c
    })
    dispatch ({ type: "SET_LETTERS", newCells })
  }
}

//clean this up later please
function updateAcrossClue(clueID, content) {
  return (dispatch, getState) => {
    const { newPuzzle } = getState()
    let clue = newPuzzle.across_clues.find(c => c.id === clueID)
    let newClue = {...clue, content: content}
    let clues = newPuzzle.across_clues.map(c => {
      return c.id === clueID ? newClue : c
    })
    dispatch ({ type: "UPDATE_ACROSS_CLUE", clues })
  }
}

function updateDownClue(clueID, content) {
  return (dispatch, getState) => {
    const { newPuzzle } = getState()
    let clue = newPuzzle.down_clues.find(c => c.id === clueID)
    let newClue = {...clue, content: content}
    let clues = newPuzzle.down_clues.map(c => {
      return c.id === clueID ? newClue : c
    })
    dispatch ({ type: "UPDATE_DOWN_CLUE", clues })
  }
}

function updateTitle(content) {
  return { type: "UPDATE_TITLE", content }
}

// Step 4: submit and clear newPuzzle in state
function clearNewPuzzle() {
  return { type: "CLEAR_PUZZLE" }
}


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


                         // EDIT/TYPE IN PUZZLE //

// select and deselect active cell
function selectCell(cell, fellows) {
  return (dispatch, getState) => {
    const { direction } = getState()
    dispatch({
      type: "SELECT_CELL",
      direction: direction,
      cell: cell,
      fellows: fellows
    })
  }
}

function deselectCell() {
  return { type: "DESELECT_CELL" }
}

// change direction on second click
function toggleDirection(fellows) {
  return (dispatch, getState) => {
    const { direction, selectedCell } = getState()
    dispatch({
      type: "TOGGLE_DIRECTION",
      direction: direction,
      selectedCell: selectedCell,
      fellows: fellows
    })
  }
}

// set pressed key -- I think these can be combined
function setKey(cellID, pressedKey) {
  return { type: "SET_KEY", cellID, pressedKey}
}

function settingKey(cellID, pressedKey) {
  return (dispatch) => {
    dispatch(setKey(cellID, pressedKey))
  }
}

// remove all "entered letters" when puzzle is done
function resetAllLetters() {
  return { type: "RESET_ALL_LETTERS" }
}

// switch game status between "in progress" and "won"
function toggleGameStatus() {
  return (dispatch, getState) => {
    const { gameStatus } = getState()
    dispatch({
      type: "TOGGLE_GAME_STATUS",
      gameStatus: gameStatus
    })
  }
}


export { fetchingPuzzles,
         URL,
         selectCell,
         deselectCell,
         toggleDirection,
         settingKey,
         resetAllLetters,
         toggleGameStatus,
         setNewPuzzleSize,
         toggleShade,
         postingPuzzle,
         updatingPuzzle,
         updateAcrossClue,
         updateDownClue,
         updateTitle,
         clearNewPuzzle,
         setLetters,
         deletedPuzzle,
         createdPuzzle,
         solvingPuzzle,
         setFormStage }
