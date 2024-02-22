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
        <div class="card-header">
          <div class="row d-flex flex-nowrap justify-content-between ">
            <div class=" d-flex w-50 spaces align-items-center">
              <h2>Lista Partecipanti</h2>
            </div>
            <div class="d-flex justify-content-end  w-50 ">
              <div class=" " @click="openModal()">
                <i class="bi bi-plus-circle-fill"></i>
              </div>
            </div>
          </div>
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
    <!-- Modale di aggiunta utenti -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Aggiungi Evento</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addUtenteFromApi()">
                <div class="container">
                  <div class="row d-flex justify-content-around flex-wrap m-1">
                    <input class="mb-2" type="text" v-model="newUtente.nome" placeholder="Nome Utente..." required>
                    <input class="mb-2" type="text" v-model="newUtente.cognome" placeholder="Cognome utente...">
                    <input class="mb-2" type="password" v-model="newUtente.password" placeholder="Password...">
                    <button type="submit" @click="closeModal()">Aggiungi evento</button>
                  </div>
                </div>
              </form>
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
      newUtente: {
        id_Utente: null,
        nome: "",
        cognome: "",
        email: "",
        password: "",
      }
    };
  },
  mounted() {
    this.fetchUsersFromApi();
  },
  methods: {
    async fetchUsersFromApi() {
      try {
        const response = await apiService.fetchUsers();
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async addUtenteFromApi() {
      try {
        const response = await apiService.addUtenti(this.newUtente);
        const nuovoUtente = response.data;
        this.users.push(nuovoUtente);
      } catch (error) {
        console.log(error);
      }
    },
    openModal() {
      const modal = document.getElementById('exampleModal');

      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    },

    closeModal() {
      const modal = document.getElementById('exampleModal');

      if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    },
  }
};

</script>

<style scoped>
.w-33 {
  width: 33, 333%;
}

.w-25 {
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

.mr-1 {
  margin-right: 1rem;
}

i {
  font-size: x-large;
}
</style>
