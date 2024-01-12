<template>
  <section>
    <div class="logos">
      <div v-if="rightLogo">
        <picture>
          <source
            media="(min-width: 768px)"
            :srcset="rightLogo[0].src"
            alt="prezzogiusto"
            height="42"
            width="271"
          />
          <source
            media="(max-width: 767.98px)"
            :srcset="rightLogo[1].src"
            alt="prezzogiusto"
            width="150"
            height="30"
          />

          <img
            :src="rightLogo[0].src"
            alt="prezzogiusto"
            width="271"
            height="42"
          />
        </picture>
      </div>
      <div v-if="leftLogo">
        <picture>
          <source
            media="(min-width: 768px)"
            :srcset="leftLogo.src"
            alt=""
            height="40"
          />
          <source
            media="(max-width: 767.98px)"
            :srcset="leftLogo.src"
            alt=""
            height="30"
          />

          <img :src="leftLogo.src" alt="" />
        </picture>
      </div>
    </div>
  </section>
</template>
<script setup>
defineProps({
  leftLogo: {
    type: [Object, Array],
    default: null,
  },
  rightLogo: {
    type: [Object, Array],
    default: null,
  },
});
</script>

<style lang="scss">
.logos {
  max-width: 1150px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include media-breakpoint-only("md") {
    max-width: 720px;
  }
}
</style>
