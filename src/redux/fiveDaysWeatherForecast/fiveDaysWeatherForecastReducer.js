import {
  FETCH_FIVE_DAYS_WEATHER_FORECAST_REQUEST,
  FETCH_FIVE_DAYS_WEATHER_FORECAST_SUCCESS,
  FETCH_FIVE_DAYS_WEATHER_FORECAST_FAILURE
} from './fiveDaysWeatherForecastTypes'

const initialState = {
  loading: false,
  fiveDaysWeatherForecast: [],
  error: ''
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FIVE_DAYS_WEATHER_FORECAST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_FIVE_DAYS_WEATHER_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        fiveDaysWeatherForecast: action.payload,
        error: ''
      }
    case FETCH_FIVE_DAYS_WEATHER_FORECAST_FAILURE:
      return {
        ...state,
        loading: false,
        fiveDaysWeatherForecast: [],
        error: action.payload
      }


    default: return state
  }
}

export default reducer