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
          <div class="row">
            <div class="d-flex justify-content-end flex-nowrap">
              <div class="w-50 d-flex justify-content-end align-items-center">
                <!-- <div class="mx-2">
                  {{ eventDay }}
                </div> -->
              </div>
              <router-link to="/calendar">
                <i class="bi bi-calendar-event-fill calendar"></i>
              </router-link>
            </div>
          </div>
          <p class="text-justify">
            {{ eventDetails[0].descrizione }}
          </p>
          <p class="mb-3">Per maggiori info sul posto clicca <a :href="eventDetails[0].luogo">qui</a></p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="row mb-20"><button>VOTA EVENTO</button></div>
      </div>
    </div>
    <NavBarBlue></NavBarBlue>
  </div>
</template>
<script>
/*eslint-disable*/
import NavBarBlue from "@/components/NavBarBlue.vue";
import apiService from "@/services/apiService";
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
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchEventsDetailsFromApi(id);
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
  },
};
</script>
<style scoped>
.w-full{
  width: 100%;
}
.bg-white {
  background-color: white;
  height: 100vh;
}

.mr-5{
  margin-right: 5rem;
}
.mb-20 {
  margin-bottom: 20rem;
}

.spaces{
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
</style>
