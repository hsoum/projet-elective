<template>
  <div
    aria-label="Toggle shopping cart"
    class="cart-modal"
    @click.self="$emit('close')"
  >
    <shopping-cart class="cart" :items="items" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import type { ShoppingCartItem } from '@/types'

export default defineComponent({
  name: 'ShoppingCartModal',
  components: {
    ShoppingCart,
  },
  props: {
    items: {
      type: Array as PropType<ShoppingCartItem[]>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.cart-modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 16px;

  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.6);
}

.cart {
  width: 332px;
}
</style>
