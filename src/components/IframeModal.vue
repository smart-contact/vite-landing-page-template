<template>
  <div class="d-flex justify-content-center mt-5 text-tiscali h6">
    <a v-b-modal.modal-1>{{ iframeText }}</a>

    <b-modal id="modal-1" ok-only ok-title="Chiudi">
      <iframe
        src="https://casa.tiscali.it/comunicazioni/copertura_fibra.html"
        class="iframe"
      >
      </iframe>
    </b-modal>
  </div>
</template>

<script>
import contents from "@/../contents.js";
export default {
  data() {
    return {
      iframeText: contents.iframeText,
    };
  },
};
</script>

<style lang="scss">
.iframe {
  width: 100%;
  height: 300px;
}
</style>
