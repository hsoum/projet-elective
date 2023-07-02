<template>
  <article class="card">
    <div class="card__image-wrapper">
      <img
        class="card__image"
        :src="imageURL"
        :alt="` ${name} image`"
      />
    </div>

    <div class="card__rate">
      <base-icon class="card__star" name="star" />
      {{ rate }}/5
    </div>


    <p class="card__name">{{ name }}</p>

    <button
      class="btn card__btn"
      @click="addProduct"
      aria-label="Add product"
    >
      <p class="card__btn-label">Add</p>
      <base-icon name="plus" :size="18" />
    </button>

    <div class="card-prices">
      <div v-if="oldPrice" class="card-prices__old">
        {{ formatPrice(oldPrice) }}
      </div>
      <div
        class="card-prices__current"
        :class="{ 'card-prices__current--sale': oldPrice }"
      >
        $ {{ formatPrice(currentPrice) }}
      </div>
      <div class="card-prices__unit">/ {{ unit }}</div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  getSalePrice,
  getRegularPrice,
  getCurrentPrice,
} from '@/utils'
import type { PropType } from 'vue'
import type { ProductPrice } from '@/types'

export default defineComponent({
  name: 'ProductCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Array as PropType<ProductPrice[]>,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  computed: {
    salePrice(): number | undefined {
      return getSalePrice(this.price)
    },
    regularPrice(): number | undefined {
      return getRegularPrice(this.price)
    },
    oldPrice(): number | undefined {
      if (this.salePrice) {
        return this.regularPrice
      }
      return undefined
    },
    currentPrice(): number | undefined {
      return getCurrentPrice(this.price)
    },
  },
  methods: {
    formatPrice(price: number | undefined): string {
      return price ? price.toFixed(2) : '0.00'
    },
    addProduct() {
      this.$store.dispatch('addProductToCart', {
        id: this.id,
        imageURL: this.imageURL,
        name: this.name,
        price: this.price,
        unit: this.unit,
        rate: this.rate,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.card {
  background-color: vars.$white;
  white-space: normal;
  padding: 14px;
  border-radius: vars.$border-radius-big;
  margin-top: 20px;
  margin-right: 24px;
  display: inline-grid;
  grid-template-rows: repeat(3, 44px);
  grid-template-columns: 54px 24px 54px;
  grid-template-areas:
    'img  img  rate'
    'name name name'
    'btn  btn  prices';

  &__image-wrapper {
    position: relative;
    border-radius: 50%;
    background-color: transparent;
    filter: drop-shadow(5px 5px 5px rgb(170, 170, 170));
    max-height: 72px;
    max-width: 72px;
    grid-area: img;
    justify-self: start;
    align-self: end;
  }

  &__image {
    width: 100%;
    height: auto;
  }

  &__star {
    display: block;
    margin: 0 0 4px 0;
    color: vars.$green;
  }

  &__rate {
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-area: rate;
    align-self: center;
    justify-self: center;
    color: vars.$green;
    font-weight: bold;
    font-size: 1.4rem;
  }

  &__sale-label {
    grid-area: img;
    background-color: vars.$red;
    color: vars.$white;
    padding: 4px;
    border-radius: vars.$border-radius;
    align-self: end;
    justify-self: center;
    font-size: 1rem;
    font-weight: bold;
    transform-origin: top left;
    transform: translate(-4px, 0px) rotate(10deg);
  }

  &__name {
    grid-area: name;
    align-self: center;
    justify-self: start;
    font-family: Gilroy;
    margin-top: 12px;
    font-size: 1.4rem;
  }

  &__btn {
    grid-area: btn;
    border: 1px solid vars.$dark-cream;
    padding: 8px;
    justify-self: start;
    align-self: end;
  }

  &__btn-label {
    display: none;
  }
}

.card-prices {
  justify-self: end;
  align-self: end;
  text-align: right;
  font-weight: bold;

  &__old {
    font-size: 1.2rem;
    text-decoration: line-through;
  }

  &__current {
    font-size: 1.4rem;

    &--sale {
      color: vars.$red;
    }
  }

  &__unit {
    font-size: 1.2rem;
    color: vars.$gray;
  }
}

/*------------------------------------------------
  MEDIA QUERIES
------------------------------------------------*/
@media screen and (min-width: 640px) {
  .card {
    padding: 24px;
    margin-top: 40px;
    grid-template-rows: repeat(3, 58px);
    grid-template-columns: 90px 30px 90px;
    grid-template-areas:
      'img  img  rate'
      'name name name'
      'btn  btn  prices';

    &__image-wrapper {
      max-height: 120px;
      max-width: 120px;
      grid-area: img;
      justify-self: start;
      align-self: end;
    }

    &__star {
      display: block;
      margin: 0 4px 0 0;
      color: vars.$green;
    }

    &__rate {
      display: flex;
      flex-direction: row;
      align-items: center;
      grid-area: rate;
      align-self: start;
      justify-self: end;
      font-size: 1.4rem;
    }

    &__sale-label {
      grid-area: rate;
      padding: 8px;
      align-self: end;
      justify-self: end;
      font-size: 1.2rem;
      transform: translate(4px, 2px) rotate(10deg);
    }

    &__name {
      grid-area: name;
      align-self: center;
      justify-self: start;
      font-size: 1.8rem;
      margin-top: 12px;
    }

    &__btn {
      grid-area: btn;
      padding: 12px;
      justify-self: start;
      align-self: end;
    }

    &__btn-label {
      display: block;
      margin-right: 12px;
    }
  }

  .card-prices {
    &__old {
      font-size: 1.4rem;
    }

    &__current {
      font-size: inherit;
    }

    &__unit {
      font-size: 1.4rem;
    }
  }
}
</style>
