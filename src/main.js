import Vue from "vue";

import "@/plugins/index.js";
import "@/plugins/bootstrap-vue.js";
import "@/plugins/smartland.js";
// import "@/components/index.js";
import App from "./App.vue";

import "@/assets/scss/index.scss";

new Vue({
  data() {
    return {
      callMeBackFormOptions: {
        phoneFieldAttrs: {
          placeholder: "Inserisci il tuo numero di cellulare",
        },
        submitBtnText: "Ti Chiamiamo noi",
        submitBtnVariant: "success",
        submitBtnClasses: "text-uppercase",
      },
    };
  },
  render: (h) => h(App),
}).$mount("#app");
