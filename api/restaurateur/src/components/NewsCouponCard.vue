<template>
   
  <article class="card">
   
    <div
  
    >  <Map /></div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Map from '@/components/Map.vue';

export default defineComponent({
  name: 'NewsCouponCard',
  components: {
    
    Map
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    coupon: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.card {
  position: relative;
  background-color: vars.$black;
  overflow: hidden;
}

.card__image {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(https://medias.toutelanutrition.com/ressource/104/Fast%20Food.jpg);
}
</style>
