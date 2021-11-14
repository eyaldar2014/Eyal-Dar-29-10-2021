import axios from 'axios'

import {
  FETCH_FIVE_DAYS_WEATHER_FORECAST_REQUEST,
  FETCH_FIVE_DAYS_WEATHER_FORECAST_SUCCESS,
  FETCH_FIVE_DAYS_WEATHER_FORECAST_FAILURE
} from './fiveDaysWeatherForecastTypes'

import { getFiveDaysWeatherForecast, apiKey } from '../fixtures/Apis' // +{locationKey} + {apiKey}


export const fetchFiveDaysWeather = (val) => {

  return async (dispatch) => {

    try {
      dispatch(fetchFiveDaysWeatherRequest())

      const response = await axios.get(getFiveDaysWeatherForecast + val + apiKey, { method: 'HEAD', mode: 'no-cors' })

      const fiveDaysWeatherForecastData = response.data.DailyForecasts
      if (!fiveDaysWeatherForecastData) return dispatch(fetchFiveDaysWeatherFailure('data not retreived'))

      let fiveDaysWeatherForecast = fiveDaysWeatherForecastData.map(day => {
        let temp = {}
        temp.f = {}
        temp.f.min = day.Temperature.Minimum.Value
        temp.f.max = day.Temperature.Maximum.Value
        temp.c = {}
        temp.c.min = Math.floor((day.Temperature.Minimum.Value - 32) / 1.8)
        temp.c.max = Math.floor((day.Temperature.Maximum.Value - 32) / 1.8) 
        temp.date = day.Date
        temp.day = day.Day.IconPhrase
        temp.night = day.Night.IconPhrase

        return temp
      })
      return dispatch(fetchFiveDaysWeatherSuccess(fiveDaysWeatherForecast))
    }
    catch (error) {
      return dispatch(fetchFiveDaysWeatherFailure(error.message))
    }
  }
}

export const fetchFiveDaysWeatherRequest = () => {
  return {
    type: FETCH_FIVE_DAYS_WEATHER_FORECAST_REQUEST
  }
}

export const fetchFiveDaysWeatherSuccess = (fiveDaysWeatherForecast) => {
  return {
    type: FETCH_FIVE_DAYS_WEATHER_FORECAST_SUCCESS,
    payload: fiveDaysWeatherForecast
  }
}

export const fetchFiveDaysWeatherFailure = (error) => {
  return {
    type: FETCH_FIVE_DAYS_WEATHER_FORECAST_FAILURE,
    payload: error
  }
}