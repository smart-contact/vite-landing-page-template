<template>
  <div
    class="property text-center d-flex flex-md-column align-items-center justify-md-content-between"
  >
    <div class="property__icon mx-md-auto">
      <img :src="getImageURL()" class="img-contain" />
    </div>
    <div
      class="property__title text-tiscali font-weight-bold"
      v-html="property.title"
    ></div>
  </div>
</template>

<script>
import { getImgURLMixin } from "@/mixins";

export default {
  mixins: [getImgURLMixin],
  methods: {
    getImageUrl: function () {
      return new URL(
        `../assets/images/${this.property.icon}.webp`,
        import.meta.url
      ).href;
    },
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
$icon-size: 15rem;
.property {
  &__icon {
    max-width: $icon-size;
  }
  &__title {
    font-size: 1.5rem;
  }
}
</style>
