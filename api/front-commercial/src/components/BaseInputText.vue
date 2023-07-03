<template>
  <div class="field-container">
    <label class="input-label" v-if="label">{{
      label
    }}</label>
    <div class="input-wrapper">
      <input
        class="input-wrapper__input"
        :class="{ 'input-wrapper--with-icon': icon }"
        type="text"
        :placeholder="placeholder"
      />

      <div
        v-if="icon"
        class="input-wrapper__icon"
        :class="{
          'input-wrapper__icon--background':
            icon?.background,
        }"
      >
        <base-icon :name="icon.name" :size="16" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { InputIcon } from '@/types'

export default defineComponent({
  name: 'BaseInputText',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    icon: {
      type: Object as PropType<InputIcon>,
      required: false,
      validator: (value: InputIcon) => {
        return !!value.name
      },
    },
  },
})
</script>

<style lang="scss">
@use '@/assets/css/vars' as vars;

.field-container {
  width: 200px;
}

.input-label {
  margin-bottom: 8px;
  display: inline-block;
  color: vars.$dark-gray;
}

.input-wrapper {
  height: 40px;
  display: flex;
  background-color: vars.$white;
  border-radius: vars.$border-radius;
  position: relative;
  border: 1px solid vars.$dark-cream;

  &__input {
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding: 12px 16px;
    font-size: 1.6rem;
  }

  &__icon {
    border-radius: 0 vars.$border-radius vars.$border-radius
      0;
    background-color: transparent;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    height: 100%;

    &--background {
      background-color: vars.$black;

      * {
        color: vars.$white;
      }
    }
  }

  &--with-icon {
    padding-right: 52px;
  }
}
</style>
