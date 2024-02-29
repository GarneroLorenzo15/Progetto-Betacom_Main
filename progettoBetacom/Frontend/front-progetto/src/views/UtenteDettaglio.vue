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
            <p>{{ userDetails.rows[0].nome }}</p>
          </div>
          <div class="w-full d-flex justify-content-center">
            <p>{{ userDetails.rows[0].cognome }}</p>
          </div>
          <div class="w-full d-flex justify-content-center">
            <p>{{ userDetails.rows[0].email }}</p>
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
              <div class="mx-1" style="width: 74px;">Nome:</div><input v-model="userData.nome" @input="updateSingleFieldFromApi('nome')" 
                type="text">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1" style="width: 74px;">Cognome:</div><input v-model="userData.cognome" @input="updateSingleFieldFromApi('cognome')" 
                type="text">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1" style="width: 74px;">Email:</div><input v-model="userData.email" @input="updateSingleFieldFromApi('email')"
                type="email">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1" style="width: 74px;">Password:</div><input v-model="userData.password" @input="updateSingleFieldFromApi('password')" 
                type="password">
            </div>
            <div class="w-full d-flex  justify-content-center align-items-center my-2">
              <div class="mx-1">Disponibilità:</div><button class="bg-white" :v-model="userData.disponibile"
                @click="changeDisponity()">✖️</button>
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
/* import moment from 'moment'; */

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
        disponibile: false,
      }
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchUsersDetailsFromApi(id);
  },
  methods: {
    async fetchUsersDetailsFromApi(id) {
      try {
        const response = await apiService.fetchUserDetails(id);
        this.userDetails = response.data;
      } catch (e) {
        console.error(e);
      }
    },

    async updateUsersFromApi() {
      try {
        const id = this.userDetails.rows[0].id_Utente;
        const response = await apiService.updateUser(id, this.userData);
        this.userDetails.rows[0] = response.config.data;
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
        const respose = await apiService.deleteUtenti(this.userDetails.rows[0].id_Utente);
        this.users = respose.data;
        this.$router.push("/profilo")
      } catch (e) {
        console.error(e);
      }
    },

    changeDisponity() {
      if (this.userData.disponibile === false) {
        this.userData.disponibile = true;
      } else if (this.userData.disponibile === true) {
        this.userData.disponibile = false;
      }
      console.log(this.userData.disponibile);
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
}</style>
