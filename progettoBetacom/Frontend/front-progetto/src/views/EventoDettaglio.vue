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
              <p @click="deleteEventFromApi()">❌</p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-flex justify-content-end flex-nowrap">
              <div class="w-50 d-flex justify-content-end align-items-center">
                <div class="mx-2">
                  Seleziona Data
                </div>
              </div>
              <router-link :to="'/calendar/' + this.$route.params.id">
                <i class="bi bi-calendar-event-fill calendar"></i>
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
          <button @click="addVotoFromApi()" :disabled="this.votoGiaInviato == true">
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
      votoGiaInviato: false,
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.w-full {
  width: 100%;
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
