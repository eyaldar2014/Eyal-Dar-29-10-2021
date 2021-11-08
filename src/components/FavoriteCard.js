import react from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { removeFavorite, fetchFavoritetWeather, chooseCityToFetchWeatherFrom } from '../redux'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function FavoriteCard({ favorite, removeFavorite, fetchFavoritetWeather, chooseCityToFetchWeatherFrom }) {

  react.useEffect(() => {

    fetchFavoritetWeather(favorite.locationKey)
  }, [])


  const favoritesAction = () => removeFavorite(favorite.locationKey)


  return <>

    <Card sx={{ maxWidth: 345 }}>
      <Link to="/" onClick={() => chooseCityToFetchWeatherFrom(favorite)}>

        {!favorite ? null : <>

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {favorite.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              temprature is {favorite.weather} F degrees
            </Typography>
          </CardContent>
        </>}
      </Link>
    </Card>

    <Button variant="contained" onClick={favoritesAction}> remove favorite </Button>

  </>
}




const mapDispatchToProps = dispatch => {
  return {
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
    fetchFavoritetWeather: (val) => dispatch(fetchFavoritetWeather(val)),
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
  }
}



export default connect(
  null,
  mapDispatchToProps
)(FavoriteCard)