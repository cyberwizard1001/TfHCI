<template>
  <div class="ph-view" :style="{ backgroundColor: backgroundColor }">
    <!-- Display check or cross mark -->
    <div class="icon-container">
      <div class="icon" :class="{ 'tick': isOptimalpH, 'cross': !isOptimalpH }">
        <div class="inner-icon"></div>
      </div>
    </div>
    
    <!-- Display pH info inside rounded rectangle -->
    <div class="ph-info-container">
      <div class="ph-info-box">
        <div class="ph-heading">pH</div>
        <div class="ph-value">{{ phValue }}</div>
      </div>
    </div>
    
    <!-- Display pH status -->
    <div class="status">{{ pHStatus }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phValue: null,
      soilType: null,
      isOptimalpH: false, // Flag to indicate if pH is optimal
      backgroundColor: '', // Initialize background color
      pHStatus: ''
    };
  },
  mounted() {
    this.fetchPhData();
  },
  methods: {
    async fetchPhData() {
      try {
        const response = await fetch('http://localhost:3000/ph');
        const data = await response.json();
        this.phValue = Math.round(data.phLevel / 100); // Divide by 100 and round to nearest integer
        this.soilType = data.soilType;
        // Set background color based on pH value
        this.getBackgroundColor(this.phValue);
        // Set pH status based on pH value
        this.setPhStatus(this.phValue);
      } catch (error) {
        console.error('Failed to fetch pH data:', error);
      }
    },
    getBackgroundColor(phValue) {
      // Determine background color based on pH value
      if (phValue >= 6 && phValue <= 9) {
        this.backgroundColor = '#2BBA4E'; // Green for optimal pH
      } else {
        this.backgroundColor = '#9E0000'; // Red for non-optimal pH
      }
    },
    setPhStatus(phValue) {
      // Set pH status based on pH value
      if (phValue >= 6 && phValue <= 9) {
        this.pHStatus = 'Optimal pH for crop growth';
        this.isOptimalpH = true;
      } else {
        this.pHStatus = 'Non-optimal pH for crop growth';
        this.isOptimalpH = false;
      }
    }
  }
};
</script>

<style scoped>

.ph-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

.ph-info-container {
  margin-top: 20px;
}


.ph-info-box {
  width: 100px; /* Adjust width as needed */
  padding: 10px;
  border-radius: 10px;
  border: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ph-heading {
  font-size: 24px;
  text-align: center;
  color: white; /* Make heading text white */
}

.ph-value {
  font-size: 36px; /* Increase font size of pH value */
  text-align: center;
  color: white; /* Make pH value text white */
}

.status {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: white; /* Make status text white */
}
</style>
