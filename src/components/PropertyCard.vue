<template>
  <div class="property bg-primary text-center">
    <div>
      {{ property.title }}
    </div>
    <div>
      {{ property.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
