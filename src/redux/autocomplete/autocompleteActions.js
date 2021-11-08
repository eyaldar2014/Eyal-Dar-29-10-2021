import axios from 'axios'

import {
  CHOOSE_CITY_TO_FETCH_WEATHER_FROM,
  FETCH_AUTOCOMPLETE_LOCATIONS_REQUEST,
  FETCH_AUTOCOMPLETE_LOCATIONS_SUCCESS,
  FETCH_AUTOCOMPLETE_LOCATIONS_FAILURE
} from './autocompleteTypes'

import { autocompleteSearchApi } from '../fixtures/Apis'

export const chooseCityToFetchWeatherFrom = (city) =>{
  return{
    type: CHOOSE_CITY_TO_FETCH_WEATHER_FROM,
    payload: city
  }
}

export const fetcAutocompleteLocations = (val) => {
  // console.log('val', val)
  
  return async (dispatch) => {

    try {
      dispatch(fetchAutocompleteLocationsRequest())
      const response = await axios.get(autocompleteSearchApi + val, {method: 'HEAD', mode: 'no-cors'})
      
      // console.log(response)
      const locations = response.data
      if(!locations) dispatch(fetchAutocompleteLocationsFailure('data not retreived'))
      else dispatch(fetchAutocompleteLocationsSuccess(locations))
    }
    catch (error) {
      // error.message is the error message
      console.log('error', error)
      dispatch(fetchAutocompleteLocationsFailure(error.message))
    }
  }
}

export const fetchAutocompleteLocationsRequest = () => {
  return {
    type: FETCH_AUTOCOMPLETE_LOCATIONS_REQUEST
  }
}

export const fetchAutocompleteLocationsSuccess = (locations) => {
  return {
    type: FETCH_AUTOCOMPLETE_LOCATIONS_SUCCESS,
    payload: locations
  }
}

export const fetchAutocompleteLocationsFailure = (error) => {
  return {
    type: FETCH_AUTOCOMPLETE_LOCATIONS_FAILURE,
    payload: error
  }
}