<template>
  <div class="second" v-if="this.bool===true">
    <h1 class="w-full" >{{ msg }}</h1>
    <p class="w-full h-full bg-red-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde perferendis
      ad ratione excepturi dolore autem minus dicta vel, rem dolorum temporibus,
      sapiente tempore quibusdam porro aperiam mollitia sed natus. Eos.
    </p>
  </div>
</template>

<script>
export default {
  name: "SecondPage",
  props: {
    msg: String,
  },
};

</script>

<style scoped></style>
