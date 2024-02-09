<template>
  <div id="app">
    <div>
      <p :title="isRed()"> counter: <span v-html="isRed()"></span></p>
    </div>
    <div v-if="count < 10 && count > -10" >
      <button @click="count++">+</button>
      <button @click="count--">-</button>
      <button @click="count += 10">+10</button>
      <button @click="count -= 10">-10</button>
    </div>
    <button @click="count = 0">reset</button>
<!--     <button @click="isBool()">show secondPage</button> -->
    <a :href="SecondPage"></a>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      bool: false,
      count: 0,
      isRed(){
        if(this.count >= 1){
          const rowHtml = `<div style="color:red;">${this.count}</div>`;
          return rowHtml;
        }else if(this.count <= 0){
          const rowHtml = `<div style="color:blue">${this.count}</div>`;
          return rowHtml;
        }
      },
      /* isBool(){
        this.bool =!this.bool;
        console.log(this.bool);
      } */
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
</style>
