<template>
  <div class="temperature-view" :style="{ backgroundColor: backgroundColor }">
    <div class="icon-container">
      <div class="icon" :class="{ 'tick': isOptimalTemperature, 'cross': !isOptimalTemperature }">
        <div class="inner-icon"></div>
      </div>
    </div>
    <div class="temp-text">Temp</div>
    <div class="temperature-info">
      <div class="temperature">
        <div class="temp-value">{{ temperature }}°C</div>
        <div class="temp-value">{{ fahrenheit }}°F</div>
      </div>
      <div class="status">{{ temperatureStatus }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temperature: null,
      isOptimalTemperature: false,
      backgroundColor: '',
      temperatureStatus: '',
      fahrenheit: null
    };
  },
  mounted() {
    // Simulate reading temperature value from IoT device
    this.readTemperatureValue();
  },
  methods: {
    readTemperatureValue() {
      // Simulate reading temperature value from IoT device (replace with actual implementation)
      // For demonstration purposes, generating a random temperature value between 1 and 100
      const temperatureValue = Math.floor(Math.random() * 100) + 1;
      this.temperature = temperatureValue;

      // Determine background color and temperature status based on temperature value
      if (temperatureValue <= 50) {
        this.backgroundColor = '#2BBA4E'; // Green background for optimal temperature
        this.isOptimalTemperature = true;
        this.temperatureStatus = 'Optimal to go out';
      } else {
        this.backgroundColor = '#9E0000'; // Red background for high temperature
        this.isOptimalTemperature = false;
        this.temperatureStatus = 'Not optimal to go out';
      }

      // Convert Celsius to Fahrenheit
      this.fahrenheit = this.convertToCelsiusToFahrenheit(temperatureValue);
    },
    convertToCelsiusToFahrenheit(celsius) {
      return (celsius * 9/5) + 32;
    }
  }
};
</script>

<style scoped>
.temperature-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #FFFFFF;
}

.icon-container {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.tick::before,
.cross::before {
  font-family: Arial, sans-serif;
  font-size: 48px;
}

.tick::before {
  content: '\2713'; /* Unicode character for check mark */
  color: #2BBA4E; /* Green color */
}

.cross::before {
  content: '\2717'; /* Unicode character for cross mark */
  color: #9E0000; /* Red color */
}

.temp-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.temperature-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temperature {
  display: flex;
  justify-content: space-around;
}

.temp-value {
  font-size: 24px;
}

.status {
  margin-top: 10px;
  font-size: 18px;
  text-align: center;
}
</style>
