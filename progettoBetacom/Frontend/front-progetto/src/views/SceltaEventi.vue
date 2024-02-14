<template>
  <div class="eventi">
    <div class="container my-5">
      <div class="row">
        <h1 class="d-flex justify-content-center">Scegli un Evento</h1>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="card">
          <div class="card-header">
            <figure>
              <img class="w-full h-50" src="" alt="immagine evento" />
            </figure>
          </div>
          <div class="card-body">
            <div class="row">
              <h2>Titolo Evento</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellat enim quam necessitatibus tempore qui nemo expedita
                expedita totam laborum, minima tempora possimus corrupti
                obcaecati ipsum perspiciatis modi ex! Sequi, at.
              </p>
            </div>
            <div class="row">
              <router-link to="/evento">
                <button>VEDI DETTAGLIO</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "SceltaEventi",
  components: {
    NavBar,
  },
};
</script>

<style>
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.w-50 {
  width: 50%;
}
.h-50 {
  height: 50%;
}
.h-92 {
  height: 100px;
}
.border-nav {
  border-radius: 25px 25px 0 0;
  position: fixed;
  bottom: 0;
}
i {
  font-size: 45px;
}
.active {
  position: relative;
}

.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px; /* Puoi regolare l'altezza della linea */
  background-color: orange; /* Colore arancione */
}
.object-contain {
  width: 100%;
  height: 100%;
}
button {
  background-color: blue;
  color: white;
  font-weight: bold;
  font-size: large;
  border-radius: 25px;
}
</style>
