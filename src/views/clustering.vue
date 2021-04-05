<template>
  <el-container class="clustering-wrap">
    <el-aside class="document-tree">
      <el-card>
        <el-tree
          :data="treeData"
          :expand-on-click-node="false"
          :props="{children: 'categoryTwo', label: 'sname'}"
          @node-click="handleNodeClick">
        </el-tree>
      </el-card>
    </el-aside>
    <el-main class="content-wrap">
      <el-card>
        <router-view></router-view>
      </el-card>
    </el-main>
  </el-container>  
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'

export default {
  name: 'Clustering',
  data () {
    return {
      treeData: [
        {
          sname: '一级 1',
          sid: 1,
          categoryTwo: [{
            sname: '二级 1-1',
            sid: 1
          }]
        },
        {
          sname: '一级 1',
          categoryTwo: [{
            sname: '二级 1-1',
          }]
        },
        {
          sname: '一级 1',
          categoryTwo: [{
            sname: '二级 1-1',
          }]
        }
      ]
    }
  },
  methods: {
    handleNodeClick (val) {
      const id = val && val.sid;
      if (val.categoryTwo) { // 点击一级标题
        this.$router.push({ path: `/clustering/first-level/${id}` })
      } else { // 点击二级标题
        this.$router.push({ path: `/clustering/second-level/${id}` })
      }
    },
    getTree () {
      clusteringAPI.getTree().then(res => {
        // TODO 接口返回可能格式跟预想不一样
        this.treeData = res || [];
        const defaultId = this.treeData[0] && this.treeData[0].sid;
        this.$router.push({ path: `/clustering/first-level/${defaultId}` })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getTree()
  }
}
</script>

<style lang="scss" scoped>
.clustering-wrap {
  main {
    padding: 0;
  }
  .document-tree {
    width: unset !important;
    .el-card {
      width: 400px;
      min-height: calc(100vh - 90px);
      margin-right: 10px;
    }
  }
  .content-wrap {
    .el-card {
      min-height: calc(100vh - 90px);
    }
  }
}
</style>
