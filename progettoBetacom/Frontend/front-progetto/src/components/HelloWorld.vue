<template>
  <!-- eslint-disable -->
  <div class="hello">
    <div class="container margin-top h-auto">
      <div class="row" style="height: 200px">
        <figure class="w-full d-flex justify-content-center align-items-center mb">
          <i class="bi bi-person"></i>
        </figure>
      </div>
    </div>
    <div class="container my-5">
      <div class="row d-flex justify-content-center">
        <div>
          <input class="w-full mb-3" v-model="this.Credenziali.email" type="email" placeholder="  inserici email..." />
          <div class="d-flex align-items-center mb-3">
            <input class="w-full" v-model="this.Credenziali.password" :type="passwordFieldType"
              placeholder="  inserici password(cognome in minuscolo)..." />
            <button @click="togglePassword()"> {{ showPassword ? 'Mostra' : 'Nascondi' }} </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div class="row" style="width: 50%">
<!--         <router-link to="/eventi"> -->
        <button class="w-full mb-3" @click="login()">LOGIN</button>
        <!-- </router-link> -->
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

export default {
  name: "HelloWorld",
  data() {
    return {
      Credenziali: {
        email: '',
        password: '',
      },
      showPassword: true,
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
        const { token } = await response.data
        localStorage.setItem('token', token);
        this.$router.push('/eventi');
      } catch (error) {
        console.log(error);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-full {
  width: 100%;
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

.margin-top {
  margin-top: 8rem;
}

.fondo-page{
  position: relative;
  margin-top: 8.2rem;
}
.h-auto{
  height: auto;
}
</style>
