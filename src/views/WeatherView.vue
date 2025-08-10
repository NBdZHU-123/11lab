<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Search
        </button>
        <br>
        <br>
        Please implement "Search Weather by City".
      </div>
    </div>
  </div>
  
  <main>
    <div v-if="weatherData">
      <h2>
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script>
// The info section in 10.1.1 provided detailed information about this package 
import axios from "axios";

// NOTE: You need to replace "YOUR_API_KEY_HERE" with your actual API key
const apikey = "5da62d15b226e403205877ef9fcef6c3";

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  // computed is a property that is used to define a property that 
  // is dependent on other data properties. 
  // If we using a more easy to understand words to understand the concept: 
  // the derived value such as temperature automatically update when the relevant value change.
  computed: {
    // There are multiple way to obtain the data in Celsius format.
    // Calculation by yourself like below after data is retireved or via API parameters
    
    // Example of adding additional units requirement, if you choose this, remember to change section 3.1
    // https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    // Get the current weather icon using the API link
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  // There are two steps involved in this, 
  // step 1: identify current location 
  // step 2: after identify, get the weather data straight based on the current location.
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    // Async in a easy to understand way means the method will run in backend thread, 
    // And it won't occupy the main thread, so the user experience is still smooth
    async fetchCurrentLocationWeather() {
      // The navigator.geolocation object is part of the Web API provided by modern web browsers
      // Please note this function is not belongs to Vue or openweather.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // API link to obtain the current weather based on the current location browser identified 
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          // await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url);
        });
      }
    },
    async searchByCity() {
      if (this.city.trim() === "") return;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
      await this.fetchWeatherData(url);
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        // Returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weatherData = null; // Clear old data on error
      }
    }
  }
};
</script>

<style scoped>
/* You can add CSS styling here if needed */
</style>