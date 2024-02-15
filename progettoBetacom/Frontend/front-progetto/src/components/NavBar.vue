<template>
  <div class="w-full h-92 border-nav" style="background-color: white">
    <nav class="row d-flex flex-nowrap justify-content-between">
      <div class="d-flex w-50 justify-content-center">
        <div class="active">
          <router-link to="/eventi">
            <i class="bi bi-house-fill"></i>
          </router-link>
        </div>
      </div>
      <div class="d-flex w-50 justify-content-center">
        <div>
          <router-link to="/profilo"><i class="bi bi-person"></i></router-link>
        </div>
      </div>
    </nav>
    <div class="row mt-2">
      <p class="d-flex justify-content-center">Powered by Lorenzo Garnero</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped></style>
