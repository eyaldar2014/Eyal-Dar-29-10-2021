import {
  CHANGE_DEGREES_TO_CELSIUS,
  CHANGE_DEGREES_TO_FAHRENHEIT,
  CHANGE_THEME_TO_LIGHT,
  CHANGE_THEME_TO_DARK
} from './setupTypes'

const initialState = {
  degrees: { type: 'f', symbol: '°F' },
  theme: { type: 'light', backgroundColor: 'white', textColor: 'black', blue: '#2b88d8' }
}


const setupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DEGREES_TO_CELSIUS:
      return {
        ...state,
        degrees: action.payload
      }
    case CHANGE_DEGREES_TO_FAHRENHEIT:
      return {
        ...state,
        degrees: action.payload
      }
    case CHANGE_THEME_TO_LIGHT:
      return {
        ...state,
        theme: action.payload
      }
    case CHANGE_THEME_TO_DARK:
      return {
        ...state,
        theme: action.payload
      }

    default: return state
  }
}

export default setupReducer