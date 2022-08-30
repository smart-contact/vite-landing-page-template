<template>
  <div id="app">
    <s-header-brands
      class="py-3"
      :left-logo="accountLogos"
      data-testid="header-brands"
    />

    <b-overlay :show="products.loading.value" spinner-variant="tiscali">
      <template #overlay="{ spinnerVariant }">
        <overlay-loading-screen
          :logo="accountLogos[0]"
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
        </main>
      </template>
    </b-overlay>

    <s-footer class="py-6 text-center" data-testid="footer">
      <span v-html="landing.params.get('copyFooter')" />
    </s-footer>

    <call-me-back-modal
      title="Offerta Tiscali"
      subtitle="Richiedi maggiori informazioni"
      description="Sarai richiamato <b>GRATIS</b> e senza impegno"
      :call-me-back-form-options="callMeBackFormOptions"
      v-on="modalEvents"
      @submit="sendUpdatedData"
    />
  </div>
</template>

<script>
import optionalProductData from "../optionalProductData";
import { computed, defineComponent, onBeforeMount } from "@vue/composition-api";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import {
  useProducts,
  useLead,
  useLanding,
  HeaderBrands as SHeaderBrands,
  Footer as SFooter,
} from "@smart-contact/smartify";
import CallMeBackModal from "./components/CallMeBackModal.vue";
import OverlayLoadingScreen from "./components/OverlayLoadingScreen.vue";
import AppHero from "./components/AppHero.vue";
import Vue from "vue";

export default defineComponent({
  name: "App",
  components: {
    CallMeBackModal,
    SHeaderBrands,
    SFooter,
    AppHero,
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
      products: this.products.items,
      redirectSelf: this.redirectSelf,
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
        src: `https://smart-contact-cdn.livelanding.it/images/${logoAccount}`,
        media: "(min-width: 768px)",
      },
      {
        src: `https://smart-contact-cdn.livelanding.it/images/${logoAccountMobile}`,
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

    const sendUpdatedData = (data) => {
      if (products.selected.value.data)
        Object.keys(products.selected.value.data).forEach((datum) => {
          landing.data.set(datum, products.selected.value.data[datum]);
        });
      if (products.selected.value.params)
        Object.keys(products.selected.value.params).forEach((param) => {
          landing.params.set(param, products.selected.value.params[param]);
        });
      sendLead(data);
    };

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
      $bvModal.show("call-me-back-modal-tiscali");
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

          optionalProductData.products.forEach((productData) => {
            const product = products.items.value.filter(
              (el) => el.id === productData.id
            )[0];
            Object.keys(productData).forEach((key) =>
              Vue.set(product, key, productData[key])
            );
          });
        });
    });

    return {
      products,
      sendUpdatedData,
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
a {
  color: currentColor !important;
}

#app {
  .b-overlay {
    min-height: calc(100vh - #{$s-header-brands-logo-height + (spacer(5) * 2)});

    div:nth-child(2) {
      width: 100%;
    }
  }

  .font-family-gotham {
    font-family: "gotham";
  }
}
 input::placeholder {
    font-size: 0.75em;
  }
  
#call-me-back-modal.modal .modal-content {
  color: $white;
  background-color: theme-color("tiscali");
}
</style>
