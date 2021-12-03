import Vue from "vue";
import vueCompositionApi from "@vue/composition-api";
import Vuelidate from "vuelidate";
import { VueReCaptcha } from "vue-recaptcha-v3";

//add plugins
Vue.use(vueCompositionApi);
Vue.use(Vuelidate);
Vue.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY,
  loaderOptions: {
    useEnterprise: true,
  },
});
