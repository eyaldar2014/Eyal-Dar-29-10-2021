// handle error with api


import react from "react";
import { connect } from 'react-redux'
import { fetcAutocompleteLocations } from '../redux'

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";


// at callAutoCompleteApi function, for delay reason
let temp = 1;

function AutocompleteComponent({ allowSearch, locationsData, fetcAutocompleteLocations, autocompleteCity }) {

  const [open, setOpen] = react.useState(false);
  const [options, setOptions] = react.useState([]);
  const loading = open && options.length === 0;

  react.useEffect(() => {
    // console.log('locationsData', locationsData)

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
    if (mergeTypeRequest === temp) fetcAutocompleteLocations(value)
  }

  const onChangeHandle = async (value) => {
    temp++;
    let mergeTypeRequest = temp;

    setTimeout(() => {
      callAutoCompleteApi(value, mergeTypeRequest);
    }, 500);
  };

  react.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onSelectHandle = (e, c) => {
    // console.log(e);
    // console.log(c);

    // cases where no country is chosen, 'x' button is clicked inside search
    if (c) {
      if (c.locationKey) {
        allowSearch()
        autocompleteCity(c)
        // chooseCityToFetchWeatherFrom(c)
      }
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}


      // getOptionSelected={(option, value) => option.locationKey}
      
      onChange={onSelectHandle}

      getOptionSelected={(option) => option.name}
      getOptionLabel={(option) => option.name}


      options={options}


      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Location"
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
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </react.Fragment>
            )
          }}
        />
      )}
    />
  );
}



const mapStateToProps = state => {
  return {
    locationsData: state.autocomplete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetcAutocompleteLocations: (val) => dispatch(fetcAutocompleteLocations(val))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteComponent)