import { ADD_FAVORITE, REMOVE_FAVORITE } from './favoritesTypes'


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