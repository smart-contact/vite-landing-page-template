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
        <!-- app-hero -->
        <main>
          <!-- sections -->
        </main>
      </template>
    </b-overlay>

    <mq-footer />

    <s-call-me-back-modal
      id="call-me-back-modal"
      :call-me-back-form-options="callMeBackFormOptions"
      v-on="modalEvents"
      @submit="sendLead"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount, inject } from "vue";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import {
  useProducts,
  useLead,
  useLanding,
  HeaderBrands as SHeaderBrands,
  // CallMeBackForm as SCallMeBackForm,
  CallMeBackModal as SCallMeBackModal,
} from "@smart-contact/smartify";
import OverlayLoadingScreen from "@/components/OverlayLoadingScreen.vue";
import MqFooter from "@/components/MqFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    SHeaderBrands,
    // SCallMeBackForm,
    MqFooter,
    SCallMeBackModal,
    OverlayLoadingScreen,
  },
  provide() {
    return {
      isMobile: this.breakpoints.smaller("md"),
      isTablet: this.breakpoints.greater("sm"),
      isDesk: this.breakpoints.greater("md"),
      params: this.landing.params.get(),
      onProductSelected: this.onProductSelected,
      sendLead: this.sendLead,
    };
  },

  setup() {
    const $bvModal = inject("$bvModal");
    const callMeBackFormOptions = inject("callMeBackFormOptions");
    const landing = useLanding();
    const { logoAccountMobile, logoAccount, account } = landing.params.get();
    const products = useProducts();
    const lead = useLead({
      disableRecaptchaCheck: !landing.params.get("useRecaptcha"),
    });

    const breakpoints = useBreakpoints(breakpointsBootstrapV5);
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

    return {
      breakpoints,
      products,
      accountLogos,
      buyerLogo,
      lead,
      landing,
      sendLead,
      onProductSelected,
      callMeBackFormOptions,
      modalEvents,
    };
  },
});
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
