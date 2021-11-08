import react from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { removeFavorite, fetchFavoritetWeather, chooseCityToFetchWeatherFrom } from '../redux'

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function FavoriteCard({ favorite, removeFavorite, fetchFavoritetWeather, chooseCityToFetchWeatherFrom }) {

  react.useEffect(() => {

    // fetchFavoritetWeather(favorite.locationKey)
  }, [])


  const favoritesAction = () => removeFavorite(favorite.locationKey)


  return <>

    <Card sx={{ width: 150, m: 1 }} >
      <Stack
        direction="column"
        sx={{ p: 1 }}
        justifyContent="space-between"
      >

        <Link to="/" onClick={() => chooseCityToFetchWeatherFrom(favorite)} style={{ textDecoration: "none"}}>

          {!favorite ? null : <>

            <CardContent>

              <Typography variant="h6" color="text.secondary" >
                {favorite.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Current Temprature
              </Typography>

              <Typography variant="body2" color="text.secondary">
                is {favorite.weather} FFF
              </Typography>

            </CardContent>
          </>}
        </Link>

        <Button variant="contained" onClick={favoritesAction} color="error" > remove </Button>

      </Stack>
    </Card>

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