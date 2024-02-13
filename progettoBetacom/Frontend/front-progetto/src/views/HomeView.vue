<template>
  <div class="home">
    <div class="container d-flex justify-content-center">
      <img class="" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
