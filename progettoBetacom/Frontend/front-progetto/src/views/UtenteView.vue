<template>
  <!-- eslint-disable -->
  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-center">
        <h2>Area Personale</h2>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
        <h2></h2>
        <h2></h2>
              <p>Visualizza andamento Partecipazioni</p>
        </div>
        <div class="card-body">
            <div class="d-flex flex-wrap" v-for="user in users" :key="user.id">
              <div class="w-33 m-1">
                <p>{{ user.id_Utente }}</p>
              </div>
              <div class="w-33 m-1">
                  <p>{{ user.nome }}</p>
              </div>
              <div class="w-33 m-1">
                <p>{{ user.cognome }}</p>
              </div>
              <div class="w-33 m-1 d-flex justify-content-end">
                <div v-if="user.disponibile === 1">
                  <p>✔️</p>
                </div>
                <div v-else-if="user.disponibile === 0">
                  <p>✖️</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <NavBar></NavBar>
</template>

<script>
/*eslint-disable*/
import NavBar from "@/components/NavBar.vue";
import apiService from "@/services/apiService";

export default {
  name: "UtentePage",
  components: {
    NavBar,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsersFromApi();
  },
  methods: {
    async fetchUsersFromApi() {
      try{
        const response = await apiService.fetchUsers();
        this.users = response.data;
      }catch(error){
        console.log(error);
      }
    }
  }
};

</script>

<style scoped>
.w-33{
  width: 33,333%;
}
.w-25{
  width: 25%;
}
.card-header {
  background-color: white;
}
.text {
  font-size: small;
}
.card {
  width: 90%;
  margin-bottom: 10rem;
}
.mr-1{
  margin-right: 1rem;
}
</style>
