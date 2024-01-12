<template>
  <section>
    <div class="logos">
      <div v-if="props.rightLogo">
        <picture>
          <source
            media="(min-width: 768px)"
            :srcset="props.rightLogo[0].src"
            alt="prezzogiusto"
            height="42"
            width="271"
          />
          <source
            media="(max-width: 767.98px)"
            :srcset="props.rightLogo[1].src"
            alt="prezzogiusto"
            width="150"
            height="30"
          />

          <img
            :src="props.rightLogo[0].src"
            alt="prezzogiusto"
            width="271"
            height="42"
          />
        </picture>
      </div>
      <div v-if="props.leftLogo">
        <picture>
          <source
            media="(min-width: 768px)"
            :srcset="props.leftLogo.src"
            alt=""
            height="40"
          />
          <source
            media="(max-width: 767.98px)"
            :srcset="props.leftLogo.src"
            alt=""
            height="30"
          />

          <img :src="props.leftLogo.src" alt="" />
        </picture>
      </div>
    </div>
  </section>
</template>
<script setup>
const props = defineProps({
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
