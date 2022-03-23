w
<template>
  <section class="ookla-banner">
    <div class="container d-flex align-items-center gap-4 pl-sm-0">
      <div class="ookla-banner__badge">
        <img
          src="@/assets/images/ookla-badge-dark.png"
          alt="ookla speedtest"
          class="img-h-contain"
        />
      </div>
      <div
        class="ookla-banner__content d-flex flex-column justify-content-center text-center py-6 px-md-8"
      >
        <div
          class="ookla-banner__content__title font-weight-bold text-tiscali text-uppercase"
          v-html="ookla.title"
        ></div>
        <div
          class="ookla-banner__content__description d-none d-md-block px-8 mb-0"
          v-html="ookla.description"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import contents from "@/../contents.js";
export default defineComponent({
  name: "AppOoklaBanner",
  data() {
    return {
      ookla: contents.ookla,
    };
  },
});
</script>

<style lang="scss">
.ookla-banner {
  &__badge,
  &__content {
    height: 12rem;
  }

  &__content {
    font-size: 1.4rem;
    background-color: #f8f8f8;
    &__description {
      color: #525252;
      font-size: 0.8em;
    }
  }
}
</style>
