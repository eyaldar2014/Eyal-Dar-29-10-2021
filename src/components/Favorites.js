import react from 'react';
import { connect } from 'react-redux'
// import {  } from '../redux'
import FavoriteCard from './FavoriteCard';


function Favorites({ favorites }) {

  
  react.useEffect(() => {

  }, [favorites])

  

  return <>
    {
      !favorites.favorites.length > 0 ? <h1>no favorites</h1> : <>
        {
          favorites.favorites.map((fav, i) => {
            return <FavoriteCard key={i} favorite={fav}/>
          })
        }
      </>
    }
  </>
}



const mapStateToProps = state => {
  return {
    favorites: state.favorites
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
//   }
// }


export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Favorites)