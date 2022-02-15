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
        <main>
          <!-- sections -->
          <app-offer-bar></app-offer-bar>
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
import {
  useProducts,
  useLead,
  useLanding,
  HeaderBrands as SHeaderBrands,
  // CallMeBackForm as SCallMeBackForm,
  Footer as SFooter,
  CallMeBackModal as SCallMeBackModal,
} from "@smart-contact/smartify";
import AppHero from "./components/AppHero.vue";
import OverlayLoadingScreen from "./components/OverlayLoadingScreen.vue";
import AppOfferBar from "./components/AppOfferBar.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHero,
    SHeaderBrands,
    // SCallMeBackForm,
    SFooter,
    SCallMeBackModal,
    OverlayLoadingScreen,
    AppOfferBar,
  },
  provide() {
    return {
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
      products,
      accountLogos,
      buyerLogo,
      lead,
      landing,
      sendLead,
      onProductSelected,
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
}
#call-me-back-modal.modal .modal-content {
  color: $white;
  background-color: theme-color("primary");
}
</style>
