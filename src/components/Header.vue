<template>
  <div class="header" v-on:click="goIndex">
  </div>
</template>

<script>
  export default {
    methods: {
      goIndex: function () {
        this.$router.push({path: '/'})
      }
    }
  }
</script>
