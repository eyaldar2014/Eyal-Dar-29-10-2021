import axios from 'axios'

import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,

  FETCH_FAVOTIRE_WEATHER_REQUEST,
  FETCH_FAVOTIRE_WEATHER_SUCCESS,
  FETCH_FAVOTIRE_WEATHER_FAILURE
} from './favoritesTypes'

import { getCurrentWeather, apiKey } from '../fixtures/Apis' // +{locationKey} + {apiKey}


export const fetchFavoritetWeather = (val) => {

  return async (dispatch) => {

    try {
      dispatch(fetchFavoriteWeatherRequest())

      // console.log(getCurrentWeather + val + apiKey)
      const response = await axios.get(getCurrentWeather + val + apiKey)

      console.log(response)
      const currentWeather = response.data
      const error = 'data not retreived'
      if (!currentWeather) dispatch(fetchFavoriteWeatherFailure(error, val))
      else dispatch(fetchFavoriteWeatherSuccess(val, currentWeather[0]))
    }
    catch (error) {
      // error.message is the error message
      console.log('error', error)
      dispatch(fetchFavoriteWeatherFailure(error.message, val))
    }
  }
}

export const fetchFavoriteWeatherRequest = () => {
  return {
    type: FETCH_FAVOTIRE_WEATHER_REQUEST
  }
}

export const fetchFavoriteWeatherSuccess = (val, currentWeather) => {
  return {
    type: FETCH_FAVOTIRE_WEATHER_SUCCESS,
    payload: {
      weather : currentWeather.Temperature.Imperial.Value,
      locationKey : val
    }
  }
}

export const fetchFavoriteWeatherFailure = (error, val) => {
  return {
    type: FETCH_FAVOTIRE_WEATHER_FAILURE,
    payload: {
      locationKey : val,
      error
    }
  }
}










export const addFavorite = (newFavorite) => {
  return {
    type: ADD_FAVORITE,
    payload: newFavorite
  }
}

export const removeFavorite = (locationKey) => {
  return {
    type: REMOVE_FAVORITE,
    payload: locationKey
  }
}
