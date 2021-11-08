import axios from 'axios'

import {
  FETCH_CURRENT_WEATHER_REQUEST,
  FETCH_CURRENT_WEATHER_SUCCESS,
  FETCH_CURRENT_WEATHER_FAILURE
  } from './currentWeatherTypes'

import { getCurrentWeather, apiKey } from '../fixtures/Apis' // +{locationKey} + {apiKey}


export const fetchCurrentWeather = (val) => {

  return async (dispatch) => {

    try {
      dispatch(fetchCurrentWeatherRequest())

      const response = await axios.get(getCurrentWeather + val + apiKey, {method: 'HEAD', mode: 'no-cors'})
      
      const currentWeather = response.data
      if(!currentWeather) dispatch(fetchCurrentWeatherFailure('data not retreived'))
      else dispatch(fetchCurrentWeatherSuccess(currentWeather[0]))
    }
    catch (error) {

      dispatch(fetchCurrentWeatherFailure(error.message))
    }
  }
}

export const fetchCurrentWeatherRequest = () => {
  return {
    type: FETCH_CURRENT_WEATHER_REQUEST
  }
}

export const fetchCurrentWeatherSuccess = (currentWeather) => {
  return {
    type: FETCH_CURRENT_WEATHER_SUCCESS,
    payload: currentWeather
  }
}

export const fetchCurrentWeatherFailure = (error) => {
  return {
    type: FETCH_CURRENT_WEATHER_FAILURE,
    payload: error
  }
}