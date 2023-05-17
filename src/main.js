import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// vuetify
import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";
// import vuetify from './plugins/vuetify'

// vue-cookie
import VueCookie from 'vue-cookies'

// fontawesome
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// library.add(faUserSecret)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.config.productionTip = false

Vue.use(Vuetify);
Vue.use(VueCookie)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount("#app");
