<template>
  <div class="footer-wrapper">
    <div class="content-max-width">
      <footer class="footer">
        <div class="footer__title newsletters-title">Get our newsletters</div>
        <base-input-text
          placeholder="Your email"
          class="newsletters-input"
          :icon="{ name: 'check', background: true }"
        />

        <div class="footer__link-col">
          <div class="footer__title">Company</div>
          <div class="footer__link-list">
            <router-link class="footer__link" to="/about">About</router-link>
            <router-link class="footer__link" to="/store">Store</router-link>
            <router-link class="footer__link" to="/faq">FAQ</router-link>
          </div>
        </div>

        <div class="footer__link-col">
          <div class="footer__title">Service</div>
          <div class="footer__link-list">
            <router-link class="footer__link" to="/delivery"
              >Delivery</router-link
            >
            <router-link class="footer__link" to="/payment"
              >Payment</router-link
            >
            <router-link class="footer__link" to="/contacts"
              >Contacts</router-link
            >
          </div>
        </div>

        <div class="footer__link-col">
          <div class="footer__title">Follow us</div>
          <div class="footer__link-list">
            <router-link class="footer__link" to="/instagram"
              >Instagram</router-link
            >
            <router-link class="footer__link" to="/facebook"
              >Facebook</router-link
            >
            <router-link class="footer__link" to="/twitter"
              >Twitter</router-link
            >
          </div>
        </div>

        <div class="footer__logo"> Groupe 3</div>
        <p class="footer__company">
          <span class="footer__brand">Express food</span>
        </p>
        <div class="footer__link-list legal-link-list">
          <router-link class="footer__link legal-link" to="/tyc"
            >Terms & Conditions</router-link
          >
          <router-link class="footer__link legal-link" to="/tyc"
            >Privacy Policy</router-link
          >
        </div>
        <p class="footer__copyright">2023 © All rights reserved</p>
      </footer>
    </div>
    <p class="credits">
    
      <a  target="_blank"
        ></a
      > Developed by
      <a href="https://fictolab.co" target="_blank">Cesi EXIA  Groupe 3</a>.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.footer-wrapper {
  background-color: vars.$dark-cream;
  margin-top: 56px;
}

.footer {
  padding: 56px 44px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, auto);

  &__logo {
    font-family: 'Gilroy';
    font-weight: vars.$bold;
    font-size: 20px;
  }

  &__link-col {
    padding: 24px 0;
    border-bottom: 2px solid vars.$light-gray;
  }

  &__title {
    font-size: 1.6rem;
    font-family: Gilroy;
    font-weight: vars.$bold;
    margin-bottom: 16px;
  }

  &__link:not(:last-of-type) {
    margin-right: 28px;
  }

  &__logo {
    margin-top: 44px;
    margin-bottom: 16px;
    text-align: center;
  }

  &__company {
    text-align: center;
    margin-bottom: 16px;
  }

  &__copyright {
    text-align: center;
    color: vars.$gray;
  }
}

.newsletters-title {
  font-size: 2rem;
  font-weight: vars.$semibold;
}

.newsletters-input {
  width: 100%;
  margin-bottom: 44px;
}

.legal-link-list {
  margin-bottom: 16px;
  text-align: center;
  text-decoration: underline;
}

.credits {
  padding: 12px;
  text-align: center;
  background-color: vars.$black;
  color: vars.$light-gray;

  a {
    text-decoration: underline;
    color: vars.$white;
  }
}

/*----------------------------------------------
  MEDIA QUERIES
-----------------------------------------------*/
@media screen and (min-width: 880px) {
  .footer {
    grid-template-columns: 1fr repeat(3, 120px) 1fr;
    grid-template-rows: 1fr;
    padding: 56px;

    &__logo {
      margin: 0px;
      grid-column: 1;
      grid-row: 1;
      align-self: start;
      text-align: left;
      font-size: 24px;
    }

    &__company {
      grid-column: 1;
      grid-row: 1;
      align-self: center;
      text-align: left;
      margin-bottom: 16px;
    }

    &__brand {
      display: block;
    }

    &__copyright {
      grid-column: 1;
      grid-row: 1;
      align-self: end;
      text-align: left;
      color: vars.$gray;
    }

    &__link-col {
      align-self: start;
      padding: 0px;
      border: none;
    }

    &__link-list {
      display: flex;
      flex-direction: column;
    }

    &__link {
      margin-bottom: 12px;
    }
  }

  .newsletters-title {
    grid-column: -2;
    grid-row: 1;
    align-self: start;
    font-size: inherit;
    font-weight: vars.$semibold;
  }

  .newsletters-input {
    grid-column: -2;
    grid-row: 1;
    align-self: center;
    width: 100%;
    margin-bottom: 0px;
  }

  .legal-link-list {
    grid-column: -2;
    grid-row: 1;
    align-self: end;
    margin-bottom: 0px;
    display: flex;
    justify-self: start;
    flex-direction: row;
  }

  .legal-link {
    text-align: left;
    margin: 0px;
    font-size: 1.4rem;
    color: vars.$gray;
    text-decoration: underline;
    text-decoration-color: vars.$gray;

    &:not(:last-of-type) {
      margin-right: 16px;
    }
  }
}

@media screen and (min-width: 1000px) {
  .footer {
    grid-template-columns: 1fr repeat(3, 180px) 1fr;
  }
}
</style>
