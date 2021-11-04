import react from 'react';
import { connect } from 'react-redux'
import { removeFavorite } from '../redux'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';





function FavoriteCard({ favorite, removeFavorite }) {

  const [data, setData] = react.useState()

  react.useEffect(() => {

    console.log(favorite)
    setData(favorite)
  }, [])

  const favoritesAction = () => removeFavorite(favorite.locationKey) 


  return <>


      <Card sx={{ maxWidth: 345 }}>

        {!data ? null : <>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.dayOfTheWeek}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {favorite.name}
            </Typography>
            <Button variant="contained" onClick={favoritesAction}> remove favorite </Button>
          </CardContent>
        </>}
      </Card>


</>
}




const mapDispatchToProps = dispatch => {
  return {
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite))
  }
}


export default connect(
  null,
  mapDispatchToProps
)(FavoriteCard)