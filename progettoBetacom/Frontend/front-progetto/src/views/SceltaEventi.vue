<template>
  <!-- eslint-disable -->
  <div class="eventi">
    <div class="container text-center d-flex justify-content-center flex-wrap">
      <div class="row w-full flex-nowrap align-items-center ">
        <div class="col-6  d-flex justify-content-start">
          <div class="btn" @click="openModal()" :title="'aggiungi eventi'">
            <i class="bi bi-plus-circle-fill"></i>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <div class="d-flex">
            <i class="bi bi-box-arrow-right colorto" @click="logoutConfirm()"></i>
          </div>
        </div>
        <!-- Bottone per aprire la modale di aggiunta eventi -->
      </div>
      <div class="row my-3">
        <h1 class="d-flex w-full justify-content-center">Scegli un Evento</h1>
      </div>
    </div>
    <div class="container-fluid  mt-5 mb-5 mx-auto">
      <div class="row ">
        <div class="col-12 col-sm-6 col-xl-4 justify-content-center" v-for="item in items" :key="item.id">
          <div class="card m-2 mx-auto">
            <img :src="item.immagine_evento" class="img-fluid card-img-top" alt="immagine" />
            <div class="card-body">
              <div class="card-title fs-1">{{ item.titolo }}</div>
              <p class="card-text text-truncate">
                {{ item.descrizione }}
              </p>
              <div class="d-flex justify-content-end">
                <router-link :to="'/eventi/' + item.id_Evento">
                  <button class="">
                    VEDI DETTAGLIO
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- Modal per aggiungere un nuovo evento -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Aggiungi Evento</h5>
            <div type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
              <span aria-hidden="true"><i class="bi bi-x-circle-fill"></i></span>
            </div>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addEventsFromApi()">
              <div class="container">
                <div class="row d-flex justify-content-around flex-wrap m-1">
                  <label for="titolo">Titolo:</label>
                  <input id="titolo" class="mb-2" type="text" v-model="newEvent.titolo" placeholder="Titolo dell'evento"
                    required>
                  <label for="descrizione">Descrizione:</label>
                  <textarea id="descrizione" class="mb-2" v-model="newEvent.descrizione"
                    placeholder="Descrizione dell'evento"></textarea>
                  <label for="luogo">Luogo Evento:</label>
                  <input id="luogo" class="mb-2" type="text" v-model="newEvent.luogo"
                    placeholder="URL Luogo dell'evento">
                  <label for="immagine">Immagine Evento:</label>
                  <input id="immagine" class="mb-2" type="text" v-model="newEvent.immagine_evento"
                    placeholder="URL dell'immagine dell'evento">
                  <button class="my-2" type="submit" @click="closeModal()">Aggiungi evento</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="h-92"></div>
    <NavBar></NavBar>
  </div>
</template>

<script>
/*eslint-disable*/
import NavBar from "@/components/NavBar.vue";
import Swal from 'sweetalert2';
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
        id_Evento: null,
        titolo: "",
        data: "",
        descrizione: "",
        luogo: "",
        immagine_evento: "",
      }
    };
  },
  created() {
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
        const response = await apiService.addEvents(this.newEvent);
        console.log(response.status );
        if(response.status && response.status === 400){
          this.wrondData();
        }
        this.closeModal();
        this.eventAddConfirm();
        window.location.reload();

      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },

    logoutConfirm() {
      Swal.fire({
        title: 'Sei sicuro di voler uscire?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, uscire!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout()
        }
      })
    },

    openModal() {
      const modal = document.getElementById('exampleModal');

      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    },

    closeModal() {
      const modal = document.getElementById('exampleModal');

      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    },
    eventAddConfirm() {
      Swal.fire({
        icon: 'success',
        title: 'Evento aggiunto con successo',
        showConfirmButton: false,
        confirmButtonColor: '#034ea1',
        timer: 1500
      })
    },

    wrondData() {
      Swal.fire({
        icon: 'error',
        title: 'Formato dati non valido',
        showConfirmButton: false,
        confirmButtonColor: '#034ea1',
        timer: 1500
      })
    },

  }
};


</script>

<style scoped>
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

.pr-5 {
  margin-right: 10rem;
}

.border-nav {
  border-radius: 25px 25px 0 0;
  position: fixed;
  bottom: 0;
}

i {
  font-size: 45px;
  cursor: pointer;
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

.container-2:last-of-type {
  margin-bottom: 10rem;
}

h5 {
  font-size: 30px;
}
</style>
