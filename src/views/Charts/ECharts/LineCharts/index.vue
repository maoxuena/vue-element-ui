<template>
  <div class="">
    <div class="echarts-box">
      <line1></line1>
    </div>
  </div>
</template>

<script>
import Line1 from './components/Line1'
export default {
  name: 'line-charts',
  components: {
    Line1
  }
}
</script>

<style lang="scss" scoped>
.echarts-box {
  display: inline-block;
  width: 50%;
  height: 400px;
  padding: 10px;
}
</style>
