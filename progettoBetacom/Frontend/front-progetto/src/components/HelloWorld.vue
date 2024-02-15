<template>
  <!-- eslint-disable -->
  <div class="hello">
    <div class="container my-5">
      <div class="row">
        <h1 class="d-flex justify-content-center">Esegui Il Login</h1>
      </div>
    </div>
    <div class="container">
      <div class="row" style="height: 200px">
        <figure class="w-full d-flex justify-content-center align-items-center">
          <i class="bi bi-person"></i>
        </figure>
      </div>
    </div>
    <div class="container my-5">
      <div class="row d-flex justify-content-center">
        <div>
          <input
            class="w-full mb-3"
            type="text"
            placeholder="  inserici email..."
          />
          <input
            class="w-full mb-3"
            type="text"
            placeholder="  inserici password(cognome in minuscolo)..."
          />
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div class="row" style="width: 50%">
        <router-link to="/eventi">
          <button class="w-full mb-3">LOGIN</button>
        </router-link>
      </div>
    </div>
    <div class="container my-5 d-flex justify-content-center text-white">
      <div class="row">
        <p>Powered by Lorenzo Garnero</p>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-full {
  width: 100%;
}
button,
input {
  border-radius: 25px;
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
  color: #f38120;
}
i {
  color: #d9d9d9;
  font-size: 10rem;
}
</style>
