<template>
  <div>
    <the-loading-screen v-if="loading" />
    <div v-else class="content-max-width">
      <div class="home">
        <!-- News Carousel -->
        <the-news-carousel v-if="news" :news="news" />

        <br><br>
      <h1 class="s_title">  Exploiter le potentiel de votre cuisine !</h1>

        <div class="full-width-image">

    <img src="https://www.steriflow.com/wp-content/uploads/2020/12/propo-agro.jpg" alt="Description de l'image">

</div>




        <!-- Section:  Logistics -->
        <the-section-logistics />
      </div>
    </div>

    <the-footer v-if="!loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheLoadingScreen from '@/components/TheLoadingScreen.vue'
import ProductCarousel from '@/components/ProductCarousel.vue'
import TheNewsCarousel from '@/components/TheNewsCarousel.vue'
import TheSectionRecipes from '@/components/TheSectionRecipes.vue'
import TheSectionLogistics from '@/components/TheSectionLogistics.vue'
import TheFooter from '@/components/TheFooter.vue'
import api from '@/api'

export default defineComponent({
  name: 'Home',
  components: {
    TheLoadingScreen,
    ProductCarousel,
    TheNewsCarousel,
    TheSectionRecipes,
    TheSectionLogistics,
    TheFooter,
  },
  data() {
    return {
      discountedGoods: null,
      newAdditions: null,
      recipes: null,
      news: null,
      loading: true,
    }
  },


  
  methods: {



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
})
</script>

<style lang="scss">
@use '@/assets/css/vars' as vars;
.full-width-image {
  max-width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.full-width-image a {
  display: block;
  text-align: center;
}

.full-width-image img {
  width: 100%;
  height: auto;
}
.s_title {
  font-weight: vars.$bold;
    font-family: Gilroy;
    margin-bottom: 12px;
    padding-left: 50px;
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
