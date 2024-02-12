/* import Vue from 'vue'; */
import { createMemoryHistory, createRouter} from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import SecondPage from './components/SecondPage.vue';



 const routes = [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'secondPage',
      component: SecondPage
    },
  ]; 

  const router = createRouter({
    history: createMemoryHistory(process.env.BASE_URL),
    routes,
  });

  export default router;
