<template>
  <div class="property text-center">
    <div class="feature-card__icon">
      <img :src="getImageUrl()" class="img-contain" />
    </div>
    <div class="text-primary text-uppercase h6" v-html="property.title"></div>
    <div>
      {{ property.text }}
    </div>
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

<style lang="scss"></style>
