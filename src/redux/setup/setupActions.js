import {
  CHANGE_DEGREES_TO_CELSIUS,
  CHANGE_DEGREES_TO_FAHRENHEIT,
  CHANGE_THEME_TO_LIGHT,
  CHANGE_THEME_TO_DARK
} from './setupTypes'

export const changeDegreesToCelsius = () => {
  return {
    type: CHANGE_DEGREES_TO_CELSIUS,
    payload: { type: 'c', symbol: '°C' }
  }
}

export const changeDegreesToFahrenheit = () => {
  return {
    type: CHANGE_DEGREES_TO_FAHRENHEIT,
    payload: { type: 'f', symbol: '°F' }
  }
}

export const changeThemeToLight = () => {
  return {
    type: CHANGE_THEME_TO_LIGHT,
    payload: { type: 'light', backgroundColor: 'white', textColor: 'black', blue: '#2b88d8' }
  }
}

export const changeThemeToDark = () => {
  return {
    type: CHANGE_THEME_TO_DARK,
    payload: { type: 'dark', backgroundColor: '#808080', textColor: 'white', blue: '#004578' }
  }
}