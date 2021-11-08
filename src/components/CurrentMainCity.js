import react from 'react';
import { connect } from 'react-redux'
import { addFavorite, removeFavorite, chooseCityToFetchWeatherFrom, fetchCurrentWeather, fetchFiveDaysWeather } from '../redux'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import DayForecast from './DayForecast';


function CurrentMainCity({ fetchCurrentWeather, fetchFiveDaysWeather, currentWeather, fiveDaysWeatherForecast, chooseCityToFetchWeatherFrom, city, favorites, addFavorite, removeFavorite }) {

  const [favoriteItem, setFavoriteItem] = react.useState('add')
  // const [mainCity, setMainCity] = react.useState({ name: 'Tel Aviv' })


  react.useEffect(() => {

    // console.log('currentWeather', currentWeather)
    if (!city) chooseCityToFetchWeatherFrom({ name: 'Tel Aviv', locationKey: 215854 })
  }, [])

  react.useEffect(() => {

    setFavoriteItem('add')
    if (city && favorites.favorites.length > 0) checkFavorite()

    if (city) getCityInfo(city)

  }, [favorites, city])


  const getCityInfo = (c) => {

    const { locationKey } = c
    // console.log(locationKey)

    fetchCurrentWeather(locationKey)
    fetchFiveDaysWeather(locationKey)
  }

  const checkFavorite = () => {
    const favorite = favorites.favorites.find(x => x.locationKey === city.locationKey)
    // console.log('favorite', favorite)
    if (favorite) setFavoriteItem('remove')
  }

  const favoritesAction = () => {

    if (favoriteItem === 'add') addFavorite(city)
    else { removeFavorite(city.locationKey) }
  }


  return <>

    <Box
      sx={{
        width: 1000,
        height: 1000,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >

      {
        !currentWeather.currentWeather.Temperature ? null : <>
          <div>
            <div>
              <h1>{city.name}</h1>
              <span>{'temp ' + currentWeather.currentWeather.Temperature.Imperial.Value + 'F'}</span>
              <br />
              <span>date&time: {currentWeather.currentWeather.LocalObservationDateTime} </span>
            </div>

            <Button variant="contained" onClick={favoritesAction}> {favoriteItem} favorite </Button>

            <h2>{currentWeather.currentWeather.WeatherText}</h2>
          </div>
        </>
      }


      {
        !fiveDaysWeatherForecast ? null : <>
          <Stack direction="row" spacing={2}>
            {
              fiveDaysWeatherForecast.fiveDaysWeatherForecast.map((day, i) => {
                return <DayForecast key={i} day={day} />
              })
            }
          </Stack>
        </>
      }
    </Box>

  </>
}


const mapStateToProps = state => {
  return {
    currentWeather: state.currentWeather,
    fiveDaysWeatherForecast: state.fiveDaysWeatherForecast,
    city: state.autocomplete.city,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavorite: (newFavorite) => dispatch(addFavorite(newFavorite)),
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city)),
    fetchCurrentWeather: (val) => dispatch(fetchCurrentWeather(val)),
    fetchFiveDaysWeather: (val) => dispatch(fetchFiveDaysWeather(val))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMainCity)