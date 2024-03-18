<template>
  <div class="sound-alert" :style="{ backgroundColor: backgroundColor }">
    <div class="icon-container">
      <div class="alert-icon">
        <div class="inner-icon"></div>
      </div>
      <div class="alert-text">DANGER!!</div>
      <div class="sub-text">Loud sound detected nearby</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: ''
    };
  },
  mounted() {
    // Simulate reading sound frequency value from IoT device
    this.readSoundFrequency();
  },
  methods: {
    readSoundFrequency() {
      // Simulate reading sound frequency value from IoT device (replace with actual implementation)
      // For demonstration purposes, generating a random sound frequency value between 0 and 100
      const soundFrequency = Math.floor(Math.random() * 101);
      
      // Determine background color based on sound frequency value
      if (soundFrequency > 50) {
        this.backgroundColor = '#9E0000'; // Red background for loud sound detected
      } else {
        this.backgroundColor = ''; // Default background color
      }
    }
  }
};
</script>

<style scoped>
.sound-alert {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.icon-container {
  text-align: center;
}

.alert-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #F7BF26; /* Yellow color for alert icon */
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #FFFFFF; /* White color for inner circle of alert icon */
}

.alert-text {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.sub-text {
  margin-top: 10px;
  font-size: 18px;
  color: white;
}
</style>

