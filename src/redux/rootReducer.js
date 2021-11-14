
import { combineReducers } from 'redux'
import autocompleteReducer from './autocomplete/autocompleteReducer'
import currentWeatherReducer from './currentWeather/currentWeatherReducer'
import fiveDaysWeatherForecastReducer from './fiveDaysWeatherForecast/fiveDaysWeatherForecastReducer'
import favoritesReducer from './favorites/favoritesReducer'
import setupReducer from './setup/setupReducer'


const rootReducer = combineReducers({
  autocomplete: autocompleteReducer,
  currentWeather: currentWeatherReducer,
  fiveDaysWeatherForecast: fiveDaysWeatherForecastReducer,
  favorites: favoritesReducer,
  setup : setupReducer
})


export default rootReducer