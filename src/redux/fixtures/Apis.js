
export const apiKey = '?apikey=zexrh1vyQOIjEXEVUJbtrhLNvXL0f4Qw'
export const autocompleteSearchApi = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete' + apiKey + '&q=' //= // +{text}
export const getFiveDaysWeatherForecast = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' // +{locationKey} + {apiKey}
export const getCurrentWeather = 'http://dataservice.accuweather.com/currentconditions/v1/' // +{locationKey} + {apiKey}
