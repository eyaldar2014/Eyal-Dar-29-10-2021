import react from 'react';
import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { removeFavorite, fetchFavoritetWeather, chooseCityToFetchWeatherFrom } from '../redux'

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { CardActionArea } from '@mui/material';


function FavoriteCard({ favorite, removeFavorite, fetchFavoritetWeather, chooseCityToFetchWeatherFrom, favorites, setup }) {


  react.useEffect(() => {

    fetchFavoritetWeather(favorite.locationKey)
  }, [])

  react.useEffect(() => {

  }, [favorites])


  const favoritesAction = () => removeFavorite(favorite.locationKey)


  const useStyles = makeStyles((theme) => ({
    button: {
      color: setup.theme.textColor,
      background: setup.theme.blue,
      "&:hover": {
        backgroundColor: 'red'
      },
    }
  }));
  const classes = useStyles();


  return <>

    <Card sx={{
      width: 150,
      m: 1,
      backgroundColor: setup.theme.backgroundColor,
      color: setup.theme.textColor
    }} >
      <CardActionArea>
        <Stack
          direction="column"
          sx={{ p: 1 }}
          justifyContent="space-between"
        >

          <Link to="/" onClick={() => chooseCityToFetchWeatherFrom(favorite)} style={{ textDecoration: "none" }}>

            {!favorite ? null : <>

              <CardContent>

                <Typography variant="h6" sx={{ color: setup.theme.textColor }} >
                  {favorite.name}
                </Typography>

                <Typography variant="body2" sx={{ color: setup.theme.textColor }} >
                  Current Temprature
                </Typography>

                <Typography variant="body2" sx={{ color: setup.theme.textColor }} >
                  {
                    !favorite.weather ? null : <>
                      is {favorite.weather[setup.degrees.type] + setup.degrees.symbol}
                    </>
                  }
                </Typography>

              </CardContent>
            </>}
          </Link>

          <Button
            variant="contained"
            onClick={favoritesAction}
            className={classes.button}
          >
            remove
          </Button>

        </Stack>
      </CardActionArea>
    </Card>

  </>
}


const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    setup: state.setup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
    fetchFavoritetWeather: (val) => dispatch(fetchFavoritetWeather(val)),
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteCard)