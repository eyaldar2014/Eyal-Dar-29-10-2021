import react from 'react';

import { connect } from 'react-redux'
import { chooseCityToFetchWeatherFrom } from '../redux'

import Autocomplete from './Autocomplete'
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import CurrentMainCity from './CurrentMainCity';


function Home({ chooseCityToFetchWeatherFrom }) {

  const [disabled, setDisabled] = react.useState(true)
  const [chosenCity, setChosenCity] = react.useState();


  const searchLocation = () => {
    setDisabled(true)

    chooseCityToFetchWeatherFrom(chosenCity)
  }

  const allowSearch = () => setDisabled(false)


  return (
    <div>

      <Stack direction="row" sx={{ width: 330, m: 4 }}>
        <Autocomplete allowSearch={allowSearch} autocompleteCity={(c) => setChosenCity(c)} />

        <IconButton
          size="large"
          color="default"
          aria-label="menu"
          onClick={searchLocation}
          disabled={disabled}
          variant="contained"
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      </Stack>

      <CurrentMainCity />

    </div>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
  }
}


export default connect(
  null,
  mapDispatchToProps
)(Home)