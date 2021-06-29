<template>
  <div class="waterfall">
    <slot />
    <div class="loading"
         v-if="show">loading</div>
  </div>
</template>

<script>
export default {
  name: 'waterfall',
  provide () {
    return {
      // 将waterfall实例传递给后代
      waterfall: this
    }
  },
  props: {
    value: {
      type: Array
    },
    cols: {
      type: Number,
      default: 3
    },
    padding: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      timer: null,
      show: false, // 是否显示loading
      oldLen: 0, // 原先子元素个数
      hArr: [], // 存放每一列高度的数组
      childrenW: 0, // 子元素宽度
      minH: 0, // 最小高度
      index: 0 // 最小高度的索引
    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        this.$nextTick(() => {
          this.show = false
          this.waterfall(newVal.length, this.oldLen)
          this.oldLen = newVal.length
        })
      },
      deep: true
    }
  },
  methods: {
    waterfall (newLen, oldLen) {
      // 取出所有子元素
      let children = this.$children
      this.childrenW = children[0].$el.offsetWidth
      for (let i = oldLen; i < newLen; i++) {
        if (i < this.cols) {
          this.hArr.push(children[i].$el.offsetHeight)
        } else {
          this.minH = Math.min.apply(null, this.hArr)
          this.index = this.hArr.indexOf(this.minH)
          children[i].$el.style.position = 'absolute'
          children[i].$el.style.top = this.minH + 'px'
          // children[i].$el.style.left = this.childrenW * this.index + 'px'
          children[i].$el.style.left = children[this.index].$el.offsetLeft + 'px'
          this.hArr[this.index] += children[i].$el.offsetHeight
        }
      }
      this.$el.style.height = this.$children[this.$children.length - 1].$el.offsetHeight + this.minH + 35 + 'px'
    },
    checkScrollSlide () { // 检测是否具备了加载数据的条件
      let lastChildH = this.$children[this.$children.length - 1].$el.offsetTop + Math.floor(this.$children[this.$children.length - 1].$el.offsetHeight / 2)
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      let height = document.body.clientHeight || document.documentElement.clientHeight
      let parentTop = this.$el.offsetTop
      return (scrollTop - lastChildH) >= (parentTop - height)
    }
  },
  mounted () {
    this.waterfall(this.value.length, this.oldLen)
    this.oldLen = this.value.length
    window.onscroll = () => {
      if (this.checkScrollSlide() && !this.show) {
        // 可以加载数据了
        this.show = true
        this.$emit('loadData')
      }
    }
    // 监测屏幕大小变化
    window.onresize = () => {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        this.timer = true
        setTimeout(() => {
          this.hArr = []
          this.waterfall(this.value.length, 0)
          this.timer = false
        }, 200)
      }
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.waterfall {
  position: relative;
  width: 100%;

  .loading {
    height: 35px;
    line-height: 35px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
}
</style>
