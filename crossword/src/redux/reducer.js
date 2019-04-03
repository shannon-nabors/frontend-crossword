import { combineReducers } from 'redux'

const puzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles
    default:
      return state
  }
}

const selectCellReducer = (state = null, action) => {
  switch (action.type) {
    case "SELECT_CELL":
      return action.cellID
    default:
      return state
  }
}

//

const rootReducer = combineReducers({
  puzzles: puzzlesReducer,
  selectedCell: selectCellReducer
})

export default rootReducer
