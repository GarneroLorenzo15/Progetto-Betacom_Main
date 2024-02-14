<template>
  <div class="eventi">
    <div class="container">
      <div class="d-flex justify-content-end mr-5">
        <div class="row">
          <router-link to="/">
            <i class="bi bi-box-arrow-right colorto"></i>
          </router-link>
        </div>
      </div>
      <div class="row my-3">
        <h1 class="d-flex justify-content-center">Scegli un Evento</h1>
      </div>
    </div>
    <div class="container mt-5" v-for="item in items" :key="item.id">
      <div class="d-flex justify-content-center">
        <div class="card">
          <img
            :src="item.immagine_evento"
            class="card-img-top"
            alt="immagine"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.titolo }}</h5>
            <div class="d-flex justify-content-end">
              <div class="row">
                <router-link to="/evento">
                  <button class="">VEDI DETTAGLIO</button>
                </router-link>
              </div>
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
import apiService from "../services/apiService.js";

export default {
  name: "SceltaEventi",
  components: {
    NavBar,
  },
  data() {
    return {
      items: [],
      /* console: console.log(this.items), */
    };
  },
  mounted() {
    this.fetchEventsFromApi();
  },
  methods: {
    async fetchEventsFromApi() {
      try {
        const response = await apiService.fetchEvents();
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
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
  background-color: #034ea1;
  color: white;
  font-weight: bold;
  font-size: large;
  border-radius: 25px;
}
.card {
  width: 75%;
  height: auto;
  border-radius: 25px;
}
.card-header {
  border-radius: 25px;
  width: 100%;
  height: 50%;
}
.colorto {
  color: black;
}
</style>
