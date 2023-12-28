<template>
  <footer class="footer mt-6 py-6" data-testid="footer">
    <div class="container">
      <div class="logo d-flex justify-content-center">
        <img
          src="https://smart-contact-cdn.livelanding.it/images/logo-leMiglioriOfferte-horizontal.png"
          alt="logo MiglioriOfferte"
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
  font-size: 1rem;
  font-weight: 300;
  .logo {
    $img-size: 3rem;
    img {
      height: $img-size;
      margin: 0 spacer(6);
    }
  }
  a {
    color: black;
  }
}
</style>
