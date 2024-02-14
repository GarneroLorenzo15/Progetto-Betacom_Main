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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/SceltaEventi.vue"), //dynamic import
  },
  {
    path: "/evento",
    name: "DettaglioEvento",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/EventoDettaglio.vue"), //dynamic import
  },
  {
    path: "/profilo",
    name: "UtenteView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/UtenteView.vue"), //dynamic import
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
    console: console.log("url errato"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
