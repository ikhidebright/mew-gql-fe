<template>
  <v-app>
    <v-main>
      <v-card
        class="mx-auto mt-15"
        max-width="344"
        variant="outlined"
        rounded="0"
      >
        <v-card-text>
          <p v-if="loading">loading...</p>
          <p v-else-if="error">Sorry an error occurred</p>
          <p v-else>Right now it is {{ temp }} degrees in LA</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="outlined"
            @click="refetch()"
            :disabled="loading"
            rounded="0"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref } from "vue";
import { GET_WEATHER_QUERY } from "./graphql/query/weather.query";

const cityName = ref("Los Angeles");
const weather = gql(GET_WEATHER_QUERY);
const { loading, result, error, refetch } = useQuery(
  weather,
  {
    cityName: cityName,
  },
  {
    fetchPolicy: "cache-and-network",
  }
);
const temp = useResult(result, null, (data) => {
  return Math.floor(data.getCurrentWeatherByCityName - 273.15);
});
</script>
