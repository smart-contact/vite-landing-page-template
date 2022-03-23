<template functional>
  <div
    class="card-convergenza d-flex flex-column align-items-center bg-white text-dark rounded p-2"
  >
    <div
      class="card-convergenza__title font-weight-bold text-tiscali text-uppercase"
    >
      {{ props.product.name }}
    </div>
    <div class="d-flex">
      <div>
        <img
          src="@/assets/images/img_convergenza.jpg"
          class="img-contain"
          alt="dispositivo convergenza"
        />
      </div>
      <div>
        <ul class="pl-4">
          <li
            v-for="(
              description, i
            ) in props.product.metadata.description_landing.split(' | ')"
            :key="i"
            v-html="description"
          ></li>
        </ul>
      </div>
    </div>
    <div
      class="card-convergenza__content__prices font-family-gotham text-tiscali font-weight-bold mt-auto mb-4"
    >
      <div class="card-convergenza__content__prices__int">
        {{ props.product.prices.default.int }}
      </div>
      <div class="card-convergenza__content__prices__cents">
        ,{{ props.product.prices.default.cents }}
      </div>
      <div class="card-convergenza__content__prices__monthly">AL MESE</div>
    </div>
  </div>
</template>
<style lang="scss">
.card-convergenza {
  font-size: 1rem;
  &__content {
    font-size: 0.75em;
    &__prices {
      display: grid;
      grid-template-areas:
        "int cents"
        "int monthly";
      justify-items: center;
      &__int {
        grid-area: int;
        font-size: 4.75em;
      }
      &__cents {
        grid-area: cents;
        font-size: 0.9em;
        align-self: flex-end;
      }
      &__monthly {
        grid-area: monthly;
        font-size: 0.9em;
      }
    }
  }
}
</style>
