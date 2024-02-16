<template>
  <!--eslint-disable-->
  <div class="w-full h-92 border-nav " style="background-color: white">
    <nav class="row d-flex flex-nowrap justify-content-between">
      <div class="d-flex w-50 justify-content-center">
          <router-link to="/eventi" @click="currentTab = 'eventi'">
            <div :class="{ active: currentTab === 'eventi' }">
              <i class="bi bi-house-fill"></i>
            </div>
          </router-link>
      </div>
      <div class="d-flex w-50 justify-content-center">
          <router-link to="/profilo" @click="  currentTab = 'profilo'">
            <div :class="{ active: currentTab === 'profilo' }">
              <i class="bi bi-person"></i>
            </div>
          </router-link>
      </div>
    </nav>
    <div class="row my-1">
      <p class="d-flex justify-content-center ">
        Powered by Lorenzo Garnero
      </p>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "NavBar",
  data(){
    return{
      currentTab: "eventi",
    };
  },
  /* methods: {
    setCurrentTab(tab) {
      this.currentTab = tab;
    }
  } */
};
</script>

<style scoped>
.active {
  position: relative;
}

.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px; 
  background-color: #f38120; 
}
.mt-5{
  margin-top: 20rem;
}
</style>
