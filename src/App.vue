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

    <s-footer class="py-6 text-center">
      <span v-html="$landing.params.get('copyFooter')" />
    </s-footer>

    <s-call-me-back-modal
      id="call-me-back-modal"
      :call-me-back-form-options="$root.callMeBackFormOptions"
      v-on="modalEvents"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount } from "@vue/composition-api";
import {
  useProducts,
  useLead,
  HeaderBrands as SHeaderBrands,
  // CallMeBackForm as SCallMeBackForm,
  Footer as SFooter,
  CallMeBackModal as SCallMeBackModal,
} from "@smart-contact/smartify";

export default defineComponent({
  name: "App",
  components: {
    SHeaderBrands,
    // SCallMeBackForm,
    SFooter,
    SCallMeBackModal,
  },
  setup(_, context) {
    const { $landing, $bvModal } = context.root;
    const { logoAccountMobile, logoAccount, account } = $landing.params.get();
    const products = useProducts();
    const lead = useLead(context, {
      disableRecaptchaCheck: !$landing.params.get("useRecaptcha"),
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
      const { successURL } = $landing.params.get();
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
        $landing.data.set("buyer", products.selected.value.buyer.name);
        $landing.data.set("offer", products.selected.value.name);
      },
      hide: () => {
        $landing.data.restoreDefaults();
      },
    };

    onBeforeMount(() => {
      products.load({
        // collection: $landing.params.get('collection'),
        productsIds: $landing.params.get("products"),
      });
    });

    return {
      products,
      accountLogos,
      buyerLogo,
      lead,
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
</style>