<template>
  <div class="offer-box d-flex flex-column">
    <div
      class="offer-box__name border border-primary rounded text-center text-primary p-2 mb-2"
    >
      <strong>{{ product.name.replace("Full", "") }}</strong>
    </div>
    <div
      class="offer-box__content d-flex flex-column flex-grow-1 align-items-center bg-primary text-white rounded p-4 pb-7"
    >
      <div class="offer-box__content__features d-flex">
        <div>
          <ul>
            <li
              v-for="(
                description, i
              ) in product.metadata.description_landing.split(' | ')"
              :key="i"
              v-html="description"
            ></li>
          </ul>
        </div>
        <div v-if="product_convergenza" class="d-flex align-items-center">
          <div class="font-weight-bold mr-4" style="font-size: 3em">+</div>
          <card-convergenza :product="product_convergenza" />
        </div>
      </div>
      <div class="offer-box__content__prices font-size-gotham mt-auto mb-4">
        <div class="offer-box__content__prices__int font-weight-bold">
          {{ product.prices.default.int }}
        </div>
        <div class="offer-box__content__prices__cents font-weight-bold">
          ,{{ product.prices.default.cents }}
        </div>
        <div class="offer-box__content__prices__euros font-weight-bold">€</div>
        <div class="offer-box__content__prices__monthly">AL MESE</div>
      </div>
      <b-button v-html="buttonText"></b-button>
    </div>
  </div>
</template>
<script>
import CardConvergenza from "@/components/CardConvergenza.vue";
export default {
  name: "OfferBox",
  components: { CardConvergenza },
  props: {
    product: {
      required: true,
      type: Object,
    },
    product_convergenza: Object,
    buttonText: {
      type: String,
      default: "TI CHIAMIAMO NOI",
    },
  },
};
</script>
<style lang="scss">
.offer-box {
  flex: 1 0 20rem;
  font-size: 2rem;
  &__content {
    &__features {
      font-size: 0.6em;
      ul {
        li {
          img {
            height: 1.1em;
          }
        }
      }
    }
    &__prices {
      display: grid;
      grid-template-areas:
        "int cents"
        "int euros"
        "monthly monthly";

      &__int {
        grid-area: int;
        font-size: 2.75em;
      }
      &__cents {
        grid-area: cents;
        font-size: 1.1em;
        align-self: flex-end;
      }
      &__euros {
        grid-area: euros;
        font-size: 0.9em;
        justify-self: center;
      }
      &__monthly {
        grid-area: monthly;
        font-size: 0.5em;
        justify-self: center;
      }
    }
  }
}
</style>
