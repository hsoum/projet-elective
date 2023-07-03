<template>
  <body style="background-color: white">
    <main>
      <nav
        class="relative px-4 py-4 flex justify-between items-center bg-white"
      >
        <a class="text-3xl font-bold leading-none" href="#">
          <img src="/img/CESIeats.png" />
        </a>

        <ul
          class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6"
        >
          <li>
            <a
              class="text-sm text-blue-600 font-bold"
              href="/Home"
              >Dashboard</a
            >
          </li>
          <li class="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              class="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <router-link
              class="text-sm text-gray-400 hover:text-gray-500"
              to="/Users"
            >
              Gestion des clients
            </router-link>
          </li>
          <li class="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              class="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <router-link
              class="text-sm text-gray-400 hover:text-gray-500"
              to="/Stat"
              >Statistiques</router-link
            >
          </li>
          <li class="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              class="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
        </ul>
        <form @submit.prevent="logout">

          <button class="btn desktop__btn" type="submit">Se deconnecter</button>
        </form>
      </nav>

      <div class="mt-12 flex justify-center space-x-4">
        <div
          class="stats stats-vertical lg:stats-horizontal shadow"
        >
          <div class="stat">
            <div class="stat-title">Total commandes</div>
            <div class="stat-value">{{totalA}}</div>
            <div class="stat-desc"></div>
          </div>

          <div class="stat">
            <div class="stat-title">Commandes effectués </div>
            <div class="stat-value">{{totalB}}</div>
            <div class="stat-desc"></div>
          </div>

          <div class="stat">
            <div class="stat-title">Commandes non effectués</div>
            <div class="stat-value">{{totalC}}</div>
            <div class="stat-desc"></div>
          </div>
        </div>
      </div>
      <br />
      <div class="flex justify-center">
        <progress
          class="progress w-96"
          style="background-color: blue; color: blue"
          value="100"
          max="100"
        ></progress>
      </div>
      <br />
      <div class="mt-12 mb-12 center">
        <div
          class="overflow-x-auto"
          style="
            color: black;
            margin-top: 20px;
            border-radius: 10px;
            overflow: hidden;
            margin-left: 20px;
            margin-right: 20px;
            border: 2px solid blue;
          "
        >
          <table class="table table-xs">
            <thead
              class="font-bold"
              style="color: blue; font-size: 10px"
            >
              <tr>
                <th>OrderID</th>
                <th>CustomerdId</th>
                <th>TotalPrice</th>
                <th>isDelivered</th>
                <th>isConfirmed</th>
                <th>Restaurant_id</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in responseArray" :key="item.id">
                <th>{{ item.orderId }}</th>
                <td>{{ item.customerId }}</td>
                <td>{{ item.totalPrice }}</td>
                <td>{{ item.isDelivered }}</td>
                <td>{{ item.isConfirmed }}</td>
                <td>{{ item.restaurant_id }}</td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </body>
  <br />

  <footer
    class="mt-12 footer footer-center p-10 bg-base-200 text-base-content rounded w-full"
  >
    <div class="grid grid-flow-col gap-4">
      <a class="link link-hover">About us</a>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </div>
    <div>
      <div class="grid grid-flow-col gap-4"></div>
    </div>
    <div>
      <p>
        Copyright © 2023 - All right reserved by ACME
        Industries Ltd
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import store from '@/store/index'

import api from '@/api'

export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
    responseArray: [],
    totalA:"",
    totalB:"",
    totalC:"",
      discountedGoods: null,
      newAdditions: null,
      recipes: null,
      news: null,
      loading: true,
    }
  },
  created() {
    console.log(this.responseArray);
    Promise.all([
      api.news.getLatest().then((data: any) => {
        this.news = data
      }),

      api.products.listDiscounted().then((data: any) => {
        this.discountedGoods = data
      }),

      api.products.listNew().then((data: any) => {
        this.newAdditions = data
      }),

      api.recipes.getFeatured().then((data: any) => {
        this.recipes = data
      }),
    ])
      .then(() => (this.loading = false))
      .catch(() => this.$router.push({ name: 'NotFound' }))
  },
  mounted() {
  const token = this.$store.getters.GetToken;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  axios.get('http://localhost/comm/index/orders', config) // Remplacez l'URL par celle de votre API backend
    .then(response => {
      this.responseArray = response.data.orders; // Stocke la réponse de l'API dans le tableau
      this.totalA=response.data.totalOrders;
      this.totalB=response.data.pendingOrders;
      this.totalC=response.data.deliveredOrders;
    })
    .catch(error => {
      console.error(error);
    });
},
  methods: {
    // Add your custom methods here
    logout() {
      this.$cookies.remove('accessToken');
      this.$router.push('/');

    },
  },
})
</script>

<style lang="scss">
@use '@/assets/css/vars' as vars;

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
.card-actions button {
  background-color: white;
  color: blue;
}
.card {
  background-color: blue;
  color: white;
}

.section {
  margin-top: 52px;

  &__title-container {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    display: flex;
    font-size: 2.4rem;
    align-items: center;
    font-weight: vars.$bold;
    font-family: Gilroy;
  }

  &__title-icon {
    margin-right: 12px;

    &--mobile {
      display: block;
    }

    &--desktop {
      display: none;
    }
  }

  &__link {
    display: flex;
    align-items: center;
  }

  &__content {
    margin-top: 40px;
  }
}

/*------------------------------------------------
  MEDIA QUERIES
------------------------------------------------*/
@media screen and (min-width: 640px) {
  .section {
    margin-top: 72px;

    &__title-container {
      padding: 0 56px;
    }

    &__title {
      font-size: 3.4rem;
    }

    &__title-icon {
      margin-right: 20px;

      &--mobile {
        display: none;
      }

      &--desktop {
        display: block;
      }
    }
  }
}
</style>
