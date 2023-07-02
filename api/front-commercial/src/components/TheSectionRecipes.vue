<template>
  <section class="section section-recipes">
    <div class="section__title-container">
      <h2 class="section__title">
        <base-icon
          class="section__title-icon section__title-icon--desktop"
          name="coffee"
          :size="40"
        />
        <base-icon
          class="section__title-icon section__title-icon--mobile"
          name="coffee"
          :size="28"
        />
        What to cook?
      </h2>
    </div>

    <div class="section__content section-recipes__content">
      <recipe-category-card
        class="section-recipes__card"
        color="red"
        :id="recipes[0].id"
        :title="recipes[0].title"
        :subtitle="recipes[0].subtitle"
        :imageURL="recipes[0].imageURL"
      />

      <recipe-category-card
        class="section-recipes__card"
        color="green"
        :id="recipes[1].id"
        :title="recipes[1].title"
        :subtitle="recipes[1].subtitle"
        :imageURL="recipes[1].imageURL"
      />

      <article class="all-recipes-card">
        <p class="all-recipes-card__title">
          <span class="all-recipes-card__counter"
            >200+</span
          >
          Healthy recipes
        </p>
        <router-link
          class="btn all-recipes-card__btn"
          to="/recipes"
          >View all</router-link
        >
      </article>

      <div class="subscribe-card">
        <p class="subscribe-card__title">
          Don't miss the new posts
        </p>
        <base-input-text
          class="subscribe-card__input"
          placeholder="Your email"
        />
        <button class="btn subscribe-card__btn">
          Subscribe now
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecipeCategoryCard from '@/components/RecipeCategoryCard.vue'
import type { PropType } from 'vue'
import type { RecipeCard } from '@/types'

export default defineComponent({
  name: 'TheSectionRecipes',
  components: {
    RecipeCategoryCard,
  },
  props: {
    recipes: {
      type: Array as PropType<RecipeCard[]>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.section-recipes {
  &__content {
    display: grid;
  }

  &__card {
    margin: 0 0 16px 0;
  }
}

.all-recipes-card {
  border-radius: vars.$border-radius-big;
  background-color: vars.$green;
  color: vars.$white;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;

  &__title {
    margin-bottom: 28px;
  }

  &__counter {
    font-family: Gilroy;
    display: block;
    font-size: 2rem;
    margin-bottom: 12px;
    font-weight: vars.$bold;
  }

  &__btn {
    border: 1px solid vars.$white;
    color: vars.$white;
    min-width: 40%;
  }
}

.subscribe-card {
  border-radius: vars.$border-radius-big;
  background-color: vars.$dark-cream;
  color: vars.$black;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  &__title {
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__input {
    margin-bottom: 12px;
    width: 100%;
  }

  &__btn {
    background-color: vars.$black;
    color: vars.$white;
  }
}

/*------------------------------------------------
  MEDIA QUERIES
------------------------------------------------*/
@media screen and (min-width: 640px) {
  .section-recipes {
    &__content {
      padding-left: 56px;
      padding-right: 56px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        'card1        card2 '
        'recipes  subscribe';
    }

    &__card {
      margin: 0 16px 0 0;

      &:nth-child(2n) {
        margin: 0;
      }
    }
  }

  .all-recipes-card {
    grid-area: recipes;
    padding: 32px;
    margin: 16px 16px 0 0;

    &__title {
      font-size: 2rem;
    }

    &__counter {
      font-size: 2.4rem;
    }
  }

  .subscribe-card {
    padding: 32px;
    grid-area: subscribe;
    margin: 16px 0 0 0;

    &__title {
      font-size: 2rem;
      text-align: center;
    }

    &__input {
      margin-bottom: 8px;
    }
  }
}

@media screen and (min-width: 940px) {
  .section-recipes {
    &__content {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-template-areas:
        'card1 card2 recipes'
        'card1 card2 subscribe';
    }

    &__card {
      margin: 0 16px 0 0;
      grid-row: span 2;

      &:nth-child(2n) {
        margin: 0 16px 0 0;
      }
    }
  }

  .all-recipes-card {
    margin: 0px;
  }

  .subscribe-card {
    margin: 16px 0 0 0;
    grid-area: subscribe;
  }
}
</style>
