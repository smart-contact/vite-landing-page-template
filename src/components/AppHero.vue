<template functional>
  <section class="hero py-7" :class="[data.class, data.staticClass]">
    <div class="container">
      <span
        class="d-inline-block py-1 px-8 rounded-pill bg-secondary text-uppercase"
      >
        <b>Promo online!</b>
      </span>

      <h1
        class="hero__title text-border-dark mt-3 mb-0"
        v-html="parent.$landing.params.get('copyTitle')"
      />

      <div
        class="hero__subtitle text-uppercase font-weight-bold my-5"
        v-html="parent.$landing.params.get('copySubtitle')"
      />

      <div class="price-banner font-weight-bold position-relative mt-4 mb-6">
        <div class="text-primary text-uppercase mb-2">Attivazione inclusa</div>
        <div class="px-3 py-2 price-banner__band text-uppercase text-white">
          E Modem super <br />
          wi-fi gratis
        </div>
        <div
          class="price-banner__price-glob position-absolute text-secondary font-weight-normal"
        >
          <div class="int">{{ props.product.prices.default.int }}</div>
          <div class="cents text-border-secondary">
            ,{{ props.product.prices.default.cents }}
          </div>
          <div class="currency">
            {{ props.product.prices.default.currency }}
          </div>
          <div class="billing-period text-uppercase text-center">
            al
            {{ props.product.prices.default.invoicePeriod }}
          </div>
        </div>
        <div class="d-flex align-items-center gap-2 my-3 small">
          <s-connection-stamps connection-type="ftth" size="2em" />
          Offerta soggetta a limiti <br />
          geografici e tecnologici
        </div>
      </div>

      <div class="hero__cmb">
        <div
          class="text-uppercase text-md-left text-center font-weight-bold mb-2"
        >
          Richiedi maggiori informazioni
        </div>

        <s-call-me-back-form
          layout="horizontal"
          v-bind="{
            ...props.callMeBackFormOptions,
            'submit-btn-variant': 'secondary',
          }"
          @submit="listeners.submit && listeners.submit($event)"
        >
          <template
            #submit-btn="{
              submitBtnText,
              submitBtnClasses,
              submitBtnVariant,
              loading,
              spinnerType,
            }"
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
          </template>
        </s-call-me-back-form>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "AppHero",

  props: {
    price: {
      type: Object,
      required: true,
    },
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

  .price-banner {
    &__band {
      background-image: linear-gradient(
        270deg,
        #5f599f 20%,
        rgba(#6d599f, 0.5) 110%
      );
      font-size: 1.75rem;
      padding-right: 5rem;
      max-width: 90%;
    }

    &__price-glob {
      &::before {
        content: "";
        position: absolute;
        width: 115%;
        aspect-ratio: 1 / 0.75;
        background-image: url("@/assets/images/glob.webp");
        background-repeat: no-repeat;
        background-size: contain;
        z-index: -1;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
      }

      right: -1rem;
      transform: translateY(-65%);

      padding: spacer(6);

      display: grid;
      grid-template-areas:
        "int cents"
        "int currency"
        "period period";
      line-height: 0.95;
      font-size: 2.125rem;
      text-shadow: 0 4px 2px rgba($black, 0.25);

      .int {
        grid-area: int;
        font-size: 2.2em;
      }

      .cents {
        grid-area: cents;
        color: transparent;
      }

      .currency {
        grid-area: currency;
      }

      .billing-period {
        grid-area: period;
        font-size: 0.75em;
      }
    }
  }

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
    &__title {
      color: theme-color("secondary");
    }

    &__cmb {
      color: $white;
    }
  }

  @include media-breakpoint-up("md") {
    background-position: right center;
    background-size: auto 100%;
    background-image: linear-gradient(90deg, #ffffff 30%, transparent 90%),
      url("@/assets/images/bg-hero.webp");

    &__title {
      max-width: 55rem;
    }

    .price-banner {
      max-width: 40rem;
    }
  }
}
</style>
