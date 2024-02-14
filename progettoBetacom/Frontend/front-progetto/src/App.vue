<template>
  <router-view />
</template>

<script></script>

<style>
body {
  background-image: linear-gradient(to top, #034ea1, #f38120);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
a {
  color: #f38120;
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.w-50 {
  width: 50%;
}
.h-50 {
  height: 50%;
}
.h-92 {
  height: 100px;
}
.border-nav {
  border-radius: 25px 25px 0 0;
  position: fixed;
  bottom: 0;
}
i {
  font-size: 45px;
}
.active {
  position: relative;
}

.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px; /* Puoi regolare l'altezza della linea */
  background-color: orange; /* Colore arancione */
}
.object-contain {
  width: 100%;
  height: 100%;
}
</style>
