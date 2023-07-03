<template>
  <article class="card" :class="`card--${color}`">
    <p class="card__title" :class="`card__title--${color}`">{{ title }}</p>
    <p class="card__subtitle">{{ subtitle }}</p>

    <div class="card__image-wrapper">
      <img class="card__image" :src="imageURL" :alt="` ${title} image`" />
    </div>

    <router-link
      class="btn card__btn"
      :class="`card__btn--${color}`"
      :to="`/recipes/categories/${id}`"
    >
      Read more
    </router-link>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RecipeCategoryCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      validator: (value: string) => {
        return value === 'red' || value === 'green'
      },
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 40px);
  border-radius: vars.$border-radius-big;
  grid-template-areas:
    'title img'
    'subtitle img'
    'btn img';
  padding: 20px;

  &__title {
    grid-area: title;
    justify-self: start;
    align-self: center;
    font-family: Gilroy;
    font-size: 2rem;

    &--red {
      color: vars.$dark-red;
    }

    &--green {
      color: vars.$dark-green;
    }
  }

  &__subtitle {
    font-family: Gilroy;
    font-weight: vars.$semibold;
    font-size: 1.1rem;
    grid-area: subtitle;
    justify-self: start;
    align-self: center;
    text-transform: uppercase;
  }

  &__btn {
    grid-area: btn;
    align-self: stretch;
    justify-self: start;

    &--red {
      border: 1px solid vars.$dark-red;
      color: vars.$dark-red;
    }

    &--green {
      border: 1px solid vars.$dark-green;
      color: vars.$dark-green;
    }
  }

  &__image-wrapper {
    grid-area: img;
    align-self: center;
    justify-self: end;
    display: flex;
    max-height: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-left: 20px;
  }

  &__image {
    max-height: 92px;
    height: 100%;
    width: auto;
  }

  &--red {
    background-color: vars.$light-red;
  }

  &--green {
    background-color: vars.$light-green;
  }
}

/*------------------------------------------------
  MEDIA QUERIES
------------------------------------------------*/
@media screen and (min-width: 640px) {
  .card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 40px) 1fr 40px;
    border-radius: vars.$border-radius-big;
    grid-template-areas:
      'title title'
      'subtitle subtitle'
      'img img'
      'btn btn';
    padding: 32px;

    &__title {
      grid-area: title;
      justify-self: center;
      align-self: center;
      font-size: 3.2rem;
    }

    &__subtitle {
      font-weight: vars.$semibold;
      font-size: 1.4rem;
      grid-area: subtitle;
      justify-self: center;
      align-self: center;
      text-transform: uppercase;
      text-align: center;
    }

    &__btn {
      grid-area: btn;
      align-self: stretch;
      justify-self: center;
    }

    &__image-wrapper {
      grid-area: img;
      align-self: center;
      justify-self: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 16px 0;
    }

    &__image {
      max-height: none;
      width: 100%;
      height: auto;
    }
  }
}

@media screen and (min-width: 940px) {
  .card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 40px) 1fr 40px;
    border-radius: vars.$border-radius-big;
    grid-template-areas:
      'title title'
      'subtitle subtitle'
      'img img'
      'btn btn';
    padding: 56px;

    &__image-wrapper {
      margin: 0px;
    }
  }
}
</style>
