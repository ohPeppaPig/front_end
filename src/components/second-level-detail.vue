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
          prop="date"
          label="id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="title">
        </el-table-column>
        <el-table-column
          prop="name"
          label="edit">
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div>相似文档簇</div>
      <el-table
        :data="tableData"
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
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondLevelDetail',
  data () {
    return {
      tableData: []
    }
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
