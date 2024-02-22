/* eslint-disable */

import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/eventi",
    name: "eventi",
    component: () => import("../views/SceltaEventi.vue"), //dynamic import
    meta: { requiresAuth: true }
  },
  {
    path: "/eventi/:id",
    name: "DettaglioEvento",
    component: () => import("../views/EventoDettaglio.vue"), //dynamic import
    meta: { requiresAuth: true }
  },
  {
    path: "/profilo",
    name: "UtenteView",
    component: () => import("../views/UtenteView.vue"), //dynamic import
    meta: { requiresAuth: true }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) =>{

  const token = localStorage.getItem("token");

  if(to.meta.requiresAuth && !token){
    next({ name: 'login'});
  } else {
    next();
  }
})

export default router;
