import react from 'react';

import { connect } from 'react-redux'
import { addFavorite, removeFavorite, chooseCityToFetchWeatherFrom, fetchCurrentWeather, fetchFiveDaysWeather } from '../redux'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse';

import DayForecast from './DayForecast';


function CurrentMainCity({ fetchCurrentWeather, fetchFiveDaysWeather, currentWeather, fiveDaysWeatherForecast, autocomplete, chooseCityToFetchWeatherFrom, city, favorites, addFavorite, removeFavorite }) {

  const [favoriteItem, setFavoriteItem] = react.useState('add')
  const [timeArray, setTimeArray] = react.useState([])
  const [cityName, setCityName] = react.useState([])
  const [error, setError] = react.useState(false)
  const [open, setOpen] = react.useState(true)

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

    if (currentWeather.error || fiveDaysWeatherForecast.error || autocomplete.error) {
      setError(true)
      setOpen(true)
    }

  }, [currentWeather, fiveDaysWeatherForecast, autocomplete])


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

    {
      error === false ? null : <>
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              error fetching data !
            </Alert>
          </Collapse>
        </Box>
      </>
    }

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
          <br />
          <Typography gutterBottom variant="h5" component="div" align="center" sx={{ mb: 8 }}>
            Weather is {currentWeather.currentWeather.WeatherText}
          </Typography>

        </>
      }

      {
        !fiveDaysWeatherForecast ? null : <>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
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
    favorites: state.favorites,
    autocomplete: state.autocomplete
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