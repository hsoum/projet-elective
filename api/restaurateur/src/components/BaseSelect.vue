<template>
  <div class="field-container">
    <label class="select-label">{{ label }}</label>
    <div class="select-wrapper">
      <select class="select-wrapper__select" :name="name">
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.value }}
        </option>
      </select>
      <div class="select-wrapper__arrow" :aria-label="name"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss">
@use '@/assets/css/vars' as vars;
.field-container {
  width: 200px;
}

.select-label {
  margin-bottom: 8px;
  display: inline-block;
  color: vars.$dark-gray;
}

.select-wrapper {
  height: 40px;
  display: flex;
  background-color: vars.$white;
  border-radius: vars.$border-radius;
  position: relative;
  border: 1px solid vars.$dark-cream;
  z-index: 10;

  &__select {
    appearance: none;
    cursor: pointer;
    border: none;
    width: 100%;
    height: 100%;
    display: block;
    background-color: transparent;
    padding: 0 12px;
  }

  &__arrow {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    right: 12px;
    z-index: -1;

    &::after {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-bottom: 2px solid;
      border-right: 2px solid;
      border-color: vars.$dark-gray;
      transform: rotate(45deg);
    }
  }
}
</style>
