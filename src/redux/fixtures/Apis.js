
export const apiKey = '?apikey=tzjjGOHq0LlbFs9z8FDtP2w8AQlryN66' // diferent : gSDyz0jRqBAGWkQi9lVmFRPd0WPeUAfC
export const autocompleteSearchApi = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete' + apiKey + '&q='  // +{text}
export const getFiveDaysWeatherForecast = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' // +{locationKey} + {apiKey}
export const getCurrentWeather = 'https://dataservice.accuweather.com/currentconditions/v1/' // +{locationKey} + {apiKey}
