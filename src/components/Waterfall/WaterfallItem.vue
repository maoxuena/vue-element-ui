<template>
  <div class="waterfall-item"
       :style="{width:100/cols+'%',padding:padding+'px'}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'waterfall-item',
  inject: ['waterfall'], // 注入waterfall，获取cols和padding
  data () {
    return {
      cols: this.waterfall.cols,
      padding: this.waterfall.padding
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.waterfall-item {
  float: left;
  box-sizing: border-box;
}
</style>
