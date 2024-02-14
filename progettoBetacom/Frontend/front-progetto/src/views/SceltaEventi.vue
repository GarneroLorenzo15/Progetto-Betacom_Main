<template>
  <div class="about">
    <div class="container my-5">
      <div class="row">
        <h1 class="d-flex justify-content-center">Scegli un Evento</h1>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <!-- <div class="card">
          <div class="card-header">
            <figure>
              <img
                class="w-50 h-50"
                src="https://picsum.photos/200/300"
                alt="immagine evento"
              />
            </figure>
          </div>
          <div class="card-body">
            <h2>Titolo Evento</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
              enim quam necessitatibus tempore qui nemo expedita totam laborum,
              minima tempora possimus corrupti obcaecati ipsum quis,
              perspiciatis modi ex! Sequi, at.
            </p>
          </div>
        </div> -->
      </div>
    </div>
    <div class="w-full h-92 border-nav" style="background-color: white">
      <nav class="row d-flex flex-nowrap justify-content-between">
        <div class="d-flex w-50 justify-content-center">
          <div class="active">
            <router-link to="/"><i class="bi bi-house-fill"></i></router-link>
          </div>
        </div>
        <div class="d-flex w-50 justify-content-center">
          <div>
            <router-link to="/"><i class="bi bi-person"></i></router-link>
          </div>
        </div>
      </nav>
      <div class="row mt-2">
        <p class="d-flex justify-content-center">Powered by Lorenzo Garnero</p>
      </div>
    </div>
  </div>
</template>

<script></script>

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
</style>
