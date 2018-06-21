import { combineReducers } from 'redux'

const game = (state = {}, { type, ...rest }) => {
  switch (type) {
    case 'INIT_BOOK':
      return ({
        ...state,
        book: {
          ...rest,
        },
      })
    case 'GAME_STATE':
      return ({
        ...state,
        ...rest,
      })
    default:
      return state
  }
}

export default combineReducers({
  game,
})
