<template>
  <article styles="card">
    <div class="card__info">
      <div class="card__info-inner">
        <p class="card__title">ExpressFood</p>
        <p class="card__description">La livraison rapide de nourriture à votre porte, pour satisfaire vos papilles sans attendre !</p>
       
        <router-link
              to="/Restaurants"
              class="section__link"
            >
          
              <a  class="btn card__btn">Explorer ! </a>
            </router-link>
      </div>
    </div>
    <div
      class="card__image"
      :style="{ backgroundImage: `url(https://img.freepik.com/premium-vector/food-delivery_24908-48920.jpg?w=2000)` }"
    ></div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NewsStandardCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    callToAction: {
      type: String,
      required: true,
    },
    callToActionURL: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.card {
  background-color: #F4EDE1;
  display: inline-flex;
  grid-template-columns: repeat(10, 1fr);
  overflow: hidden;

  &__info {
    width: 60%;
    padding: 24px 0 24px 10%;
    display: flex;
    align-content: flex-start;
    flex-direction: column;
    z-index: 1;
  }

  &__title {
    font-size: 3rem;
    font-family: Gilroy;
    font-weight: vars.$bold;
  }

  &__description {
    margin-top: 20px;
  }

  &__btn {
    background: vars.$green;
    color: vars.$white;
    margin-top: 20px;
    display: inline-block;
  }

  &__image {
    width: 40%;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
}

/*----------------------------------------------
  MEDIA QUERIES
-----------------------------------------------*/
@media screen and (min-width: 640px) {
  .card {
    &__info {
      padding: 80px 0 60px 10%;
    }

    &__title {
      font-size: 5rem;
      line-height: 4.6rem;
    }

    &__description {
      margin-top: 20px;
    }

    &__btn {
      margin-top: 20px;
    }

    &__image {
      width: 40%;
    }
  }
}

@media screen and (min-width: 1030px) {
  .card {
    &__info {
      width: 50%;
    }

    &__description {
      margin-top: 40px;
    }

    &__btn {
      margin-top: 40px;
    }

    &__image {
      width: 50%;
    }
  }
}
</style>
