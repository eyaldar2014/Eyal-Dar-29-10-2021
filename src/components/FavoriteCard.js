import react from 'react';
import { connect } from 'react-redux'
import { removeFavorite, fetchFavoritetWeather } from '../redux'
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function FavoriteCard({ favorite, removeFavorite, fetchFavoritetWeather, chooseCity }) {

  const [data, setData] = react.useState()

  react.useEffect(() => {

    setData(favorite)
  }, [])

  react.useEffect(() => {

    // console.log('favorite', favorite)
    fetchFavoritetWeather(favorite.locationKey)
  }, [data])




  const favoritesAction = () => removeFavorite(favorite.locationKey)


  return <>


    <Link to="/" onClick={() => chooseCity(favorite)}>
      <Card sx={{ maxWidth: 345 }}>

        {!data ? null : <>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.dayOfTheWeek}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {favorite.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              temprature is {favorite.weather} F degrees
            </Typography>
            <Button variant="contained" onClick={favoritesAction}> remove favorite </Button>
          </CardContent>
        </>}
      </Card>
    </Link>

  </>
}




const mapDispatchToProps = dispatch => {
  return {
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
    fetchFavoritetWeather: (val) => dispatch(fetchFavoritetWeather(val))
  }
}


export default connect(
  null,
  mapDispatchToProps
)(FavoriteCard)