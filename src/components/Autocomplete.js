import react from "react";
import { connect } from 'react-redux'
import { fetcAutocompleteLocations, chooseCityToFetchWeatherFrom } from '../redux'

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";


// at callAutoCompleteApi function, for delay reason. where should it be? redux. redux-helpers.
let temp = 1;

function AutocompleteComponent({ locationsData, fetcAutocompleteLocations, chooseCityToFetchWeatherFrom, setup }) {

  const [open, setOpen] = react.useState(false);
  const [options, setOptions] = react.useState([]);
  const loading = open && options.length === 0;

  react.useEffect(() => {

    if (locationsData.locations.length > 0) {
      setOptions(locationsData.locations.map((place) => {
        return {
          name: place.LocalizedName + ", " + place.Country.LocalizedName,
          locationKey: place.Key
        }
      }
      ));
    }
  }, [locationsData])


  function callAutoCompleteApi(value, mergeTypeRequest) {
    if (mergeTypeRequest === temp && value !== '') fetcAutocompleteLocations(value)
  }

  const onChangeHandle = async (value) => {
    temp++;
    let mergeTypeRequest = temp;

    setTimeout(() => {
      callAutoCompleteApi(value, mergeTypeRequest);
    }, 500);
  };

  const onSelectHandle = (e, c) => {
    // cases where no country is chosen, 'x' button is clicked inside search
    if (c) if (c.locationKey) chooseCityToFetchWeatherFrom(c)
  };


  const useStyles = makeStyles({
    autocompleteOptions: {
      backgroundColor: setup.theme.backgroundColor,
      color: setup.theme.textColor
    },
    loadingText: {
      background: setup.theme.backgroundColor,
      color: setup.theme.textColor
    }
  });
  const classes = useStyles();


  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300, background: setup.theme.backgroundColor }}
      classes={{
        paper: classes.autocompleteOptions,
        // option: classes.options,
        loading: classes.loadingText
      }}

      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}

      onChange={onSelectHandle}
      getOptionSelected={(option) => option.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      loadingText='loading..'

      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Location"
          InputLabelProps={{
            style: { color: setup.theme.textColor },
          }}
          variant="outlined"
          onChange={(ev) => {
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}

          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <react.Fragment>
                {loading ? (
                  <CircularProgress size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </react.Fragment>
            ),
            style: { backgroundColor: setup.theme.backgroundColor, color: setup.theme.textColor }
          }}
        />
      )}
    />
  );
}


const mapStateToProps = state => {
  return {
    locationsData: state.autocomplete,
    setup: state.setup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetcAutocompleteLocations: (val) => dispatch(fetcAutocompleteLocations(val)),
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteComponent)