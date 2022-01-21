<template>
  <section class="features">
    <div class="container"></div>
  </section>
</template>

<script>
import contents from "@/../contents.js";
export default {
  name: "AppFeatures",
  data() {
    return {
      offers: contents.features,
    };
  },
};
</script>

<style lang="scss">
// .features{}
</style>
