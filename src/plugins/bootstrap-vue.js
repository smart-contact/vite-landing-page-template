import Vue from "vue";

import {
  FormPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  ButtonPlugin,
  OverlayPlugin,
  SpinnerPlugin,
  ModalPlugin,
  BIcon,
  BIconTelephoneFill,
} from "bootstrap-vue";

Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(ButtonPlugin);
Vue.use(SpinnerPlugin);
Vue.use(OverlayPlugin);
Vue.use(ModalPlugin);

Object.entries({
  BIcon,
  BIconTelephoneFill,
}).forEach(([name, component]) => Vue.component(name, component));
