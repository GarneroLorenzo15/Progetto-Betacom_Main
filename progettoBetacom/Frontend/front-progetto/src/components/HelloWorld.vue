<template>
  <!-- eslint-disable -->
  <div class="hello">
    <div class="container margin">
      <div class="row" style="height: 200px">
        <figure class="w-full d-flex justify-content-center align-items-center mb">
          <i class="bi bi-person"></i>
        </figure>
      </div>
    </div>
    <div class="container my-5">
      <div class="row d-flex justify-content-center">
        <div>
          <input class="w-full mb-3" v-model="this.email" type="email" placeholder="  inserici email..." />
          <div class="d-flex align-items-center mb-3">
            <input class="w-full" v-model="this.password" :type="passwordFieldType"
              placeholder="  inserici password(cognome in minuscolo)..." />
            <button @click="togglePassword()"> {{ showPassword ? 'Mostra' : 'Nascondi' }} </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-flex justify-content-center">
      <div class="row" style="width: 50%">
        <!-- <router-link to="/eventi"> -->
        <button class="w-full mb-3" @click="login()">LOGIN</button>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="container my-5 d-flex justify-content-center text-white">
      <div class="row">
        <p>Powered by Lorenzo Garnero</p>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "HelloWorld",
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? 'password' : 'text';
    }
  },
  methods: {
    login() {
      // Invia le credenziali al server
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Credenziali non valide.');
          }
        })
        .then(data => {
          // Salva il token ricevuto e fai reindirizzare l'utente
          localStorage.setItem('token', data.token);
          this.$router.push('/eventi');
        })
        .catch(error => {
          console.log(this.email, this.password);
          console.error('Errore durante il login:', error.message);
        });
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

.margin {
  margin-top: 8rem;
}
</style>
