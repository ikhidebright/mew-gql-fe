export const GET_WEATHER_QUERY = `
query getCurrentWeatherByCityName ($cityName: String!) {
  getCurrentWeatherByCityName (cityName: $cityName)
}
`;

export const GET_WEATHER_SUBSCRIPTION = `
subscription getCurrentWeatherByCityName ($cityName: String!) {
  getCurrentWeatherByCityName (cityName: $cityName)
}
`;
