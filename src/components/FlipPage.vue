<template>
  <div class="filp-page">
    <span class="index" v-on:click="changePage(-50)">首页</span>
    <span class="previous" v-on:click="changePage(-1)">上一页</span>
    <span class="next" v-on:click="changePage(1)">下一页</span>
    <span class="last" v-on:click="changePage(-100)">尾页</span>
  </div>
</template>
<script>
  export default {
    methods: {
      changePage: function (b) {
        this.$emit('increment', b)
      }
    }
  }
</script>
