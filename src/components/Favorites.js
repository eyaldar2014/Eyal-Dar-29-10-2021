import react from 'react';

import { connect } from 'react-redux'
import { fetchFavoritetWeather, chooseCityToFetchWeatherFrom, removeFavorite } from '../redux'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ErrorComponent from './ErrorComponent'
import CardComponent from './CardComponent'


function Favorites({ favorites, fetchFavoritetWeather, chooseCityToFetchWeatherFrom, removeFavorite, setup }) {

  const [error, setError] = react.useState(false)

  react.useEffect(() => {

    if (favorites.error) setError(true)
    if (favorites.favorites.length > 0) favorites.favorites.forEach((fav) => fetchFavoritetWeather(fav.locationKey))

  }, [])


  return <>
    <Box
      sx={{
        pt: 4,
        pb: 4,
        backgroundColor: setup.theme.backgroundColor
      }}
    >

      {
        error === false
          ? null
          : <ErrorComponent />
      }

      <Box
        sx={{
          m: 4,
          backgroundColor: setup.theme.blue
        }}
      >

        <Typography variant="h2" sx={{ mt: 4, p: 4, color: setup.theme.textColor }} >
          Favorites
        </Typography>

        <Stack
          direction="row"
          sx={{
            p: 4,
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: 200,
            justifyContent: 'flex-start'
          }}
        >
          {
            !favorites.favorites.length > 0
              ? null
              : !favorites.favorites.reduce((s, v) => s && (v.weather !== undefined), true)
                ? null
                : favorites.favorites.map((fav, i) => {

                  return <CardComponent
                    key={i}

                    data={{
                      title: fav.name,
                      body: [
                        {
                          name: 'Current Temprature',
                          value: 'is ' + fav.weather[setup.degrees.type] + setup.degrees.symbol
                        }
                      ]
                    }}
                    link='/'
                    linkFunc={() => chooseCityToFetchWeatherFrom(fav)}
                    btnName='remove'
                    btnFunc={() => removeFavorite(fav.locationKey)}
                  />

                })
          }

        </Stack>
      </Box>

    </Box>
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
    fetchFavoritetWeather: (val) => dispatch(fetchFavoritetWeather(val)),
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite)),
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
