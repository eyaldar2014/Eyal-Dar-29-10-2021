import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVOTIRE_WEATHER_REQUEST,
  FETCH_FAVOTIRE_WEATHER_SUCCESS,
  FETCH_FAVOTIRE_WEATHER_FAILURE,
} from './favoritesTypes'

const initialState = {
  loading: false,
  favorites: [],
  error: ''
}


const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVOTIRE_WEATHER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_FAVOTIRE_WEATHER_SUCCESS: return {
      ...state,
      loading: false,
      favorites: state.favorites.map(fav => {
        if (fav.locationKey === action.payload.locationKey) {
          fav.weather = action.payload.weather
          return fav
        }
        else return fav
      }),
    }
    case FETCH_FAVOTIRE_WEATHER_FAILURE: return {
      ...state,
      loading: false,
      favorites: state.favorites.map(fav => {
        if (fav.locationKey === action.payload.locationKey) {
          fav.weather = null
          return fav
        }
        else return fav
      }),
      error: action.payload.error
    }
    case ADD_FAVORITE: return {
      ...state,
      favorites: [...state.favorites, action.payload]
    }
    case REMOVE_FAVORITE: return {
      ...state,
      favorites: state.favorites.filter(favorites => favorites.locationKey !== action.payload),
    }
    default: return state
  }
}

export default favoritesReducer