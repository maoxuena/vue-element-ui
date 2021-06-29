<template>
  <div>
    <el-card class="box-card">
      列表内容列表内容
    </el-card>
    <div class="row">
      <div class="col-2">
        <el-button class="btn btn-secondary button"
                   @click="sort">
          To original order
        </el-button>
        <el-button class="btn btn-secondary"
                   @click="add">Add</el-button>
      </div>

      <drag-item v-model="list"></drag-item>

    </div>
    <charts-line id="charts"
                 width="100%"
                 height="400px"
                 className="charts"
                 title="趋势图"
                 :chartsData="chartsData"></charts-line>
    <charts-line id="charts1"
                 width="100%"
                 height="400px"
                 className="charts"
                 title="趋势图"
                 :chartsData="chartsData1"></charts-line>
    <loading v-if="false"
             :type="loadingType" />
    <smooth-transition :nav="nav"
                       style="width:100%;height:500px"></smooth-transition>
    <div style="width:700px;height:500px;">
      <canvas id="areaCanvas"
              style="border:1px solid red;width:100%;height:90%;"
              @dblclick="shishiClick"
              @click="draw">
      </canvas>
    </div>
    <div class="workshopCanvas"
         @click="selectPoint">
      <img style="position: absolute;left: 0px;top: 0px;width: 660px;height: 260px;"
           :src="ctxPic" />
      <canvas style="position: absolute;"
              id="myCanvas"
              width="660px"
              height="260px"></canvas>
    </div>
    <Waterfall :cols=5
               :padding=10
               v-model="WaterfallData"
               @loadData="getData">
      <Waterfall-item v-for="(item,index) in WaterfallData"
                      :key="index">
        <div style="background:#399"
             :style="{height:item+'px'}">{{index}}</div>
      </Waterfall-item>
    </Waterfall>
  </div>
</template>

