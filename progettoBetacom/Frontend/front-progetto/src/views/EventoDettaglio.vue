<template>
  <!-- eslint-disable -->
  <div class="bg-white">
    <img class="w-full" :src="eventDetails[0].immagine_evento" alt="immagine evento" />
    <div class="container">
      <div class="row">
        <div class="row">
          <div class="d-flex justify-content-end flex-nowrap">
            <div class="w-50 d-flex justify-content-end align-items-center">
              <div class="mx-2">
                {{ eventDay }}
              </div>
            </div>
            <i class="bi bi-calendar-event-fill calendar"></i>
          </div>
        </div>
        <div class="row">
          <h2>{{ eventDetails[0].titolo }}</h2>
          <p class="text-justify">
            {{ eventDetails[0].descrizione }}
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="row"><button>VOTA EVENTO</button></div>
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
    };
  },
  mounted() {
    const id = this.$route.params.id;
    console.log(id);
    this.fetchEventsDetailsFromApi(id);
  },
  methods: {
    async fetchEventsDetailsFromApi(id) {
      try {
        const response = await apiService.fetchEventDetails(id);
        console.log(response.data);
        this.eventDetails = response.data;
        const eventData = moment(this.eventDetails[0].data);
        this.eventDay = eventData.format("DD/MM/YYYY");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.bg-white {
  background-color: white;
  height: 100vh;
}

button {
  background-color: #034ea1;
  color: white;
  font-weight: bold;
  font-size: large;
  border-radius: 25px;
}

.calendar {
  font-size: smaller;
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
