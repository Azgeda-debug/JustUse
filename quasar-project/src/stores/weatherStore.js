import { defineStore } from 'pinia';
import { ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar';

export const useWeatherStore = defineStore('weatherStore', () => {

  const $q = useQuasar()

  const apiKey = 'a1b2343c236570d24ac127150004c7a3'

  const weatherDetails = ref({})
  const nextDaysWeatherDetails = ref({})
  const loadingWeather = ref(false)

  const searchWeatherInput = ref('')
  const searchWeather = async () => {
    const forecastApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchWeatherInput.value}&appid=${apiKey}&units=metric`
    await axios.get(forecastApiLink).then(res => {
      if (res.status == 200) {
        weatherDetails.value = res.data
      }
    }).catch(err => {
      $q.notify({
        type: 'negative',
        message: 'Something went wrong. Try again.'
      })
    })

    const forecastHourlyApiLink = `http://api.openweathermap.org/data/2.5/forecast?q=${searchWeatherInput.value}&appid=${apiKey}&units=metric`
    await axios.get(forecastHourlyApiLink).then(res => {
      nextDaysWeatherDetails.value = res.data
    }).catch(err => {
      $q.notify({
        type: 'negative',
        message: 'Something went wrong. Try again.'
      })
    })

    searchWeatherInput.value = ''
  }

  const getLocation = () => {
    loadingWeather.value = true
    navigator.geolocation.getCurrentPosition(getPosition)
  }

  const getPosition = async (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const forecastApiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

    await axios.get(forecastApiLink).then(res => {
      if (res.status == 200) {
        weatherDetails.value = res.data
        loadingWeather.value = false
      }
    }).catch(err => {
      $q.notify({
        type: 'negative',
        message: 'Something went wrong. Try again.'
      })
    })

    const forecastHourlyApiLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    await axios.get(forecastHourlyApiLink).then(res => {
      nextDaysWeatherDetails.value = res.data
    }).catch(err => {
      $q.notify({
        type: 'negative',
        message: 'Something went wrong. Try again.'
      })
    })
  }

  return {
    nextDaysWeatherDetails,
    searchWeatherInput,
    weatherDetails,
    loadingWeather,
    searchWeather,
    getLocation,
  }
});
