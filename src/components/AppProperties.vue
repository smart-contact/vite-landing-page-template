<template>
  <section class="properties py-6">
    <div class="container">
      <div
        class="properties__content d-flex flex-column justify-content-between flex-md-row gap-4"
      >
        <property-card
          v-for="(property, i) in properties"
          :key="i"
          :property="property"
        />
      </div>
    </div>
  </section>
</template>

<script>
import PropertyCard from "@/components/PropertyCard.vue";
import contents from "@/../contents";
export default {
  data() {
    return {
      properties: contents.properties,
    };
  },
  components: {
    PropertyCard,
  },
};
</script>

<style lang="scss">
.properties {
  .property {
    flex: 1;
  }
}
</style>
