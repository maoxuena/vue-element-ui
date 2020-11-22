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
      style: '2d47d18dde35a5d2312c7863a2b0406a', // 主题样式
      markers: [], // 点集合
      list: [
        {
          lnt: 121.55220514500,
          lat: 29.84561475200,
          content: 'aaa',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.43363798300,
          lat: 29.85925167100,
          content: 'bbb',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.64516490500,
          lat: 29.86009157200,
          content: 'ccc',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.89114340293699,
          lat: 29.86208615376387,
          content: 'ddd',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.303843,
          lat: 29.983412,
          content: 'eee',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.58694444,
          lat: 29.758414248,
          content: 'fff',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.472644,
          lat: 29.231706,
          content: 'ggg',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.506377,
          lat: 29.245105,
          content: 'hhh',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.392735,
          lat: 29.083714,
          content: 'iii',
          url: require('@/assets/point.png')
        },

        {
          lnt: 121.0138,
          lat: 29.0436,
          content: 'jjjj',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.95,
          lat: 29.27,
          content: 'kkkk',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.11,
          lat: 29.09,
          content: 'lll',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.51,
          lat: 29.83,
          content: 'mmm',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.77,
          lat: 29.3,
          content: 'nnnn',
          url: require('@/assets/point.png')
        },
        {
          lnt: 121.16,
          lat: 29.34,
          content: 'oooo',
          url: require('@/assets/point.png')
        }
      ]
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
    },
    createPoint () {
      let cluster
      let self = this
      this.list.map((data) => {
        // 海量生成marker点
        let marker = new AMap.Marker({
          position: new AMap.LngLat(data.lnt, data.lat),
          title: data.title,
          content: `<div><img src="${data.url}"></img></div>`,
          offset: new AMap.Pixel(-15, -15)
        })

        let content = `<div style="width:200px;height:50px;">${data.content},${data.lnt},${data.lat}<div>
                         <a href="${data.url}" />详情</div></div>`
        content.replace(/undefined/g, '')

        // 窗体信息
        let infoWindow = new AMap.InfoWindow({
          content: content, // 使用默认信息窗体框样式，显示信息内容
          offset: new AMap.Pixel(0, -15)
        })
        // 监听marker的点击事件
        AMap.event.addListener(marker, 'click', function (e) {
          infoWindow.open(
            self.map,
            // 窗口信息的位置
            marker.getPosition(data.lnt, data.lat)
          )
        })
        this.markers.push(marker)
        // 添加监听事件，当前缩放级别
        AMap.event.addListener(self.map, 'zoomend', function () {
          let zoom = self.map.getZoom()
          console.log(zoom)
          // 关闭信息窗体
          self.map.clearInfoWindow(infoWindow)
        })
      })
      // let count = this.markers.length // 点数量
      // let _renderClusterMarker = this.renderClusterMarker(count) // 自定义绘制
      if (cluster) {
        cluster.setMap(null)
      }
      // 点聚合样式
      cluster = new AMap.MarkerClusterer(self.map, this.markers, {
        gridSize: 80
        // renderClusterMarker: _renderClusterMarker
      })
    },
    // 窗体信息
    infoWindow () {

    },
    // 使用renderClusterMarker属性实现聚合点的完全自定义绘制
    renderClusterMarker (count) {
      return context => {
        let factor = Math.pow(context.count / count, 1 / 18) // Math.pow(a,b)方法获得值的类型是double型，含义是a的b次方
        let div = document.createElement('div')
        let Hue = 180 - factor * 180
        let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)' // 背景颜色
        let fontColor = 'hsla(' + Hue + ',100%,20%,1)' // 字体颜色
        let borderColor = 'hsla(' + Hue + ',100%,40%,1)' // 边框颜色
        let shadowColor = 'hsla(' + Hue + ',100%,50%,1)' // 阴影颜色
        div.style.backgroundColor = bgColor
        let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
        div.style.width = div.style.height = size + 'px'
        div.style.border = 'solid 1px ' + borderColor
        div.style.borderRadius = size / 2 + 'px'
        div.style.boxShadow = '0 0 1px ' + shadowColor
        div.innerHTML = context.count
        div.style.lineHeight = size + 'px'
        div.style.color = fontColor
        div.style.fontSize = '14px'
        div.style.textAlign = 'center'
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
        context.marker.setContent(div)
      }
    }

  },
  mounted () {
    this.init()
    this.createPoint()
  }
}
</script>

<style lang="scss" scoped>
.amap-container {
  height: 700px;
}
</style>
