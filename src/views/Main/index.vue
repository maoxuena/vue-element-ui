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
export default {
  data () {
    return {
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
    }
  },
  mounted () {
    this.fun()
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
</style>
