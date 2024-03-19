<template>
  <div class="danger-view">
    <div class="warning-symbol">⚠️</div>
    <div class="text-container">
      <div class="danger-text">DANGER!!</div>
      <div class="warning-message">Bombing detected, seek shelter!!</div>
    </div>
  </div>
</template>

<style scoped>

template{
  background-color: #9E0000;
  margin: 0;
  height: 100vh;
  width: 100vw;
}

.danger-view {
  width: 100vw;
  height: 100vh;
  background-color: #9E0000; /* Red background color */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.warning-symbol {
  font-size: 50px;
  color: #F7BF26; /* Orange color for warning symbol */
  margin-bottom: 20px;
}

.danger-text {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}

.warning-message {
  font-size: 18px;
  color: white;
  text-align: center;
}
</style>
