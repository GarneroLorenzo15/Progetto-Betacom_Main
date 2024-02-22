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
  },
  {
    path: "/eventi/:id",
    name: "DettaglioEvento",
    component: () => import("../views/EventoDettaglio.vue"), //dynamic import
  },
  {
    path: "/profilo",
    name: "UtenteView",
    component: () => import("../views/UtenteView.vue"), //dynamic import
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

export default router;
