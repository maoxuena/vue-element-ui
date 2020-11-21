<template>
  <!-- 高德地图 -->
  <div class="a-map">
    <!-- 地图 -->
    <div id="container"
         class="amap-container">
    </div>
    <!-- 使用方法 -->
    <div class="use-method">
      <pre>
      一、直接引用高德地图 SDK
      1. 在 public 文件夹下的 index.html 中加入
      <code>
        &lt;script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.4&key=你申请的key"&gt;&lt;/script&gt;
      </code>
      2. 在 vue.config.js 文件中配置 externals
      <code>
        module.exports = {
          configureWebpack: {
            externals: {
              'AMap': 'AMap' // 高德地图配置
            }
          }
        }
      </code>
      </pre>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
export default {
  name: 'a-map',
  data () {
    return {
      map: {}, // 地图
      zoom: 10, // 地图缩放级别
      center: [121.558196, 29.908339], // 指定地图中心点
      style: '2d47d18dde35a5d2312c7863a2b0406a' // 主题样式
    }
  },
  methods: {
    init () {
      let self = this
      this.map = new AMap.Map('container', {
        // showLabel: false, // 不显示地图文字标记
        center: self.center,
        resizeEnable: true,
        zoom: self.zoom
      })
      this.map.setMapStyle('amap://styles/' + this.style)
      this.map.setFeatures(['bg', 'road', 'building', 'point']) // 地图显示信息：'bg', 'road', 'building', 'point'
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.amap-container {
  height: 700px;
}
</style>
