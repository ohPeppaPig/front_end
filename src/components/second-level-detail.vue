<template>
  <div class="second-level-detail-wrap">
    <div class="header">
      <div class="document-name">二级文档簇名称：{{}}</div>
      <div class="document-desc">文档簇描述信息：{{}}</div>
    </div>
    <div class="main">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-link type="primary" @click="detail(scope.row)">查看</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="footer">
      <div>相似文档簇</div>
      <el-table
        :data="similarData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="文档簇名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属一级分类">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="detail(scope.row)">查看</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <second-level-detail-dialog
      :visible="detailDailogVisible"
      :detail="currentDetail"
      @close="detailDailogVisible = false">
    </second-level-detail-dialog>
  </div>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'
import SecondLevelDetailDialog from './second-level-detail-dialog.vue'

export default {
  name: 'SecondLevelDetail',
  data () {
    return {
      tableData: [{}],
      // similarData: [{}],
      detailDailogVisible: false,
      currentDetail: null
    }
  },
  components: {
    SecondLevelDetailDialog
  },
  methods: {
    detail (val) {
      this.currentDetail = val
      this.detailDailogVisible = true
    },
    getDetail (id) {
      clusteringAPI.getSecondLevelDetail(id).then(res => {
        // TODO 赋值二级分类簇表格信息
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created () {
    const id = this.$route.params.id;
    this.getDetail(id)
  }
}
</script>

<style lang="scss" scoped>
.second-level-detail-wrap {
  .header {
    display: flex;
    div {
      width: 50%;
    }
  }
}
</style>
