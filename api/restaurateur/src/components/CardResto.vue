<template>
  <div class="card" @click="showArticles">
    <div class="card__image-wrapper">
      <img class="card__image" :src="restaurant.imageURL" :alt="`${restaurant.name} image`" />
    </div>

    <div class="card__content">
      <div class="card__info">
        <div class="card__name-rate">
          <h1 class="card__name">{{ restaurant.name }}</h1>
          <div class="card__rate">
            <base-icon class="card__star" name="star" />
            {{ restaurant.rating }}/5
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardResto',
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  methods: {
    showArticles() {
  this.$emit('show-articles', this.restaurant.products);
}
  }
});
</script>

<style lang="scss" scoped>
.card__image-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}

.card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__content {
  width: 100%;
  padding: 14px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
}

.card__info {
  margin-top: 8px;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card__name-rate {
  display: flex;
  align-items: center;
}

.card__name {
  font-family: Gilroy;
  font-size: 2.4rem;
  margin: 0;
  margin-right: 8px;
}

.card__rate {
  font-size: 1.2rem;
}

@media screen and (max-width: 767px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
</style>