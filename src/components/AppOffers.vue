<template>
  <section class="offers py-4">
    <div
      class="container offers d-flex flex-column flex-md-row justify-content-md-center gap-10"
    >
      <offer-box
        :product="products[0]"
        :product_convergenza="products[2]"
      ></offer-box>
      <offer-box :product="products[1]"></offer-box>
    </div>
  </section>
</template>
<script>
import OfferBox from "@/components/OfferBox.vue";
export default {
  name: "AppOffers",
  components: { OfferBox },
  props: {
    products: {
      required: true,
      type: Array,
    },
  },
};
</script>
