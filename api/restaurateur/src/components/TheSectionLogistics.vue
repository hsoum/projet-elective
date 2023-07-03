<template>
  <section class="section section-logistics">
    <div class="section__title-container">
      <h2 class="section__title">
        <base-icon
          class="section__title-icon section__title-icon--desktop"
          name="truck"
          :size="40"
        />
        <base-icon
          class="section__title-icon section__title-icon--mobile"
          name="truck"
          :size="28"
        />
       Comment ca fonctionne pour les restaurateurs
      </h2>
    </div>

    <div
      class="section__content section-logistics__content"
    >
      <div class="section-logistics__step">
        <harvest-icon
          class="section-logistics__pictogram"
        />
        <div class="section-logistics__text">
          <p class="section-logistics__title"> Ajouter votre restaurant</p>
          <p class="section-logistics__description">
            Rejoignez nous en ajoutant votre restaurants
          </p>
        </div>
        <arrow-icon class="arrow" />
      </div>

      <div class="section-logistics__step">
        <arrow-icon class="arrow arrow--even" />
        <box-icon class="section-logistics__pictogram" />
        <div class="section-logistics__text">
          <p class="section-logistics__title">
            Articles et menus
          </p>
          <p class="section-logistics__description">
            Proposez et enregistrez vos plats à commander
          </p>
        </div>
      </div>

      <div class="section-logistics__step">
        <truck-icon class="section-logistics__pictogram" />
        <div class="section-logistics__text">
          <p class="section-logistics__title">Livraison </p>
          <p class="section-logistics__description">
            Nous assurons la livraison rapide de vos plats avec notre service dédié
          </p>
        </div>
        <arrow-icon class="arrow" />
      </div>

      <div class="section-logistics__step">
        <destination-icon
          class="section-logistics__pictogram"
        />
        <div class="section-logistics__text">
          <p class="section-logistics__title">Visualiser la commande</p>
          <p class="section-logistics__description">
            Visualiser en direct le statut de la commande
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import HarvestIcon from '@/components/icons/HarvestIcon.vue'
import TruckIcon from '@/components/icons/TruckIcon.vue'
import DestinationIcon from '@/components/icons/DestinationIcon.vue'
import BoxIcon from '@/components/icons/BoxIcon.vue'

export default defineComponent({
  name: 'TheSectionLogistics',
  components: {
    ArrowIcon,
    HarvestIcon,
    TruckIcon,
    DestinationIcon,
    BoxIcon,
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.section-logistics {
  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, minmax(100px, auto));
  }

  &__step {
    display: flex;
    align-self: center;
    position: relative;
    grid-column: span 2;
    justify-self: start;

    &:nth-of-type(2n) {
      grid-column: 2 / span 2;
    }
  }

  &__pictogram {
    min-width: 56px;
    min-height: 56px;
    width: 56px;
    height: 56px;
  }

  &__text {
    margin-left: 16px;
    max-width: 200px;
  }

  &__title {
    font-weight: vars.$bold;
    font-family: Gilroy;
    margin-bottom: 12px;
  }
}

.arrow {
  position: absolute;
  min-width: 56px;
  min-height: 56px;
  width: 56px;
  height: 56px;
  align-self: center;
  right: -56px - 16px;

  &--even {
    left: -56px - 16px;
    transform: scaleX(-1);
  }
}

/*------------------------------------------------
  MEDIA QUERIES
------------------------------------------------*/
@media screen and (min-width: 640px) {
  .section-logistics {
    &__content {
      padding-left: 56px;
      padding-right: 56px;
    }

    &__pictogram {
      min-width: 60px;
      min-height: 60px;
      width: 60px;
      height: 60px;
    }

    &__text {
      max-width: none;
    }

    &__title,
    &__description {
      font-size: 1.8rem;
    }
  }
}

@media screen and (min-width: 940px) {
  .section-logistics {
    &__content {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: minmax(220px, auto);
    }

    &__step {
      display: flex;
      position: relative;
      grid-column: span 1;
      justify-self: start;
      align-self: end;

      &:nth-of-type(2n) {
        grid-column: span 1;
        align-self: start;
      }
    }

    &__text {
      max-width: none;
    }
  }

  .arrow {
    position: absolute;
    right: -56px - 16px;
    transform: scaleY(-1);

    &--even {
      right: -56px - 16px;
      transform: scaleX(1);
      left: unset;
    }
  }
}
</style>
