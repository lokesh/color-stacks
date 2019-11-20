import Vue from "vue";
import VDragged from "v-dragged";
import App from "./App";
import store from "./store";

Vue.use(VDragged);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
