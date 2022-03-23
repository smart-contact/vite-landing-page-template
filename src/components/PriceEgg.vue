<template>
  <div class="price-egg p-5 position-relative">
    <div
      class="price-egg__prices font-weight-bold text-tiscali font-family-gotham"
    >
      <div class="price-egg__prices__int">{{ price.int }}</div>
      <div class="price-egg__prices__cents">,{{ price.cents }}</div>
      <div class="price-egg__prices__euro">{{ price.currency }}</div>
      <div class="price-egg__prices__monthly text-uppercase">
        al {{ price.invoicePeriod }}
      </div>
      <s-connection-stamps
        class="price-egg__stamps position-absolute"
        connection-type="ftth"
        size="2em"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PriceEgg",
  props: {
    price: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.price-egg {
  background-image: url("@/assets/images/egg-bg.webp");
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 13rem;
  font-size: 2rem;

  &__stamps {
    bottom: 0;
    right: -0.5rem;
  }

  &__prices {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "int cents"
      "int euro"
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
    &__euro {
      grid-area: euro;
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
</style>
