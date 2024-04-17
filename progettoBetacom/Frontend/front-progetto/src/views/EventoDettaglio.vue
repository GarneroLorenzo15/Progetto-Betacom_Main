<template>
  <!-- eslint-disable -->
  <div class="bg-white">
    <img class="w-full" :src="eventDetails[0].immagine_evento" alt="immagine evento" />
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="row mt-1">
          <div class="row d-flex justify-content-beween flex-nowrap my-2">
            <div class="d-flex w-50">
              <h5 class="d-felx text-center spaces">
                {{ eventDetails[0].titolo }}
              </h5>
            </div>
            <div class="d-flex justify-content-end w-50" v-if="this.admin == 1">
              <p @click="eventDeleteConfirm()">❌</p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-flex justify-content-end">
              <router-link :to="'/calendar/' + this.$route.params.id">
                <div>
                  Seleziona Data
                  <i class="ms-1 bi bi-calendar-event-fill calendar "></i>
                </div>
              </router-link>
            </div>
          </div>
          <!-- <div class="row w-full d-flex justify-content-center">
            <div class="w-full"> -->
          <p class="text-justify">
            {{ eventDetails[0].descrizione }}
          </p>
          <p class="mb-3">Per maggiori info sul posto clicca <a :href="eventDetails[0].luogo">qui</a></p>
          <!--  </div>
          </div> -->
        </div>
      </div>
      <div class="w-full d-flex justify-content-center align-items-center">
        <div>
          <button @click="addVotoFromApi()">
            VOTA EVENTO
          </button>
        </div>
        <div>
          <router-link :to="'/risultatosondaggi/' + this.$route.params.id">
            <i class="bi bi-bar-chart-line-fill"></i>
          </router-link>
        </div>
        <div class="mb-20"></div>
      </div>
    </div>
    <NavBarBlue></NavBarBlue>
  </div>
</template>

<script>
/*eslint-disable*/
import NavBarBlue from "@/components/NavBarBlue.vue";
import apiService from "@/services/apiService";
import Swal from 'sweetalert2';
import moment from "moment";

export default {
  name: "EventoDetaglio",
  components: {
    NavBarBlue,
  },
  data() {
    return {
      eventDetails: [{}],
      eventDay: "",
      admin: localStorage.getItem('admin'),
      utente: localStorage.getItem('utente'),
      infoVoti: {
        id_Utente: localStorage.getItem('utente'),
        id_Evento: this.$route.params.id,
      },
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchEventsDetailsFromApi(id);
    console.log(this.utente, this.$route.params.id);
  },
  methods: {
    async fetchEventsDetailsFromApi(id) {
      try {
        const response = await apiService.fetchEventDetails(id);
        this.eventDetails = response.data;
        const eventData = moment(this.eventDetails[0].data);
        this.eventDay = eventData.format("DD/MM/YYYY");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEventFromApi() {
      try {
        const response = await apiService.deleteEvent(this.eventDetails[0].id_Evento);
        this.items = response.data;
        this.$router.push("/eventi");
      } catch (error) {
        console.log(error);
      }
    },
    async addVotoFromApi() {
      try {
        const response = await apiService.addVoti(this.infoVoti);
        const data = response.data;
        this.confirmVoto()
      } catch (error) {
        console.log(error);
      }
    },
    confirmVoto() {
      Swal.fire({
        title: 'Hai votato!',
        text: 'Il voto è stato registrato con successo',
        icon: 'success',
        confirmButtonText: 'Chiudi',
        confirmButtonColor: '#034ea1',
      })
    },
    eventDeleteConfirm() {
      Swal.fire({
        title: 'Sei sicuro di voler eliminare questo evento?',
        text: "Questa azione non può essere annullata!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#034ea1',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sì, elimina!',
        cancelButtonText: 'Annulla'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEventFromApi();
          Swal.fire({
            icon: 'error',
            title: 'Evento eliminato con successo',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }

  },
};
</script>

<style scoped>
.w-full {
  width: 100%;
}
@media (min-width: 992px) {
  .w-lg-40 {
    width: 40%;
  }

  img{
    height: 20rem;
    image-rendering: optimizeQuality;
    object-fit: cover;
  }
}

.bg-white {
  background-color: white;
  height: 100vh;
}

.mr-5 {
  margin-right: 5rem;
}

.mb-20 {
  margin-bottom: 20rem;
}

.mb-30 {
  margin-bottom: 30rem;
}

.mb-2 {
  margin-bottom: 2rem;
}

.spaces {
  white-space: nowrap;
}

button {
  background-color: #034ea1;
  color: white;
  font-weight: bold;
  font-size: large;
  border-radius: 25px;
}

.calendar {
  font-size: medium;
  color: #034ea1;
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
  background-color: orange;
}

.text-justify {
  text-align: justify;
}

img {
  border-radius: 0 0 25px 25px;
}

i {
  color: #F38120;
}
</style>
