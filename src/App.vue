<template>
  <div id="app">
    <s-header-brands
      class="py-5"
      :left-logo="buyerLogo"
      data-testid="header-brands"
    />

    <b-overlay :show="products.loading.value" spinner-variant="primary">
      <template #overlay="{ spinnerVariant }">
        <overlay-loading-screen
          :logo="buyerLogo"
          :spinner-variant="spinnerVariant"
        />
      </template>

      <template v-if="!products.loading.value">
        <!-- app-hero -->
        <app-hero
          :product="products.items.value[0]"
          :call-me-back-form-options="callMeBackFormOptions"
          @submit="sendLead"
        />
        <main class="container border p-0 py-5">
          <!-- sections -->
          <app-offer-bar
            v-if="this.breakpoints.greater('md').value"
          ></app-offer-bar>
          <app-offers :products="products.items.value"></app-offers>
          <app-ookla-banner></app-ookla-banner>
        </main>
      </template>
    </b-overlay>

    <s-footer class="py-6 text-center" data-testid="footer">
      <span v-html="landing.params.get('copyFooter')" />
    </s-footer>

    <s-call-me-back-modal
      id="call-me-back-modal"
      :cmb-form-loading="lead.sending.value"
      subtitle="un consulente ti contatterà per fornirti tutte le informazioni necessarie gratis"
      :callMeBackFormOptions="{
        ...callMeBackFormOptions,
        'submit-btn-variant': 'secondary',
        'submit-btn-text': 'TI CHIAMIAMO NOI',
      }"
      @submit="sendLead"
    >
      <template #title>
        <h2>{{ products.selected.value.name }}</h2>
        <h4>Richiedi maggiori informazioni</h4>
      </template>

      <template #subtitle>
        Sarai richiamato <b>GRATIS</b> e senza impegno
      </template>
    </s-call-me-back-modal>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount } from "@vue/composition-api";
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
import OverlayLoadingScreen from "./components/OverlayLoadingScreen.vue";
import AppOffers from "./components/AppOffers.vue";
import AppHero from "./components/AppHero.vue";
import AppOoklaBanner from "./components/AppOoklaBanner.vue";
import AppOfferBar from "./components/AppOfferBar.vue";

export default defineComponent({
  name: "App",
  components: {
    SHeaderBrands,
    // SCallMeBackForm,
    SFooter,
    SCallMeBackModal,
    AppHero,
    AppOoklaBanner,
    AppOfferBar,
    OverlayLoadingScreen,
    AppOffers,
    // PriceEgg,
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
  inject: ["callMeBackFormOptions"],
  setup(_, context) {
    const { $bvModal } = context.root;
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
        await lead.send(data);
        if (successURL) {
          window.location.href = successURL;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const redirectSelf = (url) => {
      window.gtag_report_conversion && window.gtag_report_conversion(url);
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
      products
        .load({
          // collection: landing.params.get('collection'),
          productsIds: landing.params.get("products"),
        })
        .then(() => {
          products.setSelectedIndex(0);

          //modify product name. Removes "full" or "open" from name.
          products.items.value[0].name = products.items.value[0].name.replace(
            /(open|full)$/i,
            ""
          );

          landing.data.set(
            "offer",
            [
              products.selected.value.name,
              products.selected.value.prices.default.value,
              products.selected.value.prices.default.invoiceUnit,
            ].join(" ")
          );
        });
    });

    return {
      products,
      breakpoints,
      accountLogos,
      buyerLogo,
      lead,
      landing,
      sendLead,
      onProductSelected,
      modalEvents,
      redirectSelf,
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

  .font-size-gotham {
    font-family: "gotham";
  }
}
#call-me-back-modal.modal .modal-content {
  color: $white;
  background-color: theme-color("primary");
}
</style>
