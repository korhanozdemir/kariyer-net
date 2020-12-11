import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import store from "./store/index";
import VueRouter from "vue-router";
import router from "./router";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount("#app");
