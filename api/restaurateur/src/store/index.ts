import { createStore } from 'vuex'
import { getCurrentPrice } from '@/utils'
import type { ShoppingCartItem } from '@/types'

export default createStore({
  state: {
    shoppingCart: [] as ShoppingCartItem[],
    deliveryPrice: 8.2,
  },

  getters: {
    shoppingCartSubTotal(state) {
      const reducer = (
        total: number,
        item: ShoppingCartItem,
      ) => {
        const currentPrice = getCurrentPrice(item.price)

        if (currentPrice) {
          return total + currentPrice * item.quantity
        }
        return total
      }

      return state.shoppingCart.reduce(reducer, 0)
    },

    shoppingCartTotal(state, getters) {
      const subTotal = getters.shoppingCartSubTotal
      if (!subTotal) return 0
      return subTotal + state.deliveryPrice
    },
  },

  actions: {
    addProductToCart(
      { state, commit },
      product: ShoppingCartItem,
    ) {
      const existingItem = state.shoppingCart.find(
        (item) => item.id === product.id,
      )

      if (existingItem) {
        commit('incrementProductQuantity', product)
      } else {
        commit('addProductToCart', product)
      }
    },

    removeProductFromCart({ commit }, id) {
      commit('removeProductFromCart', { id })
    },

    incrementProductQuantity({ commit }, id) {
      commit('incrementProductQuantity', { id })
    },

    decrementProductQuantity({ state, commit }, id) {
      const item = state.shoppingCart.find(
        (item) => item.id === id,
      )

      if (item && item.quantity > 1) {
        commit('decrementProductQuantity', { id })
      }
    },
  },

  mutations: {
    addProductToCart(state, product: ShoppingCartItem) {
      product.quantity = 1
      state.shoppingCart.push(product)
    },

    removeProductFromCart(state, { id }) {
      const productIndex = state.shoppingCart.findIndex(
        (item) => item.id === id,
      )
      state.shoppingCart.splice(productIndex, 1)
    },

    incrementProductQuantity(state, { id }) {
      const productIndex = state.shoppingCart.findIndex(
        (item) => item.id === id,
      )
      state.shoppingCart[productIndex].quantity++
    },

    decrementProductQuantity(state, { id }) {
      const productIndex = state.shoppingCart.findIndex(
        (item) => item.id === id,
      )
      state.shoppingCart[productIndex].quantity--
    },
  },
})
