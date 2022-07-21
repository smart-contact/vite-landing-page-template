<template>
  <b-modal
    :id="modalID"
    hide-footer
    body-bg-variant="tiscali"
    hide-header
    body-text-variant="white"
    @show="$emit('show', $event)"
    @hide="$emit('hide', $event)"
  >
    <template #default="{ close }">
      <b-button-close class="text-white" @click="close" />
      <div class="modal__content">
        <div class="my-4 modal__title font-weight-bold">
          <slot name="title ">{{ title }}</slot>
        </div>
        <div class="modal__subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </div>
        <div class="modal__description py-5" v-html="description"></div>

        <call-me-back-form
          layout="horizontal"
          @submit="$emit('submit', $event)"
          v-bind="callMeBackFormOptions"
        >
          <span slot="cta"
            ><b-icon icon="telephone-fill" />TI CHIAMIAMO NOI</span
          >
          ></call-me-back-form
        >
      </div>
    </template>
  </b-modal>
</template>

<script>
import CallMeBackForm from "@/components/CallMeBackForm.vue";
export default {
  inject: ["callMeBackFormOptions"],
  components: {
    CallMeBackForm,
  },
  props: {
    title: {
      type: String,
      default: "Richiedi maggiori informazioni",
    },
    modalID: {
      type: String,
      default: "call-me-back-modal",
    },
    subtitle: {
      type: String,
      default: "Sarai richiamato GRATIS e senza impegno",
    },
    description: {
      type: String,
    },
    callMeBackFormOptions: {
      type: Object,
      default: () => ({
        "phone-field-attrs": {
          placeholder: "Inserisci il tuo numero di cellulare",
          class: "text-center",
        },
        "submit-btn-classes": "text-uppercase",
        "submit-btn-variant": "primary",
        "submit-btn-text": "TI CHIAMIAMO NOI",
      }),
    },
  },
};
</script>

<style lang="scss">
#call-me-back-modal.modal {
  .modal {
    &__content {
      flex: 1 1 50%;
    }
  }

  .modal__title {
    font-size: 2.5rem;
  }
  .modal__subtitle {
    font-size: 1.8rem;
  }
  .modal__description {
    font-size: 1.4rem;
  }
  .close {
    float: none;
    position: absolute;
    right: 2rem;
    top: 2.5rem;
  }
}
</style>
