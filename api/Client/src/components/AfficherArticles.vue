<template>
  <div class="container">
    <div class="sidebar">
      <button :class="{ active: filter === 'all' }" @click="filterProducts('all')">Tous les produits</button>
      <button :class="{ active: filter === 'sale' }" @click="filterProducts('sale')">Promotions</button>
      <button :class="{ active: filter === 'new' }" @click="filterProducts('new')">Nouveaux produits</button>
    </div>
    <div class="content">
      <div class="product-row">
        <cardAfficher
          v-for="product in filteredProductList"
          :key="product.id"
          v-bind="product"
          class="product-card"
        />
      </div>

    </div>
  </div>
</template>

  <script lang="ts">
  import { defineComponent, type PropType } from 'vue'
  import cardAfficher from './cardAfficher.vue'
  import type { ShoppingCartItem } from '@/types'
  
  export default defineComponent({
    components: { cardAfficher },
  
    name: 'ProductCarousel',
  
    data() {
      return {
        productList: this.products,
        innerStyles: {},
        navigationStep: '',
        transitioning: false,
        filter: 'all', // Ajout de la propriété "filter"
      }
    },
  
    props: {
      products: {
        type: Array as PropType<ShoppingCartItem[]>,
        required: true,
      },
    },
  
    computed: {
      inner(): InstanceType<typeof HTMLDivElement> {
        return this.$refs.inner as InstanceType<typeof HTMLDivElement>
      },
      filteredProductList(): ShoppingCartItem[] {
        // Filtrer les produits en fonction de la valeur de "filter"
        if (this.filter === 'sale') {
          return this.productList.filter(product => product.price[1].price < product.price[0].price)
        } else if (this.filter === 'new') {
          // Vous devrez définir une logique pour déterminer quels produits sont considérés comme nouveaux
          // Dans cet exemple, nous supposons que les nouveaux produits ont un taux supérieur à 4
          return this.productList.filter(product => product.rate < 4)
        } else {
          return this.productList
        }
      },
    },
  
    methods: {
      filterProducts(filter: string) {
        this.filter = filter
      },
    },
  })
  </script>


<style lang="scss" scoped>
.container {
  display: flex;
  margin-top: 20px;
  margin-left: 100px;
}

.sidebar {
  width: 200px;
  margin-top: 200px ;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.sidebar button {
  display: block;
  margin-bottom: 10px;
  background-color: #fff;
  color: #333;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  width: 100%;
}

.sidebar button:hover {
  background-color: #f0f0f0;
  color: #000;
  border-color: #ccc;
}

.sidebar button.active {
  background-color: #333;
  color: #fff;
  border-color: #333;
}

.content {
  flex: 1;
  padding-left: 20px;
}

.inner {
  white-space: nowrap;
  transition: transform 0.3s;
  transform: translateX(0);
}

.product-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.product-card {
  width: calc(25% - 10px); /* 4 cartes par ligne avec marges de 10px */
  margin-right: 10px;
  margin-bottom: 10px;
}


/* Styles pour les écrans larges */
@media (min-width: 768px) {
  .product-row {
    margin-left: -5px; /* Compense les marges des cartes */
  }
  .product-card {
    flex-basis: calc(25% - 10px); /* 4 cartes par ligne avec marges de 10px */
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

/* Styles pour les écrans moyens */
@media (max-width: 767px) {
  .product-card {
    flex-basis: calc(33.33% - 10px); /* 3 cartes par ligne avec marges de 10px */
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

/* Styles pour les petits écrans */
@media (max-width: 480px) {
  .product-card {
    flex-basis: calc(50% - 10px); /* 2 cartes par ligne avec marges de 10px */
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>