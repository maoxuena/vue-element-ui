<template>
  <div>
    <el-button :loading="downloadLoading"
               type="primary"
               icon="el-icon-document"
               @click="handleDownload">
      Export Selected Items
    </el-button>
    <el-table ref="multipleTable"
              v-loading="listLoading"
              :data="list"
              element-loading-text="拼命加载中"
              highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       align="center" />
      <el-table-column align="center"
                       label="Id"
                       width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author"
                       width="110"
                       align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="Readings"
                       width="115"
                       align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="PDate"
                       width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.displayTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
export default {
  name: 'virtual-list',
  data () {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDownload () {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'displayTime']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
