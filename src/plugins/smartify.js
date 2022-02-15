import Vue from "vue";
import {
  CallMeBackForm,
  HeaderBrands,
  Footer,
  CallMeBackModal,
  $utils,
  ConnectionStamps,
} from "@smart-contact/smartify";

//Mixins

//Components
const components = [
  HeaderBrands,
  CallMeBackForm,
  ConnectionStamps,
  Footer,
  CallMeBackModal,
];
components.forEach((component) => {
  Vue.component($utils.prefixComponentName(component.name), component);
});
