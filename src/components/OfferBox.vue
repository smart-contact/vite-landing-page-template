<template>
  <div class="offer-box">{{ product }}</div>
</template>
<script>
export default {
  name: "OfferBox",
  props: {
    product: {
      required: true,
      type: Object,
    },
  },
};
</script>
