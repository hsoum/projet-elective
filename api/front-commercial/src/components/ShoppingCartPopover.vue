<template>
  <div class="cart-popover-wrapper">
    <shopping-cart class="cart" :items="items" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import type { ShoppingCartItem as CartItem } from '@/types'

export default defineComponent({
  name: 'ShoppingCartPopover',
  components: {
    ShoppingCart,
  },
  props: {
    items: {
      type: Array as PropType<CartItem[]>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.cart-popover-wrapper {
  z-index: 2;
  position: absolute;
  top: 100%;
  right: 0;
  cursor: default;
}

.cart {
  position: relative;
  top: 8px;
  width: 332px;
  box-shadow: 1px 1px 4px rgba($color: #000000, $alpha: 0.1);

  &::after {
    content: ' ';
    position: absolute;
    bottom: 100%;
    right: 28px;
    margin-left: -5px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent vars.$white
      transparent;
  }
}
</style>
