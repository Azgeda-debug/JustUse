<template>
  <q-page
    class="weather-container"
    :class="
      weatherStore.weatherDetails.main &&
      weatherStore.weatherDetails.main.temp < 0
        ? 'cold'
        : 'warm'
    "
  >
    <q-input
      @keyup.enter="weatherStore.searchWeather"
      v-model="weatherStore.searchWeatherInput"
      bottom-slots
      class="text-bold"
      :dark="true"
      label="Search"
      style="max-width: 90%; margin: 0 auto"
    >
      <template v-slot:prepend>
        <q-btn
          @click="weatherStore.getLocation"
          :loading="weatherStore.loadingWeather"
          flat
          dense
          rounded
          color="primary"
          icon="place"
        />
      </template>
      <template v-slot:append>
        <q-btn
          @click="weatherStore.searchWeatherInput = ''"
          flat
          dense
          rounded
          color="primary"
          icon="close"
        />
      </template>
      <template v-slot:hint> click enter to search </template>
    </q-input>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-if="weatherStore.weatherDetails && weatherStore.weatherDetails.sys"
        class="text-center q-mt-md"
      >
        <div>
          <span class="text-h4 text-center"
            >{{ weatherStore.weatherDetails.name }},
            {{ weatherStore.weatherDetails.sys.country }}</span
          >
        </div>

        <div class="text-caption text-gray row q-gutter-lg flex justify-center">
          <span
            >sunrise:
            {{ returnTime(weatherStore.weatherDetails.sys.sunrise) }}</span
          >
          <span
            >sunset:
            {{ returnTime(weatherStore.weatherDetails.sys.sunset) }}</span
          >
        </div>

        <div class="q-pt-sm row" style="max-width: 350px; margin: 0 auto">
          <span class="text-h4 col-12"
            >Temp:
            {{ Math.round(weatherStore.weatherDetails.main.temp) }}&deg;C</span
          >
          <span class="text-h6 col-6"
            >min today:
            {{
              Math.round(weatherStore.weatherDetails.main.temp_min)
            }}&deg;C</span
          >
          <span class="text-h6 col-6"
            >max today:
            {{
              Math.round(weatherStore.weatherDetails.main.temp_max)
            }}&deg;C</span
          >
          <span class="text-h6 col-6"
            >feels like:
            {{
              Math.round(weatherStore.weatherDetails.main.feels_like)
            }}&deg;C</span
          >
          <span class="text-h6 col-6"
            >pressure:
            {{ Math.round(weatherStore.weatherDetails.main.pressure) }}hPa</span
          >
        </div>

        <div class="row justify-center q-pt-sm">
          <span class="text-h5 col-12"
            >Wind: {{ weatherStore.weatherDetails.wind.speed }} km/h</span
          >

          <q-img
            class="col-12"
            width="64px"
            :src="`https://openweathermap.org/img/wn/${weatherStore.weatherDetails.weather[0].icon}.png`"
          />
          <span class="text-h5 col-12">
            {{ weatherStore.weatherDetails.weather[0].description }}
          </span>
        </div>

        <div
          v-if="
            weatherStore.nextDaysWeatherDetails &&
            weatherStore.nextDaysWeatherDetails.list
          "
          class="row justify-center q-gutter-x-sm q-mt-md"
        >
          <div
            v-for="(index, i) in [0, 8, 16, 24, 32]"
            :key="i"
            class="col-2 row q-gutter-sm"
          >
            <span class="col-12 text-bold text-white">{{
              i === 0
                ? "Today"
                : returnDate(weatherStore.nextDaysWeatherDetails.list[index].dt)
            }}</span>
            <span class="col-12"
              ><q-img
                class="col-12"
                width="64px"
                :src="`https://openweathermap.org/img/wn/${weatherStore.nextDaysWeatherDetails.list[index].weather[0].icon}.png`"
            /></span>
            <span class="col-12 text-bold text-white"
              >{{
                Math.round(
                  weatherStore.nextDaysWeatherDetails.list[index].main.temp
                )
              }}&deg;C</span
            >
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { useWeatherStore } from "stores/weatherStore";

const weatherStore = useWeatherStore();

const returnTime = (timestamp) => {
  const d = new Date(timestamp * 1000);

  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, 0);
  const seconds = d.getSeconds().toString().padStart(2, 0);

  return `${hours}:${minutes}:${seconds}`;
};

const returnDate = (timestamp) => {
  const d = new Date(timestamp * 1000);

  const day = d.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", " Thu", "Fri", "Sat"];

  return `${days[day]}`;
};
</script>

<style lang="scss" scoped>
.weather-container {
  &.warm,
  &.cold {
    background-repeat: no-repeat;
    background-size: cover;
    transition: background-image 1s ease, background-position 1s ease;
  }

  &.warm {
    background-image: url("../assets/warm-landscape.jpg");
    background-position: center top;
  }

  &.cold {
    background-image: url("../assets/cold-landscape.jpg");
    background-position: center 75%;
  }
}
</style>