<template>
  <div id="app">
    <s-header-brands
      class="py-5"
      :left-logo="buyerLogo"
      :right-logo="accountLogos"
      data-testid="header-brands"
    />

    <b-overlay :show="products.loading.value" spinner-variant="primary">
      <template #overlay="{ spinnerVariant }">
        <overlay-loading-screen
          :logo="accountLogos[0]"
          :spinner-variant="spinnerVariant"
        />
      </template>

      <template v-if="!products.loading.value">
        <app-hero />
        <main>
          <app-features />
          <app-offers :product="mappedProducts" />
        </main>
      </template>
    </b-overlay>

    <s-footer class="py-6 text-center" data-testid="footer">
      <span v-html="landing.params.get('copyFooter')" />
    </s-footer>

    <s-call-me-back-modal
      id="call-me-back-modal"
      :call-me-back-form-options="callMeBackFormOptions"
      title="Vuoi avere maggiori informazioni su questa offerta?"
      subtitle="Un consulente ti contatterà per fornirti tutte le informazioni necessarie gratis"
      @submit="sendLead"
      v-on="modalEvents"
    />
  </div>
</template>

<script setup>
import { computed, provide, inject, computed, onBeforeMount } from "vue";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import {
  useProducts,
  useLead,
  useLanding,
  HeaderBrands as SHeaderBrands,
  // CallMeBackForm as SCallMeBackForm,
  Footer as SFooter,
  CallMeBackModal as SCallMeBackModal,
} from "@smart-contact/smartify";
import AppHero from "@/components/AppHero.vue";
import AppFeatures from "@/components/AppFeatures.vue";
import AppOffers from "@/components/AppOffers.vue";
import contents from "@/../contents.js";
import OverlayLoadingScreen from "@/components/OverlayLoadingScreen.vue";
 
const landing = useLanding();
const { logoAccountMobile, logoAccount, account } = landing.params.get();
const products = useProducts();
const lead = useLead({
  disableRecaptchaCheck: !landing.params.get("useRecaptcha"),
});
const callMeBackFormOptions = inject("callMeBackFormOptions");    const $bvModal = inject("$bvModal");
const offers = contents.offers;

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

const buyerLogo = computed(() => {
  const [buyer] = products.buyers.value;
  return buyer
    ? {
        src: buyer.imageUrl,
        alt: `logo ${buyer.name}`,
      }
    : {};
});

const breakpoints = useBreakpoints(breakpointsBootstrapV5);

const mappedProducts = computed(() => {
  return ["luce", "gas"].map((type, i) => ({
    name: products.items.value[i].name,
    productIndex: i,
    ...offers[i],
    type,
    ...products.items.value[i].prices[type],
    alternative_price:
      products.items.value[i].metadata[`alt_costo_${type}`],
  }))
});
const sendLead = async (data = {}) => {
  const { successURL } = landing.params.get();
  try {
    if(window.dataLayer) {
        window.dataLayer.push({
        event: "form_submit",
        eventCategory: "form",
        eventAction: "submit_ok",
        eventLabel: "call-back landing",
      });
    }
    await lead.send(data);
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

const modalEvents = {
  show: () => {
    if (products.selected.value != undefined) {
      landing.data.set("buyer", products.selected.value.buyer.name);
      landing.data.set("offer", products.selected.value.name);
    }
  },
  hide: () => {
    landing.data.restoreDefaults();
    products.setSelectedIndex(undefined);
  },
};

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
