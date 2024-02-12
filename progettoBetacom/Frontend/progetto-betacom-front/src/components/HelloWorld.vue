<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="app">
    <div class="w-full h-96 bg-red-500">
      <p :title="isRed()"> counter: <span v-html="isRed()"></span></p>
    </div>
    <div v-if="count < 10 && count > -10" >
      <button @click="count++"><p>+</p></button>
      <button @click="count--"><p>-</p></button>
      <button @click="count += 10"><p>+10</p></button>
      <button @click="count -= 10"><p>-10</p></button>
    </div>
    <div>
      <ul>
        <li class="space" v-for="(value, index) in collegaBetacom">{{ index + 1 }}: {{ value.nome }}, {{ value.cognome }}, {{ value.email }}, {{ value.password }} </li>
      </ul>
    </div>
    <button @click="count = 0">reset</button>
<!--     <button @click="isBool()">show secondPage</button> -->
    <a :href="SecondPage"></a>
  </div>
</template>

<script>
import '@/assets/css/app.css'

export default {
  name: "App",

  data() {
    return {
      bool: false,
      count: 0,
      collegaBetacom:[{
        nome: "Lorenzo",
        cognome: "Garnero",
        email: "l.garnero@gmail",
        password: "*******"
      },
      {
        nome: "Lorenzo",
        cognome: "Garnero",
        email: "l.garnero@gmail",
        password: "*******"
      }
    ],
      isRed(){
        if(this.count >= 1){
          const rowHtml = `<div style="color:red;">${this.count}</div>`;
          return rowHtml;
        }else if(this.count <= 0){
          const rowHtml = `<div style="color:blue">${this.count}</div>`;
          return rowHtml;
        }
      }, 
    };
  },
};
</script>

<style scoped>
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
  color: #42b983;
}

.center {
  text-align: center;
}

button{
  border: 2px solid black;
  border-radius: 25px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: gray;
  margin: 10px;
}

button p{
  display: flex;
  justify-content: center;
}
.space{
  width: 100%;
}
</style>
