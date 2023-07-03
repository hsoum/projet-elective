<template>
  <label class="label">
    <input class="input" name="name" type="radio" v-bind="$attrs" />
    <span class="radio"></span>
    {{ label }}
  </label>
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
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.label {
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.input {
  opacity: 0;
  position: absolute;

  &:focus {
    outline: none;
  }
}

.radio {
  margin-right: 8px;
  border-radius: vars.$border-radius;
  width: 20px;
  height: 20px;
  background: vars.$white;
  border: 1px solid vars.$dark-cream;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid vars.$green;
  }

  &::after {
    content: '';
    display: inline-block;
    height: 6px;
    width: 9px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    border-color: vars.$white;
    position: relative;
    top: -2px;

    transform: rotate(-45deg);
  }
}

.input:checked + .radio,
.input:focus + .radio {
  background-color: vars.$green;
  border: 1px solid vars.$green;
}
</style>
