<template>
  <!-- eslint-disable -->
  <div class="my-5">
    <div class="container h-auto">
      <div class="row">
        <div class="d-flex justify-content-center">
          <h2>Area Personale</h2>
        </div>
      </div>
      <div class="card my-4">
        <div class="row" style="height: screen">
          <figure class="w-full d-flex justify-content-center align-items-center mb">
            <i class="bi bi-person"></i>
          </figure>
        </div>
        <div class="row d-flex flex-wrap">
          <div class="w-full d-flex justify-content-center">
            <p>{{ userData.nome }}</p>
          </div>
          <div class="w-full d-flex justify-content-center">
            <p>{{ userData.cognome }}</p>
          </div>
          <div class="w-full d-flex justify-content-center">
            <p>{{ userData.email }}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div class="d-flex justify-content-center">
            <p class="font-weight-bold my-2">Vuoi modicare i tuoi dati personali?</p>
          </div>
          <div class="d-flex flex-wrap my-3">
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1" style="width: 74px;">Nome:</div><input v-model="userData.nome" type="text">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1" style="width: 74px;">Cognome:</div><input v-model="userData.cognome" type="text">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1" style="width: 74px;">Email:</div><input v-model="userData.email" type="email">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1" style="width: 74px;">Password:</div><input v-model="userData.password" type="password">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1">Disponibilità:</div>
              <button class="bg-white" :v-model="userData.disponibile" @click="changeDisponibility()"><i
                  style="color: black;" class="bi bi-arrow-repeat"></i></button>
            </div>
            <div class="d-flex justify-content-center flex-wrap w-full my-2">
              <button class="spaces mb-2" @click="updateUsersFromApi()">Salva le modifiche</button>
              <button class="spaces " @click="deleteUsersFromApi()">Elimina il Partecipante</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script>
/* eslint-disable */
import NavBar from '@/components/NavBar.vue';
import apiService from '@/services/apiService';
import Swal from 'sweetalert2';


export default {
  name: "UtenteDettaglio",
  components: {
    NavBar,
  },
  data() {
    return {
      userDetails: { rows: [{}] },
      userData: {
        nome: "",
        cognome: "",
        email: "",
        password: "",
        disponibile: true,
      }
    };
  },
  created(){
    this.scrollToTop();
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchUsersDetailsFromApi(id);
  },
  methods: {
    async fetchUsersDetailsFromApi(id) {
      try {
        const response = await apiService.fetchUserDetails(id);
        this.userData = response.data.rows[0]
      } catch (e) {
        console.error(e);
      }
    },

    async updateUsersFromApi() {
      try {
        const id = this.userData.id_Utente;
        this.userData.admin = true;
        console.log(this.userData)
        const response = await apiService.updateUser(id, this.userData);
        this.userDetails.rows[0] = response.config.data;
        console.log(response.config.data);
        this.$router.push("/profilo");
      } catch (e) {
        console.error(e);
      }
    },

    async updateSingleFieldFromApi() {
      try {
        const id = this.userDetails.rows[0].id_Utente;
        const data = { [field]: this.userData[field] };
        const response = await apiService.updateUser(id, data);
        this.userDetails = response.data;
      } catch (e) {
        console.error(e);
      }
    },

    async deleteUsersFromApi() {
      try {
        const respose = await apiService.deleteUtenti(this.$route.params.id);
        this.users = respose.data;
        console.log(this.users);
        this.$router.push("/profilo")
      } catch (e) {
        console.error(e);
      }
    },

    changeDisponibility() {
      if (this.userData.disponibile === 0) {
        this.userData.disponibile = 1;
      } else if (this.userData.disponibile === 1) {
        this.userData.disponibile = 0;
      }
      console.log(this.userData.disponibile);
    }, 
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
}
</script>

<style scoped>
.h-full {
  height: 100%;
}

.font-weight-bold {
  font-weight: bold;
}

.card {
  margin-bottom: 10rem;
}
</style>
