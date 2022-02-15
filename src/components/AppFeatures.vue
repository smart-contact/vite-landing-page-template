<template>
  <section class="features py-md-7">
    <div class="container py-7">
      <h2 class="h5 font-weight-normal text-center px-6 mb-4">
        E se acquisti anche l’offerta <b>Tiscali Mobile</b> con 100 GB, minuti illimitati e 100 SMS <b>a soli 7,99€/mese,</b> la <b>Fibra fino a 1 Giga</b> ti costa <b>solo {{ productPromoPrice }}</b>€<b>/mese</b> e hai anche le <b>chiamate incluse!</b>
      </h2>

      <div class="features__call-to-action text-center mt-7">

        <b-button
          :variant="ctaVariant"
          class="text-uppercase"
          @click="$bvModal.show('call-me-back-modal')"
        >
          <b-icon icon="telephone-fill" />
          Ti chiamiamo noi
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";

export default defineComponent({
  name: "AppFeatures",
  props: {
    productPrice: [Number, String],
    productPromoPrice: [Number, String],
    features: [Array],
  },

  setup() {
    const breakpoints = useBreakpoints(breakpointsBootstrapV5);
    const ctaVariant = computed(() =>
      breakpoints.smaller("md").value ? "primary" : "secondary"
    );

    return {
      ctaVariant,
    };
  },
});
</script>

<style lang="scss">
.features {

  &__call-to-action {
    .btn {
      min-width: 32rem;
    }
  }

  @include media-breakpoint-up("md") {
    // color: color("white");

    // .container {
    //   background-color: theme-color("primary");
    // }

    .feature-card {
      flex: 0 1 30rem;
    }
  }
}
</style>
