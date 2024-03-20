<template>
  <div>
    <component :is="currentPage" />
  </div>
</template>

<script>
import SafeView from './SafeView.vue'; // Import the SafeView component
import DangerView from './DangerView.vue'; // Import the DangerView component

export default {
  data() {
    return {
      noiseLevel: null,
      currentPage: 'SafeView' // Define currentPage property
    };
  },
  mounted() {
    this.fetchNoiseLevel();
  },
  methods: {
    async fetchNoiseLevel() {
      try {
        const response = await fetch('http://localhost:3000/noise');
        const data = await response.json();
        this.noiseLevel = data.noiseLevel;

        // Determine which page to display based on noise level
        if (this.noiseLevel > 50) {
          this.currentPage = 'DangerView'; // Display DangerView if noise level is high
        } else {
          this.currentPage = 'SafeView'; // Display SafeView if noise level is low
        }
      } catch (error) {
        console.error('Failed to fetch noise level:', error);
      }
    }
  },
  components: {
    SafeView, // Register the SafeView component
    DangerView // Register the DangerView component
  }
};
</script>
