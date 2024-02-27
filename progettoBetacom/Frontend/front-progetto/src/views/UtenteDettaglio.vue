<template>
  <!-- eslint-disable -->
    <div class="bg-white">
        <div class="container h-auto">
          <div class="row" style="height: 200px">
            <figure class="w-full d-flex justify-content-center align-items-center mb">
              <i class="bi bi-person"></i>
            </figure>
          </div>
          <div class="row d-flex flex-wrap">
            <div class="w-full">
              <p>{{ userDetails.id_Utente }}</p>
            </div>
            <div class="w-full">
              <p>{{ userDetails.nome }}</p>
            </div>
          </div>
        </div>
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
    NavBar
  },
  data(){
    return {
      userDetails: [],
    };
  },
  mounted() {
    const id = this.$route.parsms.id;
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

    async deleteUsersFromApi() {
      try {
        const respose = await apiService.deleteUtenti(this.userDetails.id_Utente);
        this.users = respose.data;
        this.$router.push("/utenti")
      } catch (e) {
        console.error(e);
      }
    }
  },
}
</script>

<style>
.h-full{
  height: 100%;
}

</style>
