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
            <router-link
              class="text-sm text-gray-400 hover:text-gray-500"
              to="/"
              >Dashboard
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
            <a
              class="text-sm text-blue-600 font-bold"
              href="#"
              >Gestion des clients</a
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
      <div
        class="min-h-screen p-6 bg-gray-100 flex items-center justify-center"
      >
        <div class="container max-w-screen-lg mx-auto">
          <div>
            <div
              class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6"
            >
              <div
                class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3"
              >
                <div class="text-gray-600">
                  <p class="font-medium text-lg">
                    Client details
                  </p>
                  <p>Modifier le compte client.</p>
                </div>

                <div class="lg:col-span-2">
                  <div
                    class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                  >
                    <div class="md:col-span-5">
                      <label for="full_name"
                        >Lastname</label
                      >
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>
                    <div class="md:col-span-5">
                      <label for="full_name"
                        >Firstname</label
                      >
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>
                    <div class="md:col-span-5">
                      <label for="full_name"
                        >username</label
                      >
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="email"
                        >Email Address</label
                      >
                      <input
                        type="text"
                        name="email"
                        id="email"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div class="md:col-span-5">
                      <label for="full_name"
                        >Phone number</label
                      >
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>
                    <div class="md:col-span-5">
                      <label for="full_name"
                        >Password</label
                      >
                      <input
                        type="password"
                        name="full_name"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value=""
                      />
                    </div>

                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <router-link
                          class="text-sm text-gray-400 hover:text-gray-500"
                          to="/Users"
                        >
                          <button
                            class="mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Back
                          </button>
                        </router-link>
                        <button
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Envoyer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://www.buymeacoffee.com/dgauderman"
            target="_blank"
            class="md:absolute bottom-0 right-0 p-4 float-right"
          >
            <img
              src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
              alt="Buy Me A Coffee"
              class="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
            />
          </a>
        </div>
      </div>
    </main>
  </body>

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

import api from '@/api'

export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      discountedGoods: null,
      newAdditions: null,
      recipes: null,
      news: null,
      loading: true,
    }
  },
  created() {
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

  methods: {
    // Add your custom methods here
    logout() {
      this.$cookies.remove('accessToken');
      this.$router.push('/Accountview');

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
