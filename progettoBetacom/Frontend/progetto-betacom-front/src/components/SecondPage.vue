<template>
  <div class="second">
    <div class="w-[50%] bg-green-400" >
      <p :title="isRed"> counter:  <span v-html="isRed()"></span></p>
    </div>
    <div v-if="count < 10 && count > -10" >
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="plusten">+10</button>
      <button @click="minusten">-10</button>
    </div>
    <button @click="reset">reset</button>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import '@/assets/css/app.css'


    const count = ref(0);
    
    console.log(count.value);
    function increment(){
      count.value++;
      console.log(count.value);
    }
    function decrement(){
      count.value--;
      console.log(count.value);
    }
    function reset(){
      count.value = 0;
      console.log(count.value);
    }
    function plusten(){
      count.value += 10;
      console.log(count.value);
    }
    function minusten(){
      count.value -= 10;
      console.log(count.value);
    }
    function isRed(){
      if(this.count >= 1){
          const rowHtml = `<div style="color:red;">${this.count}</div>`;
          return rowHtml;
        }else if(this.count <= 0){
          const rowHtml = `<div style="color:blue">${this.count}</div>`;
          return rowHtml;
        }
    }


 

</script>

<style scoped>


.back{
  background-color: red;
}

</style>
