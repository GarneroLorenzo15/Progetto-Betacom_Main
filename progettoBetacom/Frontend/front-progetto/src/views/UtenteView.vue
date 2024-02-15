<template>
  <!-- eslint-disable -->
  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-center">
        <h2>Profilo Utente</h2>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="card">
        <div class="card-header d-flex justify-content-center">
          <p>Lista Partecipanti</p>
        </div>
        <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between" v-for="user in users" :key="user.id">
              <p class="w-33">{{ user.id_Utente }}</p>
              <p class="w-33">{{ user.nome }}</p>
              <p class="w-33">{{ user.cognome }}</p>
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
</style>