<script>
import ChartsLine from '@/components/ECharts/ChartsLine'
import DragItem from '@/components/DragItem'
import Loading from '@/components/Loading/Loading'
import Waterfall from '@/components/Waterfall'
import WaterfallItem from '@/components/Waterfall/WaterfallItem'
import SmoothTransition from '@/components/SmoothTransition'
let id = 1
var inside = require('point-in-polygon')
var time = null //  在这里定义time 为null
export default {
  data () {
    return {
      ctxPic: require('@/assets/logo.png'),
      offsetList: {
        offsetPointLb: 0,
        offsetPointLt: 0,
        offsetPointRb: 0,
        offsetPointRt: 0
      },
      pointData: [],
      pointNum: 0,
      pointsArr: [[0, 20], [30, 20], [10, 0]],
      collectionArr: [],
      temp: [],
      nav: [{
        value: 1,
        name: 'nav1'
      }, {
        value: 2,
        name: 'nav2'
      }, {
        value: 3,
        name: 'nav3'
      }, {
        value: 4,
        name: 'nav4'
      }, {
        value: 5,
        name: 'nav5'
      }],
      loadingType: 'pulse',
      WaterfallData: [150, 136, 255, 152, 164, 238, 152, 235, 145, 134, 138],
      list: [
        { name: 'John', id: 0, order: 1 },
        { name: 'Joao', id: 1, order: 2 },
        { name: 'Jean', id: 2, order: 3 }
      ],
      chartsData: {
        label: ['CMCC', 'CTCC', 'CFCC'],
        time: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55'],
        data: [
          [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
          [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
          [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
        ]
      },

      chartsData1: {
        label: ['111', '222', '333'],
        time: ['13:00', '13:05', '13:10', '13:15', '13:25', '13:35', '13:40', '13:45', '13:50'],
        data: [
          [220, 182, 191, 134, 150, 120, 122, 165, 122],
          [120, 110, 125, 122, 220, 182, 191, 134, 150],
          [220, 182, 125, 145, 150, 120, 110, 165, 122]
        ]
      }
    }
  },
  components: {
    ChartsLine,
    DragItem,
    Loading,
    Waterfall,
    WaterfallItem,
    SmoothTransition
  },
  computed: {

  },
  methods: {
    getData () {
      let data = [152, 242, 162, 141, 182, 162, 242, 251]
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.WaterfallData.push(data[i % 8])
        }
      }, 3000)
    },
    add () {
      this.list.push({ name: 'Juan ' + id, order: id + 10, id: id++ })
    },
    sort () {
      this.list = this.list.sort((a, b) => a.order - b.order)
    },
    fun () {
      setTimeout(() => {
        let obj = {
          label: ['CMCC', 'CTCC', 'CFCC'],
          time: ['13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00'],
          data: [
            [182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 200],
            [110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150, 188],
            [182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122, 99]
          ]
        }
        let obj1 = {
          label: ['1121', 'CT11CC', 'CF22CC'],
          time: ['13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00'],
          data: [
            [182, 120, 110, 125, 145, 122, 165, 122, 200],
            [110, 125, 145, 122, 165, 122, 220, 182, 191],
            [182, 125, 145, 122, 120, 110, 165, 122, 99]
          ]
        }
        this.chartsData = obj
        // Object.assign(this.chartsData, obj)
        Object.assign(this.chartsData1, obj1)
      }, 2000)
    },
    drawPolygons: function () {
      var canvas = document.getElementById('areaCanvas')
      if (canvas == null || !canvas.getContext) return
      var ctx = canvas.getContext('2d')
      // 清除画布，准备绘制
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = 700
      canvas.height = 500
      console.log(canvas.width, canvas.height)
      this.drawPolygonByPoint(ctx, null)
      var _this = this
      canvas.onmousemove = function (e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        var location = _this.getLocation(canvas, e.clientX, e.clientY)
        _this.drawPolygonByPoint(ctx, location)
      }
    },
    drawPolygonByPoint: function (ctx, location) {
      this.collectionArr.map(pointsArr => {
        if (location != null && inside(location, pointsArr) === true) {
          // 绘制高亮图形
          this.drawHighLightPolygon(ctx, pointsArr)
        } else {
          // 绘制一般图形
          this.drawGeneralPolygon(ctx, pointsArr)
        }
      })
    },
    drawGeneralPolygon: function (ctx, pointsArr) {
      ctx.beginPath()
      for (let i = 0; i < pointsArr.length; i++) {
        if (i === 0) {
          ctx.moveTo(pointsArr[i][0], pointsArr[i][1])
        } else if (i < pointsArr.length - 1) {
          ctx.lineTo(pointsArr[i][0], pointsArr[i][1])
        } else {
          ctx.lineTo(pointsArr[i][0], pointsArr[i][1])
          ctx.closePath()
          ctx.stroke()
        }
      }
    },
    drawHighLightPolygon: function (ctx, pointsArr) {
      ctx.beginPath()
      for (let i = 0; i < pointsArr.length; i++) {
        if (i === 0) {
          ctx.moveTo(pointsArr[i][0], pointsArr[i][1])
        } else if (i < pointsArr.length - 1) {
          ctx.lineTo(pointsArr[i][0], pointsArr[i][1])
        } else {
          ctx.lineTo(pointsArr[i][0], pointsArr[i][1])
          ctx.fillStyle = '#FF7F00'
          ctx.fill()
          ctx.closePath()
          ctx.stroke()
        }
      }
    },
    getLocation: function (canvas, x, y) {
      var bbox = canvas.getBoundingClientRect()
      return [(x - bbox.left) * (canvas.width / bbox.width), (y - bbox.top) * (canvas.height / bbox.height)]
      /*
           * 此处不用下面两行是为了防止使用CSS和JS改变了canvas的高宽之后是表面积拉大而实际
           * 显示像素不变而造成的坐标获取不准的情况
          x: (x - bbox.left),
          y: (y - bbox.top)
          */
    },
    draw (e) {
      clearTimeout(time) // 首先清除计时器
      time = setTimeout(() => {
        console.log(e.layerX, e.layerY)
        this.temp.push([e.layerX, e.layerY])
      }, 300) // 大概时间300ms
    },
    shishiClick () {
      clearTimeout(time) // 清除
      console.log('db')
      this.collectionArr.push(this.temp)
      this.temp = []
      console.log(this.collectionArr)
      this.drawPolygons()
    },
    // 在画布上画点,我的项目上先在画布上用户点四个点，当四个点点击完毕，四个点消失，然后连成一个带有背景色的不规则四边形
    selectPoint ($el, e) {
      console.log($el, e)
      if (this.actionStatus === 'detail') {
        return false
      }
      let offsetListCopy = this.offsetList
      if (
        offsetListCopy.offsetPointLb !== '' &&
        offsetListCopy.offsetPointLt !== '' &&
        offsetListCopy.offsetPointRb !== '' &&
        offsetListCopy.offsetPointRt !== ''
      ) {
        this.pointNum++
        let obj = {}
        obj.x = $el.offsetX
        obj.y = $el.offsetY
        console.log(obj)
        let _this = this
        if (this.pointData.length === 4) {
          return false
        } else {
          _this.pointData.push(obj)
          let color = '#6495ED'
          if (_this.pointNum === 1) {
            _this.detailData.offsetPointLt = JSON.stringify(_this.pointData[0])
          }
          if (_this.pointNum === 2) {
            _this.detailData.offsetPointLb = JSON.stringify(_this.pointData[1])
          }
          if (_this.pointNum === 3) {
            _this.detailData.offsetPointRt = JSON.stringify(_this.pointData[2])
          }
          if (_this.pointNum === 4) {
            _this.detailData.offsetPointRb = JSON.stringify(_this.pointData[3])
          }

          if (_this.pointNum < 4) {
            let img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = _this.ctxPic
            let canvas = document.getElementById('myCanvas')
            _this.ctx = canvas.getContext('2d')
            img.onload = () => {
              _this.ctx.drawImage(img, 0, 0, 660, 260)
              // 简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
              if (canvas.getContext) {
                _this.ctx = canvas.getContext('2d')
                _this.ctx.fillStyle = '#BF001E'
                _this.ctx.fillRect(obj.x, obj.y, 4, 4)
                _this.ctx.font = '12px bold 宋体'
                _this.convertCanvasToImage(canvas)
                // //注意，Canvas的坐标系是：Canvas画布的左上角为原点(0,0)，向右为横坐标，向下为纵坐标，单位是像素(px)。
              }
            }
          } else if (_this.pointNum === 4) {
            this.clearCanvas()
            this.canvasImg = true
            this.ctxPic = this.imgUrl
            this.$forceUpdate()
            let img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = _this.ctxPic
            let canvas = document.getElementById('myCanvas')
            _this.ctx = canvas.getContext('2d')
            img.onload = () => {
              _this.ctx.drawImage(img, 0, 0, 660, 260)
              // 简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
              if (canvas.getContext) {
                _this.ctx = canvas.getContext('2d')

                _this.drawCanvas(
                  _this.pointData[0],
                  _this.pointData[1],
                  _this.pointData[2],
                  _this.pointData[3],
                  '',
                  color
                )
                _this.convertCanvasToImage(canvas)
                // //注意，Canvas的坐标系是：Canvas画布的左上角为原点(0,0)，向右为横坐标，向下为纵坐标，单位是像素(px)。
              }
            }
          }
        }
      }
    },
    // 清除点
    clearCanvas () {
      let _this = this
      let ctxPicCopy = this.ctxPic
      _this.ctxPic = ctxPicCopy
      var c = document.getElementById('myCanvas')
      var cxt = c.getContext('2d')
      console.log(cxt)
      this.$forceUpdate()
    }
  },
  mounted () {
    this.fun()
    // this.collectionArr.push(this.pointsArr)
    // this.collectionArr.push([[20, 30], [50, 30], [50, 50], [20, 50]])
    // this.collectionArr.push([[60, 3], [50, 20], [70, 40], [80, 30], [70, 20], [80, 0]])
    // console.log(this.collectionArr)
    // this.drawPolygons()
  }
}
</script>

<style lang="scss" scoped>
.listItem {
  cursor: move;
}
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.workshopCanvas {
  height: 500px;
  position: relative;
}
</style>
