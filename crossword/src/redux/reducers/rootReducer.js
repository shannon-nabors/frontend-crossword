import { combineReducers } from 'redux'
import { loadingReducer,
         solvedPuzzlesReducer,
         unsolvedPuzzlesReducer,
         userPuzzlesReducer } from './changePuzzles'
import { formStageReducer,
         newPuzzleReducer } from './createPuzzle'
import { selectCellReducer,
         directionReducer,
         highlightCellReducer,
         keyReducer } from './puzzleInteraction'
import { gameStatusReducer,
         pausedReducer } from './solvePuzzle'
import { currentUserReducer,
         loggedInReducer } from './manageUsers'



const rootReducer = combineReducers({
  solvedPuzzles: solvedPuzzlesReducer,
  unsolvedPuzzles: unsolvedPuzzlesReducer,
  userPuzzles: userPuzzlesReducer,
  selectedCell: selectCellReducer,
  direction: directionReducer,
  highlightedCells: highlightCellReducer,
  enteredLetters: keyReducer,
  gameStatus: gameStatusReducer,
  formStage: formStageReducer,
  newPuzzle: newPuzzleReducer,
  currentUser: currentUserReducer,
  loggedIn: loggedInReducer,
  loading: loadingReducer,
  paused: pausedReducer
})



export default rootReducer
