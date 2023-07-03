<template>
  <div class="content-max-width">
    <!-- Navbar Desktop -->
    <nav class="desktop">
      <div class="desktop__left">
        <router-link :to="{ name: 'Home' }">
          <div class="desktop__logo">ExpressFood</div>
        </router-link>
        <base-input-text
          :icon="{ name: 'search' }"
          placeholder="Search"
        />
      </div>
  
      <div  class="desktop__right">


        

 
        <router-link class="btn desktop__btn" to="/HCommandes">
          
          Historique Commandes 
     
        </router-link>
        <router-link class="btn desktop__btn" to="/VCommandes">
          
         Visualiser Commandes
     
        </router-link>


        <router-link class="btn desktop__btn" to="/Article">
          
          Articles 
     
        </router-link>

        <router-link class="btn desktop__btn" to="/Menu">
          
         Menus
     
        </router-link>
       
        
 
 

    
       
      <div class="btn desktop__btn"> 
        <i class="fas fa-bell desktop__notification-icon"></i>
      </div>
       

      <div class="btn desktop__btn">
  <i class="fas fa-user"></i>
  <ul class="dropdown-menu">
    <li>
   
              <router-link class="btn desktop__btn" to="/ModifAccount">
                <i class="fas fa-user-edit"></i> Modifier le compte
        </router-link>
    </li>
    <li>
      <router-link class="btn desktop__btn" to="/parrainer">
      <i class="fas fa-user-plus"></i> Vos amis parrainés
    </router-link>
    </li>
    <li>
   <a class="btn desktop__btn">
    <i></i> Refresh token
  </a>
    </li>
  </ul>
</div>
      </div>


    </nav>

    <!--
      This occupies the space of .mobile when its "display"
      property is set to "fixed". It prevents the rest of the
      elements from moving upwards.
    -->
    <div v-if="mobileOpen" class="substitute"></div>

    <!-- Navbar Mobile -->
    <div
      class="mobile"
      :class="{ 'mobile--fixed': mobileOpen }"
      @click.self="toggleMobile"
    >
      <div class="mobile__bar">
        <div class="mobile__content">
          <div class="mobile__left">
            <router-link :to="{ name: 'Home' }">
              <div class="mobile__logo">EF</div>
            </router-link>
          </div>
          <div class="mobile__right">
            <button
              aria-label="Toggle shopping cart"
              v-if="cartCounter"
              class="btn mobile__btn"
              @click="toggleShoppingCartModal"
            >
              <base-icon
                class="mobile__btn-icon"
                name="shopping-bag"
              />
              <div class="mobile__btn-counter">
                {{ cartCounter }}
              </div>
            </button>
            <button
              class="btn mobile__burger"
              id="burger"
              @click="toggleMobile"
              :aria-label="
                mobileOpen ? 'Close menu' : 'Open menu'
              "
            >
              <base-icon v-show="!mobileOpen" name="menu" />
              <base-icon v-show="mobileOpen" name="x" />
            </button>
          </div>
        </div>
      </div>

      <div class="mobile__menu">
        <base-input-text
          :icon="{ name: 'search' }"
          placeholder="Search"
        />

        <div class="mobile__menu-btn-container">
          <router-link
            class="btn mobile__menu-btn"
            to="/about"
            @click="toggleMobile"
          >
            <base-icon
              class="mobile__menu-btn-icon"
              name="info"
            />
            About
          </router-link>
          <router-link
            class="btn mobile__menu-btn"
            to="/store"
            @click="toggleMobile"
          >
            <base-icon
              class="mobile__menu-btn-icon"
              name="map"
            />
            Store
          </router-link>
          <div class="dropdown">
          <button class="btn dropdown-toggle" >
            <i class="fas fa-user"></i>
          </button>
          <div class="dropdown-menu" v-if="dropdownOpen">
            <router-link class="dropdown-item" to="/profile">
              Voir informations
            </router-link>
            <router-link class="dropdown-item" to="/edit-profile">
              Modifier profil
            </router-link>
            <router-link class="dropdown-item" to="/refer">
              Parrainer
            </router-link>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>

  <shopping-cart-modal
    @close="toggleShoppingCartModal"
    v-show="shoppingCartModalOpen && cartCounter"
    :items="shoppingCart"
  />
