// error handling


import react from 'react';
import { connect } from 'react-redux'
import { fetchCurrentWeather, fetchFiveDaysWeather } from '../redux'

import Autocomplete from './Autocomplete'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import CurrentMainCity from './CurrentMainCity';


function Home({ city, fetchCurrentWeather, fetchFiveDaysWeather }) {

  const [disabled, setDisabled] = react.useState(true)
  // const [error, setError] = react.useState();

  react.useEffect(()=>{

    fetchCurrentWeather('215854')
    fetchFiveDaysWeather('215854')
  },[])

  const getCurrentWeatherFromApi = () => fetchCurrentWeather(city.locationKey)

  const getFiveDaysWeatherForecastFromApi =  () => fetchFiveDaysWeather(city.locationKey)


  const searchLocation = () => {
    setDisabled(true)

    getFiveDaysWeatherForecastFromApi()
    getCurrentWeatherFromApi()
  }

  const allowSearch = () => setDisabled(false)


  return (
    <div>

      <Stack direction="row" spacing={2}>
        <Autocomplete allowSearch={allowSearch} />
        <Button variant="contained" onClick={searchLocation} disabled={disabled} >
          Give Me Weather
        </Button>
      </Stack>

      <CurrentMainCity />

    </div>
  );
}



const mapStateToProps = state => {
  return {
    city: state.autocomplete.city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentWeather: (val) => dispatch(fetchCurrentWeather(val)),
    fetchFiveDaysWeather: (val) => dispatch(fetchFiveDaysWeather(val))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)