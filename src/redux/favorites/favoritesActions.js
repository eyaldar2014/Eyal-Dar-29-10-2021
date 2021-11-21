import axios from 'axios'

import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_FAVOTIRE_WEATHER_REQUEST,
  FETCH_FAVOTIRE_WEATHER_SUCCESS,
  FETCH_FAVOTIRE_WEATHER_FAILURE
} from './favoritesTypes'

import { getCurrentWeather, apiKey } from '../fixtures/Apis'


export const fetchFavoritetWeather = (val) => {

  return async (dispatch) => {

    try {
      dispatch(fetchFavoriteWeatherRequest())

      const response = await axios.get(getCurrentWeather + val + apiKey, {method: 'HEAD', mode: 'no-cors'})

      const currentWeather = response.data
      if (!currentWeather) return dispatch(fetchFavoriteWeatherFailure('data not retreived', val))

      let temp = {}
      temp.f = currentWeather[0].Temperature.Imperial.Value
      temp.c = Math.floor((currentWeather[0].Temperature.Imperial.Value - 32) / 1.8) 
      
      return dispatch(fetchFavoriteWeatherSuccess(val, temp))
    }
    catch (error) {
      return dispatch(fetchFavoriteWeatherFailure(error.message, val))
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
      weather: currentWeather,
      locationKey: val
    }
  }
}

export const fetchFavoriteWeatherFailure = (error, val) => {
  return {
    type: FETCH_FAVOTIRE_WEATHER_FAILURE,
    payload: {
      locationKey: val,
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
