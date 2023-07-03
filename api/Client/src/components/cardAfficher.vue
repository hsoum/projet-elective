<template>
    <div class="card">
      <div class="card__image-wrapper">
        <img class="card__image" :src="imageURL" :alt="`${name} image`" />
        <button class="card__add-btn" @click="addProduct" aria-label="Add product">
          <base-icon class="card__btn-icon white-icon" name="plus" :size="18" />
        </button>
      </div>
  
      <div class="card__content">
        <div class="card__info">
          <div class="card__name-rate">
            <h1 class="card__name">{{ name }}</h1>
            <div class="card__rate">
              <base-icon class="card__star" name="star" />
              {{ rate }}/5
            </div>
          </div>
          <div class="card__price">
            <div v-if="oldPrice" class="card__old-price">
              {{ formatPrice(oldPrice) }}
            </div>
            <div
              class="card__current-price"
              :class="{ 'card__current-price--sale': oldPrice }"
            >
              $ {{ formatPrice(currentPrice) }}
            </div>
            <div class="card__unit">/ {{ unit }}</div>
          </div>
        </div>
      </div>
    </div>
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
  .card__image-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%; /* Ratio d'aspect pour conserver le rapport largeur/hauteur */
  }
  
  .card__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card__add-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
    opacity: 0.8;
  }
  
  .card__add-btn:hover {
    opacity: 1;
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  
  .white-icon {
    font-size: 19px;
    color: white;
  }
  .card__content {
    width: 100%;
    padding: 14px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none; /* Supprimer le cadre */
  }
  
  .card__info {
    margin-top: 8px;
    text-align: center;
    width: 100%; /* Permet de mettre le nom et la note sur la même ligne */
    display: flex;
    flex-direction: column; /* Afficher les éléments en colonne */
    align-items: center;
  }
  
  .card__name-rate {
    display: flex;
    align-items: center;
  }
  
  .card__name {
    font-family: Gilroy;
    font-size: 2.4rem;
    margin: 0;
    margin-right: 8px; /* Ajout d'une marge pour séparer le nom du taux */
  }
  
  .card__rate {
    font-size: 1.2rem;
  }
  
  .card__price {
    text-align: center;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .card__old-price {
    font-size: 1.2rem;
    text-decoration: line-through;
  }
  
  .card__current-price {
    font-size: 1.4rem;
    color: #333;
  
    &--sale {
      color: #f00;
    }
  }
  
  .card__unit {
    font-size: 1.2rem;
    color: #888;
  }

  </style>
  