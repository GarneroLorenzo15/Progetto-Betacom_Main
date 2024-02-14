<template>
  <div class="bg-white py-5">
    <div class="container my-5">
      <div class="row">
        <figure>
          <img src="" alt="immagine evento" />
        </figure>
        <h2>TITOLO EVENTO</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          nesciunt voluptatem maxime molestias distinctio deleniti laborum harum
          explicabo voluptates aut! Quas, nobis eos unde earum recusandae
          facilis soluta ullam perspiciatis.
        </p>
      </div>
      <div class="d-flex justify-content-center">
        <div class="row"><button>VOTA EVENTO</button></div>
      </div>
    </div>
    <NavBarBlue></NavBarBlue>
  </div>
</template>
<script>
import NavBarBlue from "@/components/NavBarBlue.vue";

export default {
  name: "EventoDetaglio",
  components: {
    NavBarBlue,
  },
};
</script>
<style>
.bg-white {
  background-color: white;
  height: 100vh;
}
</style>
