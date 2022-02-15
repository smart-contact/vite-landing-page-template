import Vue from "vue";
import { SmartlandVuePlugin } from "@smart-contact/smartland";
import SmartlandPluginSmartBridge from "@smart-contact/smartland-plugin-smart-bridge";
import SmartlandPluginScheduler from "@smart-contact/smartland-plugin-scheduler";
import SmartlandPluginCookies from "@smart-contact/smartland-plugin-cookies";

const { config = {}, options = {}, afterInit } = window.$landingConfig;
const { params = {}, data = {}, injection = {} } = config;

const plugins = [
  [SmartlandPluginScheduler],
  [SmartlandPluginDeviceType],
  [SmartlandPluginCookies],
];

injection.plugin = SmartlandPluginSmartBridge;

Vue.use(SmartlandVuePlugin, {
  config: {
    params,
    data,
    injection,
  },
  options,

  plugins,

  afterInit,
});

function SmartlandPluginDeviceType(landing) {
  landing.getDeviceType = function () {
    const ua = navigator.userAgent;
    // if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    //   return "tablet";
    // }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "Mobile Phone";
    }
    return "desktop";
  };
}
