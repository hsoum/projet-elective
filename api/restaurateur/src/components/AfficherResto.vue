<template>
    <div class="container">

      <div class="content">
        <div class="product-row">
          <CardResto
          v-if="productList"
            class="product-card"
          />
        </div>
      </div>
    </div>
  </template>
  
    <script lang="ts">
    import { defineComponent, type PropType } from 'vue'
    import CardResto from './CardResto.vue'
    import type { ShoppingCartItem } from '@/types'
    
    export default defineComponent({
      components: {CardResto },
    
      name: 'ProductCarousel',
    
      data() {
        return {
          productList: this.newRestaurants,
          innerStyles: {},
          navigationStep: '',
          transitioning: false,
          filter: 'all', // Ajout de la propriété "filter"
        }
      },
    

    

    
    })
    </script>
  
  
  <style lang="scss" scoped>
  .container {
    display: flex;
    margin-top: 20px;
  }
  
  .sidebar {
    width: 200px;
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }
  
  .product-card {
    margin-right: 10px;
  }
  </style>