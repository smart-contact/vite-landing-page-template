<template>
  <div id="app">
    <b-overlay :show="products.loading.value" spinner-variant="primary">
      <template #overlay="{ spinnerVariant }">
        <overlay-loading-screen
          :logo="accountLogos[0]"
          :spinner-variant="spinnerVariant"
        />
      </template>

      <template v-if="!products.loading.value">
        <!-- app-hero -->
        <main>
          <!-- sections -->
        </main>
      </template>
    </b-overlay>

    <mo-footer />
  </div>
</template>

<script setup>
import { provide, onBeforeMount, inject } from "vue";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import {
  useProducts,
  useLead,
  useLanding,
  // CallMeBackForm as SCallMeBackForm,
} from "@smart-contact/smartify-2.0";
import OverlayLoadingScreen from "@/components/OverlayLoadingScreen.vue";
import MoFooter from "@/components/MoFooter.vue";

const $bvModal = inject("$bvModal");
const landing = useLanding();
const { logoAccountMobile, logoAccount, account } = landing.params.get();
const products = useProducts();
const lead = useLead({
  disableRecaptchaCheck: !landing.params.get("useRecaptcha"),
});

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
// const scrollTo = (selector) => {
//   document.querySelector(selector)?.scrollIntoView();
// };
const accountLogos = [
  {
    src: `${LIVELANDING_CDN_IMAGES_BASE_URL}/${logoAccount}`,
    media: "(min-width: 768px)",
  },
  {
    src: `${LIVELANDING_CDN_IMAGES_BASE_URL}/${logoAccountMobile}`,
    alt: `logo ${account}`,
    default: true,
    media: "(max-width: 767.98px)",
  },
];

// const buyerLogo = computed(() => {
//   const [buyer] = products.buyers.value;
//   return buyer
//     ? {
//         src: buyer.imageUrl,
//         alt: `logo ${buyer.name}`,
//       }
//     : {};
// });

const sendLead = async (data = {}) => {
  const { successURL } = landing.params.get();
  try {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        eventCategory: "form",
        eventAction: "submit_ok",
        eventLabel: "call-back landing",
      });
    }
    await lead.send({
      name: data.name ?? "-",
      surname: data.surname ?? "-",
      phone: data.phone,
      privacy_1: data.privacies.privacy_1,
      privacy_2: data.privacies.privacy_2,
      additional_data: JSON.stringify({
        f4: landing.params.get("f4"),
        f5: landing.params.get("f5"),
        f11: landing.params.get("f11"),
        f12: landing.params.get("f12"),
        f13: landing.params.get("f13"),
        f14: landing.params.get("f14"),
        f15: landing.params.get("f15"),
        f18: landing.params.get("f18"),
        offer: landing.data.get("offer"),
        privacy_3: data.privacies.privacy_3,
        privacy_4: data.privacies.privacy_4,
        supplier_name: landing.params.get("supplier_name"),
        url_landing: landing.data.get("url_landing"),
        other_info: landing.data.get("other_info") ?? "-",
      }),
    });
    if (successURL) {
      window.location.href = successURL;
    }
  } catch (err) {
    console.log(err);
  }
};

const onProductSelected = (productIndex) => {
  products.setSelectedIndex(productIndex);
  $bvModal.show("call-me-back-modal");
};

// const modalEvents = {
//   show: () => {
//     if (products.selected.value != undefined) {
//       landing.data.set("buyer", products.selected.value.buyer.name);
//       landing.data.set("offer", products.selected.value.name);
//     }
//   },
//   hide: () => {
//     landing.data.restoreDefaults();
//     products.setSelectedIndex(undefined);
//   },
// };

onBeforeMount(() => {
  products.load({
    // collection: landing.params.get('collection'),
    productsIds: landing.params.get("products"),
  });
});

provide("isMobile", breakpoints.smaller("md"));
provide("isTablet", breakpoints.greater("sm"));
provide("isDesk", breakpoints.greater("md"));
provide("params", landing.params.get());
provide("onProductSelected", onProductSelected);
provide("sendLead", sendLead);
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

#app {
  .b-overlay {
    min-height: calc(100vh - #{$s-header-brands-logo-height + (spacer(5) * 2)});

    div:nth-child(2) {
      width: 100%;
    }
  }
  input::placeholder {
    font-size: 0.75em;
  }
}
</style>
