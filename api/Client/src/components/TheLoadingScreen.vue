<template>
  <div class="loading-spinner-container">
    <loading-spinner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default defineComponent({
  name: 'TheLoadingScreen',
  components: {
    LoadingSpinner,
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.loading-spinner-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-container {
  position: relative;
  top: -40px;
}
</style>
