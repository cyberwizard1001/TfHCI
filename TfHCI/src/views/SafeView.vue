<template>
    <div class="safe-view">
      <div class="success-symbol">✔️</div>
      <div class="text-container">
        <div class="safe-text">SAFE</div>
        <div class="safe-message">All clear, no danger detected.</div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .safe-view {
    width: 100vw;
    height: 100vh;
    background-color: #2BBA4E; /* Green background color */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .success-symbol {
    font-size: 50px;
    color: #FFFFFF; /* White color for success symbol */
    margin-bottom: 20px;
  }
  
  .safe-text {
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
  }
  
  .safe-message {
    font-size: 18px;
    color: white;
    text-align: center;
  }
  </style>
  