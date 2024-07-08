<template>
  <!-- eslint-disable -->
  <div class="hello h-900">
    <div class="container margin-top h-auto">
      <div class="row" style="height: 200px">
        <figure class="w-full d-flex justify-content-center">
          <i class="bi bi-person"></i>
        </figure>
      </div>
    </div>
    <div class="container my-4 w-full w-lg-40">
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
      <div style="width: 50%" class="d-flex justify-content-center">
        <button class=" w-75" @click="login()">LOGIN</button>
      </div>
    </div>
    <div class="container d-flex justify-content-center mt-5">
      <GoogleLogin :callback="callback" prompt auto-login />
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
import { GoogleLogin } from "vue3-google-login";
import apiService from "../services/apiService";
import Swal from 'sweetalert2'
import { decodeCredential } from "vue3-google-login";

export default {
  name: "HelloWorld",
  data() {
    return {
      Credenziali: {
        email: '',
        password: '',
      },
      showPassword: true,
      showInfoMessage: false,
      logged: false,
      user: null,
      email: '',
      callback: async (response) => {
        this.logged = true;
        console.log(response);
        this.user = decodeCredential(response.credential);
        this.email = this.user.email;
        console.log(this.email);
        this.loginGoogle();
      }
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
        console.log(response.status);
        if (!this.Credenziali.email || !this.Credenziali.password || response.status === 400) {
          this.showNoCredenziali();
          return;
        }

        if (response.status === 200) {
          const token = await response.data.token;
          const admin = await response.data.admin;
          const utente = await response.data.utente;
          localStorage.setItem('token', token);
          localStorage.setItem('utente', utente);
          localStorage.setItem('admin', admin);
          this.$router.push('/eventi');
        } else if (response.status === 401) {
          this.accessDenied();
        }
      } catch (error) {
        console.log(error, 'login normale');
      }
    },

    async loginGoogle() {
      try{
        const response = await apiService.LoginGoogle(this.email);

        if (!this.email || response.status === 400) {
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
        }
      } catch (error) {
        console.log(error, 'login google');
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
    },
    goToEventi() {
      this.$router.push('/eventi');
      console.log('click');
    },
  }
};
</script>


<style scoped>
.w-full {
  width: 100%;
}

.w-75{
  width: 75%;
}

.w-55{
  width: 55%;
}

.w-40{
  width: 40%;
}

.h-900{
  height: 900px;
}
@media (min-width: 992px) {
  .w-lg-40 {
    width: 40%;
  }
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


.google-login-button {
  background-color: #fff;
  color: #034ea1;
  border: 2px solid #757575;
  border-radius: 100%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.google-login-button:hover {
  background-color: #f1f1f1;
}

.google-login-button img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

button i{
  color: #034ea1;
}

</style>
