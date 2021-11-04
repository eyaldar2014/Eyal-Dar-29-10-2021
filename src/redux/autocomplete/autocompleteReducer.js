
import {
  CHOOSE_CITY_TO_FETCH_WEATHER_FROM,
  FETCH_AUTOCOMPLETE_LOCATIONS_REQUEST,
  FETCH_AUTOCOMPLETE_LOCATIONS_SUCCESS,
  FETCH_AUTOCOMPLETE_LOCATIONS_FAILURE
} from './autocompleteTypes'

const initialState = {
  city: '',
  loading: false,
  locations: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHOOSE_CITY_TO_FETCH_WEATHER_FROM:
      return {
        ...state,
        city: action.payload
      }
    case FETCH_AUTOCOMPLETE_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_AUTOCOMPLETE_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
        error: ''
      }
    case FETCH_AUTOCOMPLETE_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        locations: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer