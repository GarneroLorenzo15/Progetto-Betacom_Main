<template>
  <!-- eslint-disable -->
  <div class="hello">
    <div class="container margin-top h-auto">
      <div class="row" style="height: 200px">
        <figure class="w-full d-flex justify-content-center">
          <i class="bi bi-person"></i>
        </figure>
      </div>
    </div>
    <div class="container my-4">
      <div class="row">
        <div class="w-full d-flex justify-content-end">
          <div class="hover-info" @click="toggleInfoMessage()"><i class="bi bi-info-circle-fill font-i"></i>
            <div width="50px" heigth="50px" class="hover-content" v-if="showInfoMessage">
              <div class="text-justify">La password di default è impostata sul nome del titolare dell'account con la
                prima lettera
                maiscola, si ricorda che
                per aumentare la sicurezza è consigliato modificare la password nella propria area personale</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div>
          <input class="w-full mb-3" v-model="this.Credenziali.email" type="email" placeholder="  inserici email..." />
          <div class="d-flex align-items-center mb-3">
            <input class="w-full" v-model="this.Credenziali.password" :type="passwordFieldType"
              placeholder="  inserici password..." />
            <button @click="togglePassword()"> {{ showPassword ? 'Mostra' : 'Nascondi' }} </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div class="row" style="width: 50%">
        <button class="w-full mb-3" @click="login()">LOGIN</button>
      </div>
    </div>
    <div class="container d-flex justify-content-center text-white fondo-page">
      <div class="row">
        <p>Powered by Lorenzo Garnero</p>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import apiService from "../services/apiService";
import Swal from 'sweetalert2'

export default {
  name: "HelloWorld",
  data() {
    return {
      Credenziali: {
        email: '',
        password: '',
      },
      showPassword: true,
      showInfoMessage: false
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? 'password' : 'text';
    }
  },
  methods: {
    async login() {
      try {
        const response = await apiService.Login(this.Credenziali);
        console.log(response);
        if (!this.Credenziali.email || !this.Credenziali.password){
          this.showNoCredenziali();
          return;
        }

        if(response.status === 200){
          const token = await response.data.token;
          const admin = await response.data.admin;
          const utente = await response.data.utente;
          localStorage.setItem('token', token);
          localStorage.setItem('utente', utente);
          localStorage.setItem('admin', admin);
          this.$router.push('/eventi');
          this.accessCorrect();
        } else if(response.status === 401){
          this.accessDenied();
        }
        
      } catch (error) {
        console.log(error);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleInfoMessage() {
      this.showInfoMessage = !this.showInfoMessage;
      const hoverInfo = document.querySelector('.hover-info');
      hoverInfo.classList.toggle('clicked');
      console.log(this.showInfoMessage);
    },
    shownAlterProva() {
      Swal.fire("SweetAlert2 is working!");
    },
    showNoCredenziali() {
      if (this.Credenziali === undefined) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    },
    accessCorrect() {
      Swal.fire({
        icon: "success",
        title: "Accesso effettuato con successo!",
        confirmButtonColor: '#034ea1',
      });
    },
    accessDenied() {
      Swal.fire({
        icon: "error",
        title: "Accesso negato!",
        confirmButtonColor: '#034ea1',
      });
    }

  }
};
</script>


<style scoped>
.w-full {
  width: 100%;
}

.hover-info {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.hover-content {
  display: none;
  position: fixed;
  transform: translate(-100%, -100%);
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
  width: 250px;
  z-index: 1;
}

.hover-info.clicked .hover-content {
  display: block;
}

button,
input {
  border-radius: 25px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #f38120;
}

i {
  color: #d9d9d9;
  font-size: 10rem;
}

.font-i {
  font-size: 2rem;
}

.margin-top {
  margin-top: 8rem;
}

.fondo-page {
  position: relative;
  margin-top: 8.2rem;
}

.h-auto {
  height: auto;
}
</style>
