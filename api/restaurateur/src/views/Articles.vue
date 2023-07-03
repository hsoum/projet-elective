<template>
  <div>
    <the-loading-screen v-if="loading" />
    <div v-else class="content-max-width">
      <div class="home">
        <!-- News Carousel -->

        <!-- Section: Discounts -->
        <section class="section" v-if="articles">
          <div class="section__title-container">
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
              Tous les produits
            </h2>
            <router-link to="/catalog/discounted" class="section__link">
              View all
              <base-icon name="chevron-right" class="section__link-icon" />
            </router-link>
          </div>

          <AfficherArticles v-if="articles" :products="articles" />
        </section>

        <!-- Section: Recipes -->

        <!-- Section: New Additions -->

      </div>
    </div>

    <the-footer v-if="!loading" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import TheLoadingScreen from '@/components/TheLoadingScreen.vue';
import AfficherArticles from '@/components/AfficherArticles.vue';
import TheFooter from '@/components/TheFooter.vue';
import api from '@/api';

export default defineComponent({
  name: 'Articles',
  components: {
    TheLoadingScreen,
    AfficherArticles,
    TheFooter,
  },
  data() {
    return {
      articles: null as null | any[],
      loading: true,
    };
  },
  created() {
    const route = useRoute();
    const idParam = route.params.id;
    console.log('ID:', idParam); // Vérifiez l'ID récupéré

    if (typeof idParam === 'string') {
      const ids = idParam.split(',');

      if (ids.length > 0) {
        console.log('IDs from URL:', ids);
        Promise.all(ids.map(id => api.products.getArticleById(id)))
        
          .then(data => {
            this.articles = data;
            this.loading = false;
          })
          .catch(() => {
            this.articles = [];
            this.loading = false;
            this.$router.push({ name: 'NotFound' });
          });
      } else {
        this.articles = [];
        this.loading = false;
        this.$router.push({ name: 'NotFound' });
      }
    } else {
      this.articles = [];
      this.loading = false;
      this.$router.push({ name: 'NotFound' });
    }
  },
});
</script>


<style lang="scss">
@use '@/assets/css/vars' as vars;

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
