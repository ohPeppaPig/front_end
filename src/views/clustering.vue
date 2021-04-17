<template>
  <el-container class="clustering-wrap">
    <el-aside class="document-tree">
      <el-card>
        <el-tree
          :data="treeData"
		  show-checkbox
		  node-key="id"
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
// import {EventBus} from '../utils/bus.js'

export default {
  name: 'Clustering',
  data () {
    return {
      treeData: [
        {
		  sid: 1,
          sname: '一级 1',
          pid:0,
          categoryTwo: [{
			sid: 1,  
            sname: '二级 1-1',
			pid:1
          }]
        },    
        {
		  sid:2
          sname: '二级 1',
		  pid:0,
          categoryTwo: [{
			sid:1
            sname: '二级 2-1',
			pid:1
          }]
        }
      ],
	  id:0
    }
  },
  mounted() {
  	console.warn("111")
	this.getTree()
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
	  if(this.$route.params.id){
		  this.id = this.$route.params.id
	  }else{
		  this.id = 0
	  }
	  console.warn(this.id); // 这里是undefined
      clusteringAPI.getTree(this.id).then(res => {
        // TODO 接口返回可能格式跟预想不一样
        // this.treeData = res || [];
		this.treeData = res
        // const defaultId = this.treeData[0] && this.treeData[0].sid;
		const defaultId = this.treeData[0].sid;
        this.$router.push({ path: `/clustering/first-level/${defaultId}` })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
	// EventBus.$on('msg', (val) => {
	//         this.id = val
	//     });
	
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
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
