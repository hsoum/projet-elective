<template>
  <div class="cart">
    <p class="cart__title">Mon panier :</p>
    <div class="cart__item-list">
      <shopping-cart-item
        v-for="item in items"
        v-bind="item"
        :key="item.id"
      />
    </div>
    <div class="cart__subtotal">
      <p>Subtotal:</p>
      <p>${{ formatPrice(shoppingCartSubTotal) }}</p>
    </div>

    <router-link
      :to="{ name: 'Checkout' }"
      class="btn btn--green btn--full cart__btn"
    >
      To checkout
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
import { mapGetters } from 'vuex'
import type { ShoppingCartItem as CartItem } from '@/types'

export default defineComponent({
  name: 'ShoppingCartPopover',
  components: {
    ShoppingCartItem,
  },
  props: {
    items: {
      type: Array as PropType<CartItem[]>,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['shoppingCartSubTotal']),
  },
  methods: {
    formatPrice(price: number): string {
      return price.toFixed(2)
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.cart {
  position: relative;
  background-color: vars.$white;
  border-radius: vars.$border-radius-big;
  padding: 24px;

  &__title {
    text-align: left;
    margin-bottom: 16px;
    font-weight: bold;
  }

  &__item-list {
    max-height: 40vh;
    overflow-y: auto;
  }

  &__subtotal {
    display: flex;
    margin-top: 16px;
    font-weight: bold;
    justify-content: space-between;

    * {
      font-size: 1.8rem;
    }
  }

  &__btn {
    font-weight: bold;
    margin-top: 20px;
  }
}
</style>
