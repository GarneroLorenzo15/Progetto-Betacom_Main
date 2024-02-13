<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <h1 class="d-flex justify-content-center my-5">Esegui Il Login</h1>
      </div>
    </div>
    <div class="container">
      <div class="row w-full" style="height: 200px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-person w-full"
          style="height: 100%, color: #d9d9d9"
        >
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
          />
        </svg>
      </div>
    </div>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div>
          <input class="w-full mb-3" type="text" />
          <input class="w-full mb-3" type="text" />
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div class="row" style="width: 50%">
        <button class="w-full mb-3">
          <router-link to="/eventi">Login</router-link>
        </button>
      </div>
    </div>
    <div class="container d-flex justify-content-center text-white">
      <div class="row">
        <p>Powered by Lorenzo Garnero</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-full {
  width: 100%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
