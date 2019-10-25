import { URL } from '../constants'
import { loading } from './changePuzzles'

                         // CREATE PUZZLE //

// Allow user to progress through create form
function setFormStage(stage) {
 return { type: "SET_FORM_STAGE", stage}
}

// First step: set puzzle size
function setNewPuzzleSize(num) {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    dispatch({ type: "SET_NEW_PUZZLE_SIZE", num, currentUser })
  }
}

// Update "newPuzzle" in state as user progresses through create form
function updatedPuzzle(puzzle) {
  return { type: "UPDATED_PUZZLE", puzzle}
}

function postingPuzzle() {
  return (dispatch, getState) => {
    const { newPuzzle } = getState()
    dispatch(loading())
    fetch(`${URL}/puzzles/create/${newPuzzle.size}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ newPuzzle })
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
    dispatch(loading())
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
      dispatch(updatedPuzzle(puzzle))
    })
  }
}

// Step 2: shade in squares, enter letters
function toggleInteractionType(interactionType) {
  return {type: "TOGGLE_INTERACTION_TYPE",
          interactionType: interactionType}
}

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

export { setFormStage,
         setNewPuzzleSize,
         updatedPuzzle,
         postingPuzzle,
         updatingPuzzle,
         toggleInteractionType,
         toggleShade,
         setLetters,
         updateAcrossClue,
         updateDownClue,
         updateTitle,
         clearNewPuzzle }
