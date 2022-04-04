<template>
  <div class="call-me-back-form">
    <b-form
      @submit="onSubmit"
      class="call-me-back-form__form"
      :class="{
        'call-me-back-form__form--horizontal': layout === 'horizontal',
      }"
    >
      <b-form-group
        class="call-me-back-form__phone mb-0"
        data-form-item-id="phone"
        data-testid="phone-form-group"
        :state="getVuelidateState('data.phone')"
        :valid-feedback="validPhoneFeedback"
        :invalid-feedback="invalidPhoneFeedbackValue"
      >
        <b-form-input
          v-bind="phoneFieldAttrs"
          data-testid="phone"
          id="input-phone"
          name="phone"
          inputmode="tel"
          class="text-center"
          placeholder="Inserisci il tuo numero"
          :state="getVuelidateState('data.phone')"
          v-model="data.phone"
          @input="$v.data.phone.$touch()"
        />
      </b-form-group>

      <b-button
        @click="onSubmit"
        :variant="submitBtnVariant"
        class="call-me-back-form__cta shadow-sm"
        block
        :disabled="isLoading"
        ><slot name="cta" v-if="!isLoading"
          ><span>{{ submitBtnText }}</span></slot
        >
        <b-spinner
          style="height: 1em; width: 1em"
          v-show="isLoading"
          variant="white"
        ></b-spinner
      ></b-button>

      <div
        class="call-me-back-form__privacy smaller mb-4"
        v-html="$landing.params.get('copyPrivacy')"
      ></div>
    </b-form>
  </div>
</template>
<script>
import { isMobilePhone, isLandlinePhone } from "@smart-contact/validators";
import { vuelidateGetStateMixin } from "@/mixins";
export default {
  mixins: [vuelidateGetStateMixin],
  props: {
    layout: {
      type: String,
      default: "vertical",
    },
    invalidPhoneFeedback: {
      type: String,
      default: "Inserisci un numero di telefono corretto",
    },
    validPhoneFeedback: {
      type: String,
      default: "",
    },
    submitBtnVariant: {
      type: String,
      default: "primary",
    },
    submitBtnText: {
      type: String,
      default: "INVIA",
    },
    submitBtnClasses: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    spinnerType: {
      type: String,
      default: "border",
    },
    phoneFieldAttrs: {
      type: Object,
      default: () => ({}),
    },
    validatePhoneAs: {
      type: String,
      default: "mobile landline",
    },
  },
  data() {
    return {
      isLoading: false,
      invalidPhoneFeedbackValue: "",
      data: {
        phone: "",
      },
    };
  },
  validations() {
    const phone = {};
    if (this.validatePhoneAs === "landline") {
      phone.isLandlinePhone = isLandlinePhone;
    }
    if (this.validatePhoneAs === "mobile") {
      phone.isMobilePhone = isMobilePhone;
    }
    if (
      this.validatePhoneAs.includes("mobile") &&
      this.validatePhoneAs.includes("landline")
    ) {
      phone.isMobilePhone = (value) =>
        isLandlinePhone(value) || isMobilePhone(value);
    }
    return {
      data: {
        phone,
      },
    };
  },
  methods: {
    async onSubmit() {
      this.$v.data.$touch();
      if (!this.$v.data.$invalid) {
        this.isLoading = true;
        this.$emit("submit", this.data);
      } else {
        this.invalidPhoneFeedbackValue = this.invalidPhoneFeedback;
      }
    },
  },
};
</script>

<style lang="scss">
.was-validated .custom-file-input:invalid ~ .custom-file-label,
.custom-file-input.is-invalid ~ .custom-file-label {
  border-color: $primary !important;
}
.was-validated .custom-file-input:valid ~ .custom-file-label,
.custom-file-input.is-valid ~ .custom-file-label {
  background-color: #e9faff;
}
.is-valid > .custom-file-input ~ .custom-file-label[data-browse]::after {
  color: $success;
}
.call-me-back-form {
  &__form {
    display: flex;
    flex-direction: column;
    gap: spacer(4);
  }
  label:not(.custom-file > label) {
    font-size: 0.8rem;
    color: gray("600");
  }
  @include media-breakpoint-down("sm") {
    font-size: 2rem;
    label:not(.custom-file > label) {
      font-size: 1.2rem;
    }
  }

  @include media-breakpoint-up("md") {
    &__form {
      &--horizontal {
        display: grid;
        grid-template-areas:
          "phone cta"
          "privacy privacy";

        column-gap: spacer(4);
        grid-template-columns: 50% auto;
      }
    }
    &__phone {
      grid-area: phone;
    }

    &__privacy {
      grid-area: privacy;
    }

    &__cta {
      grid-area: cta;
    }
  }
}
</style>
