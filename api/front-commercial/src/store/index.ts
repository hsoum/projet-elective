import { createStore } from 'vuex'
import { getCurrentPrice } from '@/utils'
import type { ShoppingCartItem } from '@/types'
import VuexPersistence from "vuex-persist"

const vuexLocal = new VuexPersistence({
  key: "cesi-eat-client",
  storage: window.localStorage,
  saveState(key, data, storage) {
    console.log({ key, data })
    storage.setItem(key, JSON.stringify(data))
  },
  restoreState(key, storage) {
    const data = JSON.parse(storage.getItem(key))
    console.log({ data })
    if (data && data.auth.refereshToken) {
      return data;
    }
    return {}
  },
  filter: (mutation) => mutation.type == 'login' || mutation.type == 'logout',
  modules: ['auth']
});


export default createStore({
  state: {
    shoppingCart: [] as ShoppingCartItem[],
    deliveryPrice: 8.2,
    auth: {
      jwt: null,
      refereshToken: null,
      current_user: null,
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.auth.jwt != null;
    },
    GetToken(state) {
      return state.auth.jwt;
    },
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
    login(state, payload) {
      state.auth.jwt = payload.accessToken;
      state.auth.refereshToken = payload.refreshToken;
      state.auth.current_user = payload.userinfo;
      let d = new Date(state.auth.current_user.dateDeNaissance);
      state.auth.current_user.dateDeNaissance =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
        "-" +
        d.getDate();
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
  plugins: [vuexLocal.plugin],
})
