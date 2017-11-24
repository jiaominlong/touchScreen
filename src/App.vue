<template>
  <div id="app">
    <transition name="slideLeft" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./style/style";
</style>
