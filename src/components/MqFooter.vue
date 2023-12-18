<template>
  <footer class="footer mt-6 py-6" data-testid="footer">
    <div class="container">
      <div class="logo d-flex justify-content-center">
        <img
          src="https://smart-contact-cdn.livelanding.it/images/logo-meglioQuesto-mobile.png"
          alt="logo MeglioQuesto"
        />
      </div>
      <div class="text-center mt-6" v-html="params.copyFooter"></div>
    </div>
  </footer>
</template>

<script setup>
import { inject } from "vue";
const params = inject("params");
</script>

<style lang="scss">
.footer {
  background-color: #f5f5f5;
  font-size: 1rem;
  font-weight: 300;
  .logo {
    $img-size: 3rem;
    img {
      height: $img-size;
      margin: 0 spacer(6);
    }
    &:before,
    &:after {
      content: "";
      height: 3px;
      width: 16rem;
      margin-top: calc(#{$img-size} / 2);
    }
    &:before {
      background: #1799cc;
    }
    &:after {
      background: #e20613;
    }
  }
  a {
    color: black;
  }
}
</style>
