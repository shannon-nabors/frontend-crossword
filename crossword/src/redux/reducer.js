import { combineReducers } from 'redux'

const puzzlesReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PUZZLES":
      return action.puzzles
    default:
      return state
  }
}


const rootReducer = combineReducers({
  puzzles: puzzlesReducer
})

export default rootReducer
