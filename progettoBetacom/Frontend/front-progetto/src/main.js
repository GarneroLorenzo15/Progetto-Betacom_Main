/* eslint-disable */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from 'vue3-google-login';

const clientID = '1005849045738-e28fot0n8nf89oohlmssajcoaiksnlnv.apps.googleusercontent.com'


createApp(App).use(router).use(vue3GoogleLogin, { clientId: clientID }).mount("#app");