</template>

<script lang="ts">


import { defineComponent } from 'vue'


import axios from 'axios' 

import { mapState } from 'vuex'
import ShoppingCartPopover from '@/components/ShoppingCartPopover.vue'
import ShoppingCartModal from '@/components/ShoppingCartModal.vue'


export default defineComponent({


  name: 'TheNavbar',
  components: {
    ShoppingCartPopover,
    ShoppingCartModal,
    
  },
  data() {
    return {
      mobileOpen: false,
      shoppingCartPopoverOpen: false,
      shoppingCartModalOpen: false,
      isLoggedIn: true,
      dropdownOpen: false,
    }
  },
  computed: {
    
    ...mapState(['shoppingCart']),
    

    cartCounter(): number {
      return this.shoppingCart.length
    },
  },
  created() {
  const cookies = document.cookie.split('; ');
  const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));

  this.isLoggedIn = !!accessTokenCookie;
},




  methods: {

    logout() {
      this.$cookies.remove('accessToken');
      window.location.reload();

    },
    toggleMobile() {
      this.mobileOpen = !this.mobileOpen
    },
    toggleShoppingCartPopover() {
      if (this.cartCounter) {
        this.shoppingCartPopoverOpen =
          !this.shoppingCartPopoverOpen
      }
    },
    toggleShoppingCartModal() {
      if (this.cartCounter) {
        this.shoppingCartModalOpen =
          !this.shoppingCartModalOpen
      }
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
  mounted() {
    this.$router.beforeEach(() => {
      this.shoppingCartPopoverOpen = false
      this.shoppingCartModalOpen = false
      this.mobileOpen = false
    })
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.desktop {
  display: none;
}

.substitute {
  $padding-y: 12px;
  height: 22px + ($padding-y * 2);
  margin: 20px 0;
}

.mobile {
  &__bar {
    width: 100%;
    background-color: vars.$light-cream;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    max-width: vars.$content-max-width;
    padding: 20px 0px;
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__logo {
    margin-right: 32px;
    font-family: 'Gilroy';
    font-weight: vars.$bold;
    font-size: 20px;
  }

  &__btn {
    position: relative;
  }

  &__btn-counter {
    position: absolute;
    right: 0;
    top: 0;
    background-color: vars.$green;
    color: vars.$white;
    width: 1px;
    height: 1px;
    padding: 9px;
    border-radius: 50%;
    font-size: 1.1rem;
    line-height: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid vars.$light-cream;
  }

  &__burger {
    padding-right: 0px;
  }

  &__menu {
    display: none;
  }

  &__menu-btn-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  &__menu-btn:not(:last-of-type) {
    margin-right: 16px;
  }

  &__menu-btn-icon {
    margin-right: 8px;
  }

  &--fixed {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.4s;
    z-index: 2;
  }

  &--fixed &__content {
    padding: 20px vars.$content-padding;
  }

  &--fixed &__menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: vars.$light-cream;
    padding-bottom: 20px;
  }
}

/*----------------------------------------------
  MEDIA QUERIES
-----------------------------------------------*/
@media screen and (min-width: 780px) {
  .mobile {
    display: none;
  }

  .desktop {
    display: flex;
    padding: 20px 32px;
    justify-content: space-between;
    position: relative;

    &__left,
    &__right {
      display: flex;
      align-items: center;
    }

    &__logo {
      margin-right: 32px;
      font-family: 'Gilroy';
      font-weight: vars.$bold;
      font-size: 24px;
    }

    &__btn {
      margin-right: 8px;
      position: relative;
    }

    &__btn-icon {
      margin-right: 8px;
    }

  }



}
</style>
