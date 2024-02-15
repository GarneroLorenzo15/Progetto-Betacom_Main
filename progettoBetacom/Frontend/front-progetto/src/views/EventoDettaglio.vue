<template>
  <div class="bg-white py-5">
    <div class="container my-5">
      <div class="row">
        <figure>
          <img :src="eventDetails[0].immagine_Evento" alt="immagine evento" />
        </figure>
        <h2>{{ eventDetails[0].titolo }}</h2>
        <p>
          {{ eventDetails[0].descrizione }}
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
import apiService from "@/services/apiService";

export default {
  name: "EventoDetaglio",
  components: {
    NavBarBlue,
  },
  data() {
    return {
      eventDetails: [{}],
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
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
.bg-white {
  background-color: white;
  height: 100vh;
}
</style>
