<template>
  <div class="ph-view" :style="{ backgroundColor: backgroundColor }">
    <div class="icon-container">
      <div class="icon" :class="{ 'tick': isGoodForCrops, 'cross': !isGoodForCrops }">
        <div class="inner-icon"></div>
      </div>
    </div>
    <div class="info-container">
      <div class="info">
        <div class="label">pH</div>
        <div class="value">{{ pHValue }}</div>
      </div>
      <div class="info">
        <div class="label">Soil Type</div>
        <div class="value">{{ soilType }}</div>
      </div>
    </div>
    <div class="status">{{ soilStatus }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pHValue: null,
      backgroundColor: '',
      isGoodForCrops: false,
      soilType: '',
      soilStatus: ''
    };
  },
  mounted() {
    // Simulate reading pH value from IoT device
    this.readpHValue();
  },
  methods: {
    readpHValue() {
      // Simulate reading pH value from IoT device (replace with actual implementation)
      // For demonstration purposes, generating a random pH value between 0 and 14
      const pHValue = Math.floor(Math.random() * 15);
      this.pHValue = pHValue;

      // Determine background color and soil type based on pH value
      if (pHValue >= 6 && pHValue <= 9) {
        this.backgroundColor = '#2BBA4E'; // Green background for pH between 6 and 9
        this.isGoodForCrops = true;
        this.soilType = 'Neutral';
        this.soilStatus = 'Good for growing crops';
      } else {
        this.backgroundColor = '#9E0000'; // Red background for pH below 6 or above 9
        this.isGoodForCrops = false;
        this.soilType = pHValue < 6 ? 'Acidic' : 'Alkali';
        this.soilStatus = 'Not good for growing crops';
      }
    }
  }
};
</script>

<style scoped>
.ph-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
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

.info-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.info {
  text-align: center;
}

.label {
  font-size: 18px;
}

.value {
  font-size: 24px;
}

.status {
  margin-top: 20px;
  font-size: 18px;
}
</style>
