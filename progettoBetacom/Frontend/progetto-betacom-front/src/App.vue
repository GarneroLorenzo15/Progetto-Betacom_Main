<template>
  <div class="w-full flex items-center">
    <img class="flex justify-center" alt="Vue logo" src="./assets/logo.png">
  </div>

  <nav>
    <router-link to="/"><HelloWorld msg="checked"/>Hello Word</router-link>
<!--   -->  </nav>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import '@/assets/css/app.css';
/* import SecondPage from './components/SecondPage.vue'; */


export default {
  name: 'App',
  components: {
    HelloWorld,
    /* SecondPage */
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
