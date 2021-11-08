import react from 'react';

import { connect } from 'react-redux'
import { addFavorite, removeFavorite, chooseCityToFetchWeatherFrom, fetchCurrentWeather, fetchFiveDaysWeather } from '../redux'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import DayForecast from './DayForecast';





// import * as telAvivWeather5Days from '../fixturesDev/telAvivWeather5Days.json';
// import * as telAvivWeatherCurrent from '../fixturesDev/telAvivWeatherCurrent.json'
// import { } from '../fixturesDev/responseTel.json'

// const dailyForecasts = telAvivWeather5Days.data.DailyForecasts;
// const currentWeatherTemp = telAvivWeatherCurrent[0].Temperature.Imperial.Value
// const currentWeatherTime = telAvivWeatherCurrent[0].LocalObservationDateTime
// const timeArray = currentWeatherTime.split(/[T+]+/)
// const currentWeatherText = telAvivWeatherCurrent[0].WeatherText
// const name = 'Tel Aviv !'




function CurrentMainCity({ fetchCurrentWeather, fetchFiveDaysWeather, currentWeather, fiveDaysWeatherForecast, chooseCityToFetchWeatherFrom, city, favorites, addFavorite, removeFavorite }) {

  const [favoriteItem, setFavoriteItem] = react.useState('add')
  const [timeArray, setTimeArray] = react.useState([])
  const [cityName, setCityName] = react.useState([])

  react.useEffect(() => {

    if (!city) chooseCityToFetchWeatherFrom({ name: 'Tel Aviv, Israel', locationKey: 215854 })
  }, [])

  react.useEffect(() => {

    setFavoriteItem('add')
    if (city && favorites.favorites.length > 0) checkFavorite()

    if (city) getCityInfo(city)
  }, [favorites, city])

  react.useEffect(() => {

    if (currentWeather.currentWeather.LocalObservationDateTime) setTimeArray(currentWeather.currentWeather.LocalObservationDateTime.split(/[T+]+/))
  }, [currentWeather])


  const getCityInfo = (c) => {
    setCityName(c.name.split(','))

    const { locationKey } = c

    fetchCurrentWeather(locationKey)
    fetchFiveDaysWeather(locationKey)
  }

  const checkFavorite = () => {
    const favorite = favorites.favorites.find(x => x.locationKey === city.locationKey)
    if (favorite) setFavoriteItem('remove')
  }

  const favoritesAction = () => {

    if (favoriteItem === 'add') addFavorite(city)
    else { removeFavorite(city.locationKey) }
  }


  return <>

    <Box
      sx={{
        m: 4,
        mt: 0,
        p: 4,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.9, 0.9]
        },
      }}
    >

      {
        !currentWeather.currentWeather.Temperature ? null : <>
          <Stack direction="row" sx={{ m: 1 }} justifyContent="space-between" >

            <Typography gutterBottom variant="h4" component="div">
              {cityName[0]}
            </Typography>

            {
              favoriteItem === 'add' ? <>
                <IconButton
                  size="large"
                  color="default"
                  aria-label="menu"
                  onClick={favoritesAction}
                  variant="contained"
                >
                  <FavoriteBorderIcon fontSize="large" />
                </IconButton>
              </> : <>
                <IconButton
                  size="large"
                  color="default"
                  aria-label="menu"
                  onClick={favoritesAction}
                  variant="contained"
                  style={{ color: 'red' }}
                >
                  <FavoriteIcon fontSize="large" />
                </IconButton>
              </>
            }
          </Stack>

          <Typography variant="h6" color="text.secondary">
            {'Current Temperarue is ' + currentWeather.currentWeather.Temperature.Imperial.Value + ' FFF'}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {timeArray[1]}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {timeArray[0]}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" align="center" sx={{ mb: 8 }}>
            Weather is {currentWeather.currentWeather.WeatherText}
          </Typography>

        </>
      }

      {
        !fiveDaysWeatherForecast ? null : <>
          <Stack direction="row" spacing={2} justifyContent="space-around" >
            {
              fiveDaysWeatherForecast.fiveDaysWeatherForecast.map((day, i) => {
                return <DayForecast key={i} day={day} />
              })
            }
          </Stack>
        </>
      }

    </Box>


    {/* <Box
      sx={{
        m: 4,
        mt: 0,
        p: 4,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.9, 0.9]
        },
      }}
    >

      {
        !currentWeatherTemp ? null : <>
          <Stack direction="row" sx={{ m: 1 }} justifyContent="space-between" >

            <Typography gutterBottom variant="h4" component="div">
              {name}
            </Typography>

            {
              favoriteItem === 'add' ? <>
                <IconButton
                  size="large"
                  color="default"
                  aria-label="menu"
                  onClick={favoritesAction}
                  variant="contained"
                >
                  <FavoriteBorderIcon fontSize="large" />
                </IconButton>
              </> : <>
                <IconButton
                  size="large"
                  color="default"
                  aria-label="menu"
                  onClick={favoritesAction}
                  variant="contained"
                  style={{ color: 'red' }}
                >
                  <FavoriteIcon fontSize="large" />
                </IconButton>
              </>
            }
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {'Temperarue is currently ' + currentWeatherTemp + ' FFF degrees'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeArray[1]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeArray[0]}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" align="center" sx={{ mb: 8 }}>
            Weather is {currentWeatherText}
          </Typography>

        </>
      }


      {
        !dailyForecasts ? null : <>
          <Stack direction="row" spacing={2} justifyContent="space-around" >
            {
              dailyForecasts.map((day, i) => {
                return <DayForecast key={i} day={day} />
              })
            }
          </Stack>
        </>
      }
    </Box> */}







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