<template>
  <section class="offers">
    <div class="container">
      <div v-for="(offer, i) in offers" :key="i">
        <div class="h1">{{ offer.title }}</div>
        <div>{{ offer.text }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import contents from "@/../contents.js";
export default {
  name: "AppOffers",
  data() {
    return {
      offers: contents.offers,
    };
  },
};
</script>

<style lang="scss">
// .offers{}
</style>
