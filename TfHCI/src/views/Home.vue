<template>
    <div id="home">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="section"
        :class="{ active: index === activeSectionIndex }"
        :style="{ backgroundColor: section.color, gridColumn: section.grid[1] + 1, gridRow: section.grid[0] + 1 }"
      >
        Section {{ index + 1 }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeSectionIndex: 0, // Track the active section index
        sections: [ // Define sections with background colors and grid positions
          { color: 'red', grid: [0, 0] },
          { color: 'blue', grid: [0, 1] },
          { color: 'green', grid: [1, 0] },
          { color: 'orange', grid: [1, 1] }
        ],
        gridColumns: 2, // Number of columns in the grid layout
        gridRows: 2 // Number of rows in the grid layout
      };
    },
    mounted() {
      // Add event listener for keydown event
      window.addEventListener('keydown', this.handleKeyPress);
    },
    beforeUnmount() {
      // Remove event listener when component is unmounted
      window.removeEventListener('keydown', this.handleKeyPress);
    },
    methods: {
      handleKeyPress(event) {
        // Disable default behavior for arrow keys and Enter key
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key)) {
          event.preventDefault();
        }
  
        // Get active section grid position
        const [row, col] = this.sections[this.activeSectionIndex].grid;
  
        // Adjust active section grid position based on key pressed
        switch (event.key) {
          case 'ArrowUp':
            this.moveSection(row - 1, col);
            break;
          case 'ArrowDown':
            this.moveSection(row + 1, col);
            break;
          case 'ArrowLeft':
            this.moveSection(row, col - 1);
            break;
          case 'ArrowRight':
            this.moveSection(row, col + 1);
            break;
          case 'Enter':
            // Navigate to the corresponding section when Enter is pressed
            this.$router.push(`/section${this.activeSectionIndex + 1}`);
            break;
          default:
            break;
        }
      },
      moveSection(row, col) {
        // Check if the new position is within the grid boundaries
        if (row >= 0 && row < this.gridRows && col >= 0 && col < this.gridColumns) {
          // Find the section index corresponding to the new grid position
          const newIndex = this.sections.findIndex(section => section.grid[0] === row && section.grid[1] === col);
          if (newIndex !== -1) {
            this.activeSectionIndex = newIndex;
          }
        }
      }
    }
  };
  </script>
  
  <style>
  #home {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  
  .section {
    height: calc(50vh - 10px); /* Adjust height of sections */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .section.active {
    border: 2px solid white;
  }
  </style>
  