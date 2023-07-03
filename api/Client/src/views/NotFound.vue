<template>
  <div class="not-found">
    <h2 class="not-found__title">Oops, this page coudn't be found</h2>

    <p class="error-code">
      4
      <img
        class="error-code__image"
        src="/img/crashed-tomato.png"
        alt=" Crashed tomato image"
      />
      4
    </p>

    <div class="not-found__links">
      <router-link :to="{ name: 'Home' }" class="btn btn--red"
        >Go to homepage</router-link
      >

      <router-link to="" class="btn not-found__btn">Report a bug</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 56px 0 (56px * 2) 0;

  &__title {
    font-family: Gilroy;
    font-size: 2.4rem;
    text-align: center;
  }

  &__links {
    display: flex;
  }

  &__btn {
    border: 1px solid vars.$red;
    color: vars.$dark-red;
    margin-left: 16px;
  }
}

.error-code {
  color: vars.$red;
  font-family: Gilroy;
  font-size: 12rem;
  font-weight: vars.$heavy;
  display: flex;
  align-items: flex-start;
  margin: 32px 0;

  &__image {
    position: relative;
    top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    height: 180px;
  }
}

/*------------------------------------------------
  MEDIA QUERIES
------------------------------------------------*/
@media screen and (min-width: 640px) {
  .not-found {
    padding: 56px 0 (56px * 2) 0;

    &__title {
      font-size: 3rem;
    }
  }

  .error-code {
    font-size: 18rem;
    font-weight: vars.$heavy;
    margin: 56px 0;

    &__image {
      top: 24px;
      height: 240px;
    }
  }
}
</style>
