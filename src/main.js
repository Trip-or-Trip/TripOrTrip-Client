import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/css/variable.scss";

// vuetify
// import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";
// import vuetify from './plugins/vuetify'

// vue-cookie
import VueCookie from "vue-cookies";

// vue-masnory-css
import VueMasonry from "vue-masonry-css";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// fontawesome
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// library.add(faUserSecret)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.config.productionTip = false

// Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.use(VueMasonry);
Vue.config.productionTip = false;

new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  // vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount("#app");
