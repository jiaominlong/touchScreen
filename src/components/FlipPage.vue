<template>
  <div class="filp-page">
    <span class="index" v-on:click="filpPage(0)">首页</span>
    <span class="previous" v-on:click="filpPage(-1)">上一页</span>
    <span class="next" v-on:click="filpPage(1)">下一页</span>
    <span class="last" v-on:click="filpPage(totalPage)">尾页</span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        current: 1
      }
    },
    props: ['totalPage'],
    methods: {
      filpPage: function (num) {
        if (num === 0 || num === this.totalPage) {
          this.current = (num || 1)
        } else if ((this.current === 1 && num === -1) || (this.current === this.totalPage && num === 1)) {
          return false
        } else {
          this.current += num
        }
        this.callParameterUrl('?current=' + this.current)
      },
      callParameterUrl: function (parameter) {
        this.$emit('splitParameter', parameter)
      }
    }
  }
</script>
