<template>
  <div class="call-me-back-form">
    <b-form @submit="onSubmit" class="call-me-back-form__form">
      <b-form-group
        class="call-me-back-form__phone"
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

      <form-privacy
        class="call-me-back-form__privacy mb-4"
        data-form-item-id="privacies"
        showAllPrivacies="true"
        :schema="privacySchema"
        v-bind="privaciesResolvedOptions"
        :state="$v.data.privacies"
        v-model="data.privacies"
        collapseToggleText=""
        @click.native="$v.data.privacies.$touch()"
      />

      <b-button
        @click="onSubmit"
        :variant="submitBtnVariant"
        class="call-me-back-form__cta shadow-sm"
        :class="submitBtnClasses"
        block
        :disabled="isLoading"
        ><span v-if="!isLoading"> {{ submitBtnText }}</span>
        <b-spinner v-show="isLoading" variant="white"></b-spinner
      ></b-button>
    </b-form>
  </div>
</template>
<script>
import { merge } from "lodash-es";
import { FormPrivacy } from "@smart-contact/smartify";
import { isMobilePhone, isLandlinePhone } from "@smart-contact/validators";
import { privaciesFormSchemasMixin, vuelidateGetStateMixin } from "@/mixins";

const defaults = {
  privaciesOptions: {
    uncheckedValue: 0,
    checkedValue: 1,
  },
};
export default {
  props: {
    layout: {
      type: String,
      default: "vertical",
    },
    privacySchemaIndex: {
      type: Number,
      default: 0,
    },
    privaciesOptions: {
      type: Object,
      default: () => ({}),
      //todo add a schema validation
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
      default: "mobile",
    },
  },
  data() {
    return {
      isLoading: false,
      invalidNameFeedbackValue: "",
      invalidSurnameFeedbackValue: "",
      invalidPhoneFeedbackValue: "",
      data: {
        phone: "",
        privacies: {
          privacy_1: 0,
          privacy_2: 0,
        },
      },
    };
  },
  mixins: [privaciesFormSchemasMixin, vuelidateGetStateMixin],
  computed: {
    privacySchema() {
      return this.privaciesFormSchemas[this.privacySchemaIndex];
    },
    privaciesResolvedOptions() {
      return merge(defaults.privaciesOptions, this.privaciesOptions);
    },
    layoutClass() {
      return `cmb-form--${this.layout}`;
    },
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
        privacies: this.privacySchema.getValidations(),
      },
    };
  },
  components: {
    FormPrivacy,
  },
  methods: {
    async onSubmit() {
      this.$v.data.$touch();
      if (!this.$v.data.$invalid) {
        this.isLoading = true;
        this.$emit("submit", this.data);
      } else {
        this.invalidNameFeedbackValue = this.invalidNameFeedback;
        this.invalidSurnameFeedbackValue = this.invalidSurnameFeedback;
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
  label:not(.custom-file > label) {
    font-size: 0.8rem;
  }
  @include media-breakpoint-down("sm") {
    font-size: 2rem;
    label:not(.custom-file > label) {
      font-size: 1.2rem;
    }
    .custom-control-input {
      padding: 2rem;
    }
  }
  @include media-breakpoint-up("lg") {
    &__form {
      display: grid;
      grid-template-areas:
        "phone cta"
        "privacy privacy";
      gap: spacer(5);
      grid-template-columns: 1fr 1fr;
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
