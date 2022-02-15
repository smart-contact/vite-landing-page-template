<template>
  <div class="offers">
    <offer-box
      v-for="(product, i) in products"
      :key="i"
      :product="product"
    ></offer-box>
  </div>
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
