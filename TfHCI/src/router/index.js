import { createRouter, createWebHistory } from 'vue-router'
import TemperaturePage from '../views/TemperaturePage.vue';
import Home from '../views/Home.vue'
import phView from '../views/phView.vue';
import Section2 from '../views/phView.vue';
import Section3 from '../views/Section3.vue';
import Section4 from '../views/Section4.vue';

const routes = [
  { path: '/', component: Home }, // Define a route for the Home component
  { path: '/section1', component: TemperaturePage }, // Route section 1 to the TemperaturePage component
  {path: '/section2', component: phView},
  {path: '/section4',component: Section4},
  {path: '/section3',component: Section3}
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;