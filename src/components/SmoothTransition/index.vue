<template>
  <div class="smooth-transition">
    <div class="st-container">
      <!--nav begin-->
      <div class="st-btn"
           :style="{width:100/nav.length+'%'}"
           v-for="(item,index) in nav"
           :key="item.value">
        <input type="radio"
               name="radio-set"
               :checked="active===index"
               :id="'st-control-'+index">
        <a :href="'#st-panel-'+index"
           :key="item.value">{{item.name}}</a>
      </div>
      <!--nav end-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'smooth-transition',
  props: ['nav'],
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.smooth-transition {
  width: 100%;
  position: relative;

  .st-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    .st-btn {
      height: 34px;
      line-height: 34px;
      position: absolute;
      bottom: 0;

      input,
      a {
        height: 34px;
        line-height: 34px;
        position: absolute;
        bottom: 0;
        display: inline-block;
        width: 100%;
      }

      input {
        opacity: 0;
        z-index: 99;
      }

      a {
        z-index: 9;
        font-weight: 700;
        font-size: 16px;
        text-align: center;
        color: #fff;
        text-shadow: 1px 1px 1px rgba(151, 24, 64, 0.2);
      }

      #st-control-1,
      #st-control-1 + a {
        left: 10%;
      }
    }
  }
}
</style>
