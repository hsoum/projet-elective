<template>
  <div class="carousel" v-swipe="onSwipe">
    <div class="carousel__inner" :style="innerStyles">
      <news-standard-card
        class="card card--highlighted"
        v-bind="standardCard"
      />

      <news-coupon-card class="card" v-bind="couponCard" />
    </div>
    <div class="carousel__left-btn" @click="prev"></div>
    <div class="carousel__right-btn" @click="next"></div>
  </div>
  <div class="carousel-nav">
    <button
      class="carousel-nav__btn"
      :class="{
        'carousel-nav__btn--active': activeIndex === 0,
      }"
      @click="goTo(0)"
    ></button>
    <button
      class="carousel-nav__btn"
      :class="{
        'carousel-nav__btn--active': activeIndex === 1,
      }"
      @click="goTo(1)"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NewsCouponCard from '@/components/NewsCouponCard.vue'
import NewsStandardCard from '@/components/NewsStandardCard.vue'
import type { PropType } from 'vue'
import type { NewsCardsObject } from '@/types'

export default defineComponent({
  name: 'TheNewsCarousel',
  components: {
    NewsCouponCard,
    NewsStandardCard,
  },
  props: {
    news: {
      type: Object as PropType<NewsCardsObject>,
      required: true,
    },
  },
  data() {
    return {
      standardCard: this.news.standard,
      couponCard: this.news.coupon,
      activeIndex: 0,
    }
  },
  computed: {
    innerStyles(): any {
      return {
        transform: `translateX(-${
          this.activeIndex * 100
        }%)`,
      }
    },
  },
  methods: {
    onSwipe(direction: string) {
      direction === 'left' && this.next()
      direction === 'right' && this.prev()
    },
    goTo(index: number) {
      this.activeIndex = index
    },
    prev() {
      if (this.activeIndex !== 0) {
        this.activeIndex = Math.abs(
          (this.activeIndex - 1) % 2,
        )
      }
    },
    next() {
      if (this.activeIndex !== 1) {
        this.activeIndex = Math.abs(
          (this.activeIndex + 1) % 2,
        )
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.carousel {
  position: relative;
  overflow: hidden;

  &__inner {
    white-space: nowrap;
    transition: transform 0.3s;
  }

  &__left-btn,
  &__right-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    z-index: 1;
  }

  &__left-btn {
    left: 0;
  }

  &__right-btn {
    right: 0;
  }
}

.card {
  border-radius: vars.$border-radius-big;
  min-height: 240px;
  user-select: none;
  width: 100%;
  white-space: normal;
  vertical-align: top;

  &--highlighted {
    flex-grow: 1;
  }

  &--visible {
    display: flex;
  }
}

.carousel-nav {
  display: flex;
  justify-content: center;
  margin-top: 12px;

  &__btn {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #8d8d8d;
    cursor: pointer;

    &:not(:last-of-type) {
      margin-right: 8px;
    }

    &--active {
      background-color: vars.$black;
    }
  }
}

/*------------------------------------------------
  MEDIA QUERIES
------------------------------------------------*/
@media screen and (min-width: 640px) {
  .card {
    min-height: 312px;
  }
}

@media screen and (min-width: 780px) {
  .carousel {
    &__inner {
      display: flex;
      // We use "!important" because we need to
      // override the inline styles in case they
      // are not "translateX(0)" when viewport
      // changes.
      transform: translateX(0) !important;
    }
  }

  .card {
    width: 33%;

    &:not(:last-of-type) {
      margin-right: 8px;
    }
  }

  .carousel-nav {
    display: none;
  }
}
</style>
