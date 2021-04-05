<template>
  <el-dialog
    title="数据详情"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    class="second-level-detail-dialog"
    @close="close">
    <div>
      <p>id: {{ documentDetail.id }}</p>
      <p>title: {{ documentDetail.title }}</p>
      <p>content: {{ documentDetail.content }}</p>
      <h4>相似文档集</h4>
      <el-table
        :data="documentDetail.similaryDocs">
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="title"
          label="title">
        </el-table-column>
        <el-table-column
          prop="content"
          label="content">
        </el-table-column>
        <el-table-column
          prop="categoryOneName"
          label="一级分类">
        </el-table-column>
        <el-table-column
          prop="categorytwoName"
          label="二级分类">
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'

export default {
  name: 'SecondLevelDetailDialog',
  props: ['visible', 'detail'],
  data () {
    return {
      documentDetail: {}
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (val && this.detail) {
          this.getDocumentDetail(this.detail.id)
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    getDocumentDetail (id) {
      clusteringAPI.getDocumentDetail(id).then(res => {
        // TODO 需要调试
        this.documentDetail = res || {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.second-level-detail-dialog {
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
}
</style>
