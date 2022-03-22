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

        <s-call-me-back-form
          layout="horizontal"
          v-bind="{
            ...callMeBackFormOptions,
            'submit-btn-variant': 'secondary',
          }"
          @submit="sendLead"
        >
          <b-button
            type="submit"
            size="sm"
            block
            :variant="submitBtnVariant"
            :class="[submitBtnClasses]"
            class="mt-4 mt-md-0"
            :disabled="loading"
          >
            <b-spinner v-show="loading" :type="spinnerType" />

            {{ submitBtnText }}
            <div class="small text-uppercase">Solo per nuovi clienti</div>
          </b-button>
        </s-call-me-back-form>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "AppHero",
  inject: ["sendLead"],
  props: {
    product: {
      type: Object,
      required: true,
    },
    callMeBackFormOptions: Object,
  },
});
</script>

<style lang="scss">
.hero {
  &__cmb {
    max-width: 60rem;

    .btn[type="submit"] {
      .small {
        font-size: 0.65em;
        line-height: 1.1;
      }
    }
  }

  @include media-breakpoint-down("sm") {
    background-image: linear-gradient(
        to bottom,
        transparent,
        rgba($black, 0.25) 80%,
        rgba($black, 0.95) 100%
      ),
      url("@/assets/images/bg-hero-mobile.webp");

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &__title {
      color: theme-color("secondary");
    }

    &__cmb {
      color: $white;
    }
  }

  @include media-breakpoint-up("md") {
    .container {
      background-position: right center;
      background-size: auto 100%;
      background-image: linear-gradient(90deg, #ffffff 30%, transparent 90%),
        url("@/assets/images/bg-hero.webp");
    }
  }
}
</style>
