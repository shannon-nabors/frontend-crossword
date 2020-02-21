import { combineReducers } from 'redux'
import { loadingReducer,
         solvedPuzzlesReducer,
         unsolvedPuzzlesReducer,
         userPuzzlesReducer, 
         printImageReducer,
         savedPuzzlesReducer} from './changePuzzles'
import { formStageReducer,
         newPuzzleReducer,
         interactionTypeReducer } from './createPuzzle'
import { selectCellReducer,
         selectClueReducer,
         directionReducer,
         highlightCellReducer,
         keyReducer } from './puzzleInteraction'
import { gameStatusReducer,
         pausedReducer } from './solvePuzzle'
import { currentUserReducer,
         loggedInReducer } from './manageUsers'
import { solvesReducer,
         puzzleSolvesReducer,
         userFavoritesReducer,
         puzzleFavoritesReducer } from './stats'



const rootReducer = combineReducers({
  solvedPuzzles: solvedPuzzlesReducer,
  unsolvedPuzzles: unsolvedPuzzlesReducer,
  userPuzzles: userPuzzlesReducer,
  savedPuzzles: savedPuzzlesReducer,
  selectedCell: selectCellReducer,
  selectedClue: selectClueReducer,
  direction: directionReducer,
  highlightedCells: highlightCellReducer,
  enteredLetters: keyReducer,
  gameStatus: gameStatusReducer,
  formStage: formStageReducer,
  interactionType: interactionTypeReducer,
  newPuzzle: newPuzzleReducer,
  currentUser: currentUserReducer,
  loggedIn: loggedInReducer,
  loading: loadingReducer,
  paused: pausedReducer,
  solves: solvesReducer,
  puzzleSolves: puzzleSolvesReducer,
  userFavorites: userFavoritesReducer,
  puzzleFavorites: puzzleFavoritesReducer,
  printImage: printImageReducer
})



export default rootReducer
