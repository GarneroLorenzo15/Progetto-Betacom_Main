/* import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
 */
// main.js
import Vue from 'vue';
import App from './App.vue';
import './index.css'; // Importa il file CSS di Tailwind
import './assets/tailwind.css'

new Vue({
/**
 * Renders the root component of the application to the DOM.
 * @param {object} h - the Vue.js render function
 * @returns {VNode} the root component of the application
 */
  render: h => h(App),
}).$mount('#app');
