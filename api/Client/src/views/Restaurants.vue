<template>
  <div>
    <the-loading-screen v-if="loading" />
    <div v-else class="content-max-width">
      <div class="home">
        <!-- News Carousel -->

        <!-- Section: Discounts -->
        <section class="section" >
          <h2 class="section__title">
              <base-icon
                class="section__title-icon section__title-icon--desktop"
                name="tag"
                :size="40"
              />
              <base-icon
                class="section__title-icon section__title-icon--mobile"
                name="tag"
                :size="28"
              />
             Tout les restaurants
            </h2>
          <div class="section__title-container">

 
          </div>

        </section>
        <br>

        
<div class="main-container">
  <div class="sidebar-container">
    <section class="sidebar">
      <div class="sidebar__title">Trier par note :</div>
      <div class="sidebar__options">
        <button class="sidebar__option" @click="sortByRating('asc')">Du plus bas au plus haut</button>
        <button class="sidebar__option" @click="sortByRating('desc')">Du plus haut au plus bas</button>
      </div>
    </section>
  </div>

  <div class="card-container">
    <card-resto
  v-for="restaurant in restaurants"
  :key="restaurant.id"
  :restaurant="restaurant"
  class="card"
  @show-articles="navigateToProducts(restaurant.products)"
/>

  </div>
</div>



        <!-- Section:  New Additions -->
   


      </div>
    </div>

    <the-footer v-if="!loading" />
  </div>
</template>



<script lang="ts">
import { defineComponent,   ref} from 'vue';
import CardResto from '@/components/CardResto.vue';
import { useRouter } from 'vue-router';
import api from '@/api';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  imageURL: string;
  products: number[]; // Ajout de la propriété "products" de type tableau d'entiers
}

export default defineComponent({
  name: 'Restaurant',
  components: {
    CardResto
  },
  setup() {
    const router = useRouter();
    const restaurants = ref<Restaurant[]>([]);
    const loading = ref(true);

    api.restaurants
      .getAll()
      .then((data: Restaurant[]) => {
        restaurants.value = data;
      })
      .finally(() => {
        loading.value = false;
      });

    function sortByRating(order: 'asc' | 'desc') {
      restaurants.value.sort((a, b) => {
        if (order === 'asc') {
          return a.rating - b.rating;
        } else if (order === 'desc') {
          return b.rating - a.rating;
        }
        return 0;
      });
    }

    function navigateToProducts(productIds: number[]) {
      const productIdsString = productIds.join(',');
      if (router) {
        router.push(`/Articles/${productIdsString}`);
      }
    }



    return {
      restaurants,
      loading,
      sortByRating,
      navigateToProducts
    };
  }
});
</script>


<style lang="scss">
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 220px;
}

.card {
  width: calc(25% - 20px); /* 25% pour occuper 4 cartes par ligne, 20px pour l'espacement entre les cartes */
  margin-bottom: 20px;
}

.main-container {
  position: relative;
}

.sidebar {
  width: 200px;
  background-color: #ffffff;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
}

.sidebar__title {
  font-weight: bold;
  margin-bottom: 10px;
}

.sidebar__option {
  display: block;
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: left;
}

.sidebar__option:hover {
  background-color: #e0e0e0;
}

</style>