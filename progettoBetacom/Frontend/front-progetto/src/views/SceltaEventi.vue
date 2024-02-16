<template>
  <!-- eslint-disable -->
  <div class="eventi">
    <div class="h-render">
      <div class="container">
        <div class="">
          <div class="row d-flex justify-content-between flex-nowrap ">
            <!-- Bottone per aprire la modale di aggiunta eventi -->
            <div class="w-50" @click="openModal()" :title="'aggiungi eventi'">
              <i class="bi bi-plus-circle-fill"></i>
            </div>
            <div class="w-50 d-flex justify-content-end mr-5">
              <router-link to="/">
                <i class="bi bi-box-arrow-right colorto"></i>
              </router-link>
            </div>
          </div>
        </div>
        <div class="row my-3">
          <h1 class="d-flex justify-content-center">Scegli un Evento</h1>
        </div>
      </div>
      <div class="container mt-5" v-for="item in items" :key="item.id">
        <div class="d-flex justify-content-center">
          <div class="card">
            <img :src="item.immagine_evento" class="card-img-top" alt="immagine" />
            <div class="card-body">
              <h5 class="card-title">{{ item.titolo }}</h5>
              <div class="d-flex justify-content-end">
                <div class="row">
                  <router-link :to="'/eventi/' + item.id_Evento">
                    <button class="">VEDI DETTAGLIO</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal per aggiungere un nuovo evento -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Aggiungi Evento</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addEventsFromApi()">
              <!-- aggiungi id_Evento che valga uno in più rispetto al più grande già presente -->
              <input type="text" v-model="newEvent.titolo" placeholder="Titolo dell'evento" required>
              <input type="date" v-model="newEvent.data" required>
              <textarea v-model="newEvent.descrizione" placeholder="Descrizione dell'evento"></textarea>
              <input type="text" v-model="newEvent.luogo" placeholder="URL Luogo dell'evento">
              <input type="text" v-model="newEvent.immagine_evento" placeholder="URL dell'immagine dell'evento">
              <button type="submit" class="btn btn-primary">Aggiungi evento</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script>
/*eslint-disable*/
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
      newEvent: {
        id_Evento: "",
        titolo: "",
        data: "",
        descrizione: "",
        luogo: "",
        immagine_evento: "",
      }
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

    async addEventsFromApi() {
      try {

        //Gen maxID
        const maxID = Math.max(...this.items.map(item => item.id_Evento));
        this.newEvent.id_Evento = maxID + 1;
 
        const response = await apiService.addEvents();
        console.log('qui');
        const nuovoEvento = response.data;
        this.newEvent = {
          id_Evento: "",
          titolo: "",
          data: "",
          descrizione: "",
          luogo: "",
          immagine_evento: "",
        }
        this.items.push(nuovoEvento);
        console.log(this.items);

        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },

    openModal() {
      const modal = document.getElementById('exampleModal');

      if(modal){
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    },

    closeModal() {
      const modal = document.getElementById('exampleModal');

      if(modal){
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    },
  },

};
</script>

<style scoped>
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.h-render {
  height: auto;
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
  height: 2px;
  /* Puoi regolare l'altezza della linea */
  background-color: orange;
  /* Colore arancione */
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

.mr-5 {
  margin-right: 5rem;
}

img {
  border-radius: 25px;
}

.container:last-of-type {
  margin-bottom: 10rem;
}</style>
