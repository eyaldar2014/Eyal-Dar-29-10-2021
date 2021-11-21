import react from 'react';

import { connect } from 'react-redux'

import Box from '@mui/material/Box';
import Autocomplete from './Autocomplete'

import ErrorComponent from './ErrorComponent'
import CurrentMainCity from './CurrentMainCity';
import CarouselContainer from './CarouselContainer';


function Home({ currentWeather, fiveDaysWeatherForecast, autocomplete, setup }) {

  const [error, setError] = react.useState(false)

  react.useEffect(() => {

    if (currentWeather.error || fiveDaysWeatherForecast.error || autocomplete.error) setError(true)

  }, [currentWeather, fiveDaysWeatherForecast, autocomplete])


  return (
    <Box
      sx={{
        backgroundColor: setup.theme.backgroundColor,
        pb: 4
      }}
    >
      <Box sx={{ width: 330, pt: 4, pl: 0, m: 4, mt: 0 }} >
        <Autocomplete sx={{ width: 330, pt: 4, pl: 0, m: 4, mt: 0 }} />
      </Box>

      {
        error === false
          ? null
          : <ErrorComponent />
      }

      <Box
        sx={{
          m: 1,
          mt: 0,
          p: 3,
          backgroundColor: setup.theme.blue
        }}
      >
        <CurrentMainCity />

        <CarouselContainer />
      </Box>
    </Box>
  );
}


const mapStateToProps = state => {
  return {
    currentWeather: state.currentWeather,
    fiveDaysWeatherForecast: state.fiveDaysWeatherForecast,
    autocomplete: state.autocomplete,
    setup: state.setup
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)