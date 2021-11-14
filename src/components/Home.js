import react from 'react';

import { connect } from 'react-redux'
import { chooseCityToFetchWeatherFrom } from '../redux'

import Autocomplete from './Autocomplete'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import CurrentMainCity from './CurrentMainCity';


function Home({ chooseCityToFetchWeatherFrom, setup }) {

  const [disabled, setDisabled] = react.useState(true)
  const [chosenCity, setChosenCity] = react.useState();


  const searchLocation = () => {
    setDisabled(true)

    chooseCityToFetchWeatherFrom(chosenCity)
  }

  const allowSearch = () => setDisabled(false)


  return (
    <Box
      sx={{
        backgroundColor: setup.theme.backgroundColor,
        pb: 4
      }}
    >
      <Stack direction="row" sx={{ width: 330, pt: 4, pl: 2, m: 4, mt: 0 }} >
        <Autocomplete allowSearch={allowSearch} autocompleteCity={(c) => setChosenCity(c)} />

        <IconButton
          size="large"
          aria-label="menu"
          onClick={searchLocation}
          disabled={disabled}
          variant="contained"
        >
          <SearchIcon fontSize="large" sx={{ color: setup.theme.textColor }} />
        </IconButton>
      </Stack>

      <CurrentMainCity />

    </Box>
  );
}


const mapStateToProps = state => {
  return {
    setup: state.setup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)