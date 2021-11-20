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

import CarouselContainer from './CarouselContainer';


function CurrentMainCity({ fetchCurrentWeather, fetchFiveDaysWeather, currentWeather, fiveDaysWeatherForecast, autocomplete, chooseCityToFetchWeatherFrom, city, favorites, addFavorite, removeFavorite, setup }) {

  const [favoriteItem, setFavoriteItem] = react.useState('add')

  // const [timeArray, setTimeArray] = react.useState([])
  // const [cityName, setCityName] = react.useState([])

  const [error, setError] = react.useState(false)
  const [open, setOpen] = react.useState(true)

  react.useEffect(() => {

    if (!city) chooseCityToFetchWeatherFrom({ name: 'Tel Aviv, Israel', locationKey: 215854 })
  }, [])

  react.useEffect(() => {

    // if (favoriteItem !== 'add') setFavoriteItem('add')
    if (city && favorites.favorites.length > 0) checkFavorite()
    else if (favoriteItem !== 'add') setFavoriteItem('add')

    if (city) getCityInfo(city)
  }, [city])

  react.useEffect(() => {

    // if (currentWeather.currentWeather.LocalObservationDateTime) setTimeArray(currentWeather.currentWeather.LocalObservationDateTime.split(/[T+]+/))

    if (currentWeather.error || fiveDaysWeatherForecast.error || autocomplete.error) {
      setError(true)
      setOpen(true)
    }

    // if (favoriteItem !== 'add') setFavoriteItem('add')
    if (city && favorites.favorites.length > 0) checkFavorite()
    else if (favoriteItem !== 'add') setFavoriteItem('add')

  }, [currentWeather, fiveDaysWeatherForecast, autocomplete, favorites])


  const getCityInfo = (c) => {
    // setCityName(c.name.split(','))

    const { locationKey } = c

    fetchCurrentWeather(locationKey)
    fetchFiveDaysWeather(locationKey)
  }

  const checkFavorite = () => {
    const favorite = favorites.favorites.find(x => x.locationKey === city.locationKey)

    if (favorite) setFavoriteItem('remove')
    else if (favoriteItem !== 'add') setFavoriteItem('add')
  }

  const favoritesAction = () => {

    if (favoriteItem === 'add') addFavorite(city)
    else { removeFavorite(city.locationKey) }
  }


  return <>

    {
      error === false ? null : <>
        <Box sx={{ width: '100%' }} >
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
        m: 1,
        mt: 0,
        p: 3,
        backgroundColor: setup.theme.blue
      }}
    >

      {
        !currentWeather.currentWeather.weatherText ? null : <>
          <Stack direction="row" sx={{ m: 5, color: setup.theme.textColor }} justifyContent="space-between" >

            <Typography gutterBottom variant="h4" component="div">
              {/* {cityName[0]} */}
              { city.name.split(',')[0] }
            </Typography>

            {
              favoriteItem === 'add' ? <>
                <IconButton
                  size="large"
                  color='inherit'
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

          <Typography variant="h6" sx={{ color: setup.theme.textColor }} >
            Current Temperarue is {currentWeather.currentWeather[setup.degrees.type] + setup.degrees.symbol}

          </Typography>
          <Typography variant="h6" sx={{ color: setup.theme.textColor }} >
            {/* {timeArray[1]} */}
            {currentWeather.currentWeather.time[1]}

          </Typography>
          <Typography variant="h6" sx={{ color: setup.theme.textColor }} >
            {/* {timeArray[0]} */}
            {currentWeather.currentWeather.time[0]}
          </Typography>
          <br />
          <Typography gutterBottom variant="h5" component="div" align="center" sx={{ mb: 8, color: setup.theme.textColor }}>
            Weather is {currentWeather.currentWeather.weatherText}
          </Typography>

        </>
      }

      {/* {
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
      } */}


      {
        !fiveDaysWeatherForecast ? null : <>

          <CarouselContainer days={fiveDaysWeatherForecast.fiveDaysWeatherForecast} />

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
    autocomplete: state.autocomplete,
    setup: state.setup
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