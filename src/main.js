import Vue from "vue";

import "@/plugins/index.js";
import "@/plugins/bootstrap-vue.js";
import "@/plugins/smartland.js";
import "@/plugins/smartify.js";
// import "@/components/index.js";
import App from "./App.vue";
import "@/assets/scss/index.scss";
import "@/assets/scss/vendors/smartify/_index.scss";
import { getImageURLMixin } from "@/mixins";
Vue.mixin(getImageURLMixin);

new Vue({
  provide() {
    return {
      callMeBackFormOptions: {
        phoneFieldAttrs: {
          placeholder: "Inserisci il tuo numero di cellulare",
        },
        submitBtnText: "Ti Chiamiamo noi",
        submitBtnVariant: "success",
        submitBtnClasses: "text-uppercase",
        privaciesOptions: {
          uncheckedValue: 0,
          checkedValue: 1,
          checkAllChildren: true,
          uncheckAllChildren: true,
          collapseToggleText: this.$landing.params.get("collapseToggleText"),
        },
      },
    };
  },
  render: (h) => h(App),
}).$mount("#app");
