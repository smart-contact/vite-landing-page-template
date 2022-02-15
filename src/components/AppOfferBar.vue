<template>
  <section class="offer-bar bg-primary py-5">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="text-white">
        <div class="h4 text-uppercase" v-html="offerBar.title"></div>
        <div class="small" v-html="offerBar.text"></div>
      </div>
      <b-button>VERIFICA E ATTIVA</b-button>
    </div>
  </section>
</template>

<script>
import contents from "@/../contents";
export default {
  name: "AppOfferBar",
  data() {
    return {
      offerBar: contents.offerBar,
    };
  },
};
</script>

<style lang="scss">
.offer-bar {
  font-size: 2.25rem;
}
</style>
