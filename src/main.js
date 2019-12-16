import Vue from "vue";
import VDragged from "v-dragged";
import throttle from "lodash.throttle";
import App from "./App";
import store from "./store";
import { paramsList } from "./utils/routing.js";

Vue.use(VDragged);
Vue.config.productionTip = false;

// On mutation, update the URL to capture all the user options.
// This allows for users to share their creations.
const URL_CHANGE_THROTTLE_IN_MS = 1000;

store.subscribe(
  throttle((mutation, state) => {
    let url = new URL(document.URL);
    let params = new URLSearchParams(url.search);

    for (const [param] of paramsList) {
      params.set(param, state[param]);
    }

    url.search = params.toString();
    let newURL = url.toString();
    history.replaceState({}, "", newURL);
  }, URL_CHANGE_THROTTLE_IN_MS)
);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
