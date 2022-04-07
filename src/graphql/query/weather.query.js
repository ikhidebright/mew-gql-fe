export const GET_WEATHER_QUERY = `
query getCurrentWeatherByCityName ($cityName: String!) {
  getCurrentWeatherByCityName (cityName: $cityName)
}
`;
