// import { ContactSupportOutlined } from '@mui/icons-material';


// delete data under





import react from 'react';
import { connect } from 'react-redux'
import { addFavorite, removeFavorite } from '../redux'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import DayForecast from './DayForecast';


function CurrentMainCity({ currentWeather, fiveDaysWeatherForecast, city, favorites, addFavorite, removeFavorite }) {

  const [favoriteItem, setFavoriteItem] = react.useState('add')

  react.useEffect(() => {

    console.log('currentWeather', currentWeather)
    console.log('fiveDaysWeatherForecast', fiveDaysWeatherForecast)

    // '2021-11-04T16:46:00+02:00'
  }, [])

  react.useEffect(() => {
    // console.log(favorites.favorites)

    setFavoriteItem('add')

    if(city && favorites.favorites.length > 0) checkFavorite()
  }, [favorites, city])

  const checkFavorite = () =>{
    const favorite = favorites.favorites.find(x => x.locationKey === city.locationKey)
    // console.log('favorite', favorite)
    if( favorite ) setFavoriteItem('remove')
  }

  const favoritesAction = () => {

    if (favoriteItem === 'add') addFavorite(city)
    else{ removeFavorite(city.locationKey) }
  }


  return <>

    <Box
      sx={{
        width: 1000,
        height: 1000,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >

      <div>
        <div>
          <h1>{city.name}</h1>
          <span>{'temp ' + currentTelAviv.Temperature.Imperial.Value + 'F'}</span>
          <br />
          <span>date&time: {currentTelAviv.LocalObservationDateTime} </span>
        </div>

        <Button variant="contained" onClick={favoritesAction}> {favoriteItem} favorite </Button>

        <h2>{currentTelAviv.WeatherText}</h2>
      </div>

      <Stack direction="row" spacing={2}>
        {
          dailyForecasts.map((day, i) => {
            return <DayForecast key={i} day={day} />
          })
        }
      </Stack>
    </Box>

  </>
}


const mapStateToProps = state => {
  return {
    currentWeather: state.currentWeather,
    fiveDaysWeatherForecast: state.fiveDaysWeatherForecast,
    city: state.autocomplete.city,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavorite: (newFavorite) => dispatch(addFavorite(newFavorite)),
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMainCity)

const dailyForecasts = [
  {
    "Date": "2021-11-03T07:00:00+02:00",
    "EpochDate": 1635915600,
    "Temperature": {
      "Minimum": {
        "Value": 67,
        "Unit": "F",
        "UnitType": 18
      },
      "Maximum": {
        "Value": 80,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "Day": {
      "Icon": 2,
      "IconPhrase": "Mostly sunny",
      "HasPrecipitation": false
    },
    "Night": {
      "Icon": 34,
      "IconPhrase": "Mostly clear",
      "HasPrecipitation": false
    },
    "Sources": [
      "AccuWeather"
    ],
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
  },
  {
    "Date": "2021-11-04T07:00:00+02:00",
    "EpochDate": 1636002000,
    "Temperature": {
      "Minimum": {
        "Value": 69,
        "Unit": "F",
        "UnitType": 18
      },
      "Maximum": {
        "Value": 81,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "Day": {
      "Icon": 1,
      "IconPhrase": "Sunny",
      "HasPrecipitation": false
    },
    "Night": {
      "Icon": 33,
      "IconPhrase": "Clear",
      "HasPrecipitation": false
    },
    "Sources": [
      "AccuWeather"
    ],
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
  },
  {
    "Date": "2021-11-05T07:00:00+02:00",
    "EpochDate": 1636088400,
    "Temperature": {
      "Minimum": {
        "Value": 73,
        "Unit": "F",
        "UnitType": 18
      },
      "Maximum": {
        "Value": 84,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "Day": {
      "Icon": 1,
      "IconPhrase": "Sunny",
      "HasPrecipitation": false
    },
    "Night": {
      "Icon": 33,
      "IconPhrase": "Clear",
      "HasPrecipitation": false
    },
    "Sources": [
      "AccuWeather"
    ],
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
  },
  {
    "Date": "2021-11-06T07:00:00+02:00",
    "EpochDate": 1636174800,
    "Temperature": {
      "Minimum": {
        "Value": 71,
        "Unit": "F",
        "UnitType": 18
      },
      "Maximum": {
        "Value": 85,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "Day": {
      "Icon": 1,
      "IconPhrase": "Sunny",
      "HasPrecipitation": false
    },
    "Night": {
      "Icon": 33,
      "IconPhrase": "Clear",
      "HasPrecipitation": false
    },
    "Sources": [
      "AccuWeather"
    ],
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
  },
  {
    "Date": "2021-11-07T07:00:00+02:00",
    "EpochDate": 1636261200,
    "Temperature": {
      "Minimum": {
        "Value": 73,
        "Unit": "F",
        "UnitType": 18
      },
      "Maximum": {
        "Value": 83,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "Day": {
      "Icon": 1,
      "IconPhrase": "Sunny",
      "HasPrecipitation": false
    },
    "Night": {
      "Icon": 33,
      "IconPhrase": "Clear",
      "HasPrecipitation": false
    },
    "Sources": [
      "AccuWeather"
    ],
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
  }
]

const currentTelAviv =
{
  "LocalObservationDateTime": "2021-11-03T23:31:00+02:00",
  "EpochTime": 1635975060,
  "WeatherText": "Clear",
  "WeatherIcon": 33,
  "HasPrecipitation": false,
  "PrecipitationType": null,
  "IsDayTime": false,
  "Temperature": {
    "Metric": {
      "Value": 22.4,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": 72,
      "Unit": "F",
      "UnitType": 18
    }
  },
  "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
  "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
}