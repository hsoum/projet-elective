<template>
  <div class="spinner-container">
    <div class="lds-dual-ring"></div>
    <p>Loading</p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/css/vars' as vars;

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: vars.$gray;
}

.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 32px;
  height: 32px;
  margin-left: 2px;
  border-radius: 50%;
  border: 3px solid vars.$gray;
  border-color: vars.$gray transparent vars.$gray transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
