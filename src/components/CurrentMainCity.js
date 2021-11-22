import react from 'react';

import { connect } from 'react-redux'
import { addFavorite, removeFavorite, chooseCityToFetchWeatherFrom, fetchCurrentWeather, fetchFiveDaysWeather } from '../redux'

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


function CurrentMainCity({ fetchCurrentWeather, fetchFiveDaysWeather, currentWeather, chooseCityToFetchWeatherFrom, city, favorites, addFavorite, removeFavorite, setup }) {

  const [favoriteItem, setFavoriteItem] = react.useState('add')


// create here get location and api calculation method (redux) // 'chooseCityToFetchWeatherFrom' maybe will not be necessary after gps usage
  react.useEffect(() => {

    if (!city) chooseCityToFetchWeatherFrom({ name: 'Tel Aviv, Israel', locationKey: 215854 })
  }, [])

  // useEffect are seperated for saving api calls
  react.useEffect(() => {

    if (city && favorites.favorites.length > 0) checkFavorite()
    else if (favoriteItem !== 'add') setFavoriteItem('add')

    if (city) getCityInfo(city)
  }, [city])

  react.useEffect(() => {

    if (city && favorites.favorites.length > 0) checkFavorite()
    else if (favoriteItem !== 'add') setFavoriteItem('add')

  }, [favorites])


  const getCityInfo = (c) => {
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
      !currentWeather.currentWeather.display ? null : <>
        <Stack direction="row" sx={{ m: 5, color: setup.theme.textColor }} justifyContent="space-between" >

          <Typography gutterBottom variant="h4" component="div">
            {city.name.split(',')[0]}
          </Typography>

          <IconButton
            size="large"
            color='inherit'
            aria-label="menu"
            onClick={favoritesAction}
            variant="contained"
          >
            {
              favoriteItem === 'add'
                ? <FavoriteBorderIcon fontSize="large" />
                : <FavoriteIcon fontSize="large" style={{ color: 'red' }} />
            }
          </IconButton>
        </Stack>

        <Typography variant="h6" sx={{ color: setup.theme.textColor }} >
          Current Temperarue is {currentWeather.currentWeather[setup.degrees.type] + setup.degrees.symbol}
        </Typography>

        <Typography variant="h6" sx={{ color: setup.theme.textColor }} >
          {currentWeather.currentWeather.time[1]}
        </Typography>

        <Typography variant="h6" sx={{ color: setup.theme.textColor }} >
          {currentWeather.currentWeather.time[0]}
        </Typography>

        <Typography gutterBottom variant="h5" component="div" align="center" sx={{ mb: 8, color: setup.theme.textColor }}>
          Weather is {currentWeather.currentWeather.weatherText}
        </Typography>

      </>
    }

  </>
}


const mapStateToProps = state => {
  return {
    currentWeather: state.currentWeather,
    city: state.autocomplete.city,
    favorites: state.favorites,
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