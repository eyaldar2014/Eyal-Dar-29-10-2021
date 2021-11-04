// probably not needed :
// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }


// delete data under


// handle error with api




import react from "react";
import { connect } from 'react-redux'
import { fetcAutocompleteLocations, chooseCityToFetchWeatherFrom } from '../redux'

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";


// at callAutoCompleteApi function, for delay reason
let temp = 1;

function AutocompleteComponent({ allowSearch, locationsData, fetcAutocompleteLocations, chooseCityToFetchWeatherFrom }) {

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
    // if (mergeTypeRequest === temp) fetcAutocompleteLocations(value)
    setOptions(response.data.map((place) => {
      return {
        name: place.LocalizedName + ", " + place.Country.LocalizedName,
        locationKey: place.Key
      }
    }
    ))
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
        chooseCityToFetchWeatherFrom(c)
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
    fetcAutocompleteLocations: (val) => dispatch(fetcAutocompleteLocations(val)),
    chooseCityToFetchWeatherFrom: (city) => dispatch(chooseCityToFetchWeatherFrom(city))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteComponent)



const response = {
  "data": [
    {
      "Version": 1,
      "Key": "215854",
      "Type": "City",
      "Rank": 31,
      "LocalizedName": "Tel Aviv",
      "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
      },
      "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
      }
    },
    {
      "Version": 1,
      "Key": "3431644",
      "Type": "City",
      "Rank": 45,
      "LocalizedName": "Telanaipura",
      "Country": {
        "ID": "ID",
        "LocalizedName": "Indonesia"
      },
      "AdministrativeArea": {
        "ID": "JA",
        "LocalizedName": "Jambi"
      }
    },
    {
      "Version": 1,
      "Key": "300558",
      "Type": "City",
      "Rank": 45,
      "LocalizedName": "Telok Blangah New Town",
      "Country": {
        "ID": "SG",
        "LocalizedName": "Singapore"
      },
      "AdministrativeArea": {
        "ID": "05",
        "LocalizedName": "South West"
      }
    },
    {
      "Version": 1,
      "Key": "325876",
      "Type": "City",
      "Rank": 51,
      "LocalizedName": "Telford",
      "Country": {
        "ID": "GB",
        "LocalizedName": "United Kingdom"
      },
      "AdministrativeArea": {
        "ID": "TFW",
        "LocalizedName": "Telford and Wrekin"
      }
    },
    {
      "Version": 1,
      "Key": "169072",
      "Type": "City",
      "Rank": 51,
      "LocalizedName": "Telavi",
      "Country": {
        "ID": "GE",
        "LocalizedName": "Georgia"
      },
      "AdministrativeArea": {
        "ID": "KA",
        "LocalizedName": "Kakheti"
      }
    },
    {
      "Version": 1,
      "Key": "230611",
      "Type": "City",
      "Rank": 51,
      "LocalizedName": "Telsiai",
      "Country": {
        "ID": "LT",
        "LocalizedName": "Lithuania"
      },
      "AdministrativeArea": {
        "ID": "TE",
        "LocalizedName": "Telšiai"
      }
    },
    {
      "Version": 1,
      "Key": "2723742",
      "Type": "City",
      "Rank": 55,
      "LocalizedName": "Telégrafo",
      "Country": {
        "ID": "BR",
        "LocalizedName": "Brazil"
      },
      "AdministrativeArea": {
        "ID": "PA",
        "LocalizedName": "Pará"
      }
    },
    {
      "Version": 1,
      "Key": "186933",
      "Type": "City",
      "Rank": 55,
      "LocalizedName": "Tela",
      "Country": {
        "ID": "HN",
        "LocalizedName": "Honduras"
      },
      "AdministrativeArea": {
        "ID": "AT",
        "LocalizedName": "Atlántida"
      }
    },
    {
      "Version": 1,
      "Key": "3453754",
      "Type": "City",
      "Rank": 55,
      "LocalizedName": "Telaga Asih",
      "Country": {
        "ID": "ID",
        "LocalizedName": "Indonesia"
      },
      "AdministrativeArea": {
        "ID": "JB",
        "LocalizedName": "West Java"
      }
    },
    {
      "Version": 1,
      "Key": "3453755",
      "Type": "City",
      "Rank": 55,
      "LocalizedName": "Telagamurni",
      "Country": {
        "ID": "ID",
        "LocalizedName": "Indonesia"
      },
      "AdministrativeArea": {
        "ID": "JB",
        "LocalizedName": "West Java"
      }
    }
  ]
}