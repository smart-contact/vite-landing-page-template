<template>
  <section class="hero">
    <div class="container py-7">
      <h1 class="hero__title" v-html="$landing.params.get('copyTitle')" />

      <div
        class="hero__subtitle"
        v-html="$landing.params.get('copySubtitle')"
      />

      <div class="hero__cmb">
        <div
          class="text-uppercase text-md-left text-center font-weight-bold mb-2"
        >
          Richiedi maggiori informazioni
        </div>

        <call-me-back-form
          layout="horizontal"
          v-bind="{
            ...callMeBackFormOptions,
            'submit-btn-variant': 'secondary',
          }"
          @submit="sendLead"
        >
        </call-me-back-form>
      </div>
    </div>
  </section>
</template>

<script>
import CallMeBackForm from "@/components/CallMeBackForm.vue";

export default {
  name: "AppHero",
  inject: ["sendLead"],
  components: { CallMeBackForm },
  props: {
    product: {
      type: Object,
      required: true,
    },
    callMeBackFormOptions: Object,
  },
};
</script>

<style lang="scss">
.hero {
  background-image: url("@/assets/images/bg-hero-mobile.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @include media-breakpoint-down("sm") {
    &__title {
      color: theme-color("secondary");
    }
  }
}
</style>
