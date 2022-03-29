<template>
  <section class="offer-bar py-2">
    <div
      class="
        container
        bg-tiscali
        p-5
        d-flex
        justify-content-around
        align-items-center
      "
    >
      <div class="text-white">
        <div class="text-uppercase" v-html="offerBar.title"></div>
        <div class="small" v-html="offerBar.text"></div>
      </div>
      <b-button variant="primary" @click="onButtonClick('openModal')"
        >SCOPRI DI PIU'</b-button
      >
    </div>
  </section>
</template>

<script>
import contents from "@/../contents";
export default {
  name: "AppOfferBar",
  inject: ["onProductSelected"],
  data() {
    return {
      offerBar: contents.offerBar,
      redirectURL: contents.redirectURLS.base,
    };
  },
  methods: {
    onButtonClick(option) {
      switch (option) {
        case "redirectSelf":
          this.$emit("redirectSelf", this.redirectURL);
          break;
        default:
          this.onProductSelected(0);
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.offer-bar {
  font-size: 2.25rem;
}
</style>