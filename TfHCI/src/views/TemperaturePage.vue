<template>
  <div class="temperature-view" :style="{ backgroundColor: backgroundColor }">
    <div class="icon-container">
      <div class="icon" :class="{ 'tick': isOptimalTemperature, 'cross': !isOptimalTemperature }">
        <div class="inner-icon"></div>
      </div>
    </div>
    <div class="temperature-info">
      <div class="temperature-values">
        <div class="temperature-box">
          <div class="temp-text">Temp (Celsius)</div>
          <div class="temp-value">{{ temperature }}°C</div>
        </div>
        <div class="temperature-box">
          <div class="temp-text">Temp (Fahrenheit)</div>
          <div class="temp-value">{{ fahrenheit }}°F</div>
        </div>
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
    this.fetchTemperatureData();
    this.getBackgroundColor();
  },
  methods: {
    async fetchTemperatureData() {
      try {
        const response = await fetch('http://localhost:3000/temperature');
        const data = await response.json();
        this.temperature = data.temperature;
        this.fahrenheit = this.celsiusToFahrenheit(this.temperature); // Convert Celsius to Fahrenheit
        // Set background color based on temperature value
        this.backgroundColor = this.getBackgroundColor(this.temperature);
        // Update icon and status based on temperature value
        this.updateIconAndStatus();
      } catch (error) {
        console.error('Failed to fetch temperature data:', error);
      }
    },
    getBackgroundColor(temperature) {
      // Determine background color based on temperature value
      if (temperature >= 1 && temperature <= 50) {
        return '#2BBA4E'; // Green for optimal temperature
      } else if (temperature > 50) {
        return '#9E0000'; // Red for high temperature
      } else {
        return ''; // Default background color
      }
    },
    updateIconAndStatus() {
      // Update icon and status based on temperature value
      if (this.temperature >= 1 && this.temperature <= 50) {
        this.isOptimalTemperature = true;
        this.temperatureStatus = 'Optimal temperature for going out';
      } else {
        this.isOptimalTemperature = false;
        this.temperatureStatus = 'Non-optimal temperature for going out';
      }
    },
    celsiusToFahrenheit(celsius) {
      // Convert Celsius to Fahrenheit
      return (celsius * 9 / 5) + 32;
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
  color: white;
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
  display: flex;
  justify-content: center;
  align-items: center; /* Ensure vertical and horizontal alignment */
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

.temperature-values {
  display: flex;
  flex-wrap: wrap;
}

.temperature-box {
  width: 200px;
  border: 2px solid #FFFFFF;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
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
