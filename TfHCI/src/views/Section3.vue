<template>
    <div class="section" id="section3">
      Section 3
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.$emit('show-notification', 'Section 3 selected');
    }
  };
  </script>
  
  <style scoped>
  .section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2rem;
    background-image: url('https://via.placeholder.com/1920x1080?text=Section+1');
    background-size: cover;
    background-position: center;
  }
  </style>
  