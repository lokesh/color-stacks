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
const URL_CHANGE_THROTTLE_IN_MS = 500;

store.subscribe(
  throttle((mutation, state) => {
    let url = new URL(document.URL);
    let params = new URLSearchParams(url.search);

    for (const [paramName, paramType] of paramsList) {
      const val = state[paramName];
      if (paramType === "array" && val.length === 0) {
        params.delete(paramName);
      } else {
        params.set(paramName, state[paramName]);
      }
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
