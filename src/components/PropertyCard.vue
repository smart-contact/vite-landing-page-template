<template>
  <div
    class="property text-center d-flex flex-md-column align-items-center justify-md-content-between"
  >
    <div class="property__icon mx-md-auto">
      <img :src="getImageUrl()" class="img-contain" />
    </div>
    <div
      class="property__title text-primary font-weight-bold"
      v-html="property.title"
    ></div>
  </div>
</template>

<script>
export default {
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
    width: $icon-size;
  }
  &__title {
    font-size: 1.5rem;
  }
}
</style>
