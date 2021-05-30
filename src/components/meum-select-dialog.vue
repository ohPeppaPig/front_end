<template>
	
	<el-dialog
	  title="请选择调整目的分类"
	  :visible.sync="meumVisible"
	  :close-on-click-modal="false"
	  :close-on-press-escape="false"
	  :accordion="true"
	  width="500px"
	  class="meum"
	  
	  @close="close">
	  
	 <el-card>
	    <el-tree
	      :data="treeData"
	  	  show-checkbox
	  	  node-key="id"
	  	  draggable
	      :expand-on-click-node="false"
	      :props="{children: 'categoryTwo', label: 'sname'}"
	  	ref="tree"
	  	highlight-current>
	    </el-tree>
	  </el-card>
	  <el-card >		
		<el-button  type="warning" size="medium" @click="close">取消</el-button>
		
		<el-button  type="success" size="medium" @click="move">确定</el-button>
	  </el-card>
		
	</el-dialog>
	
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'

export default {
  name: 'meum',
  props: ['meumVisible',"ids"],
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
		  sid:2,
		  sname: '二级 1',
		  pid:0,
		  categoryTwo: [{
			sid:1,
			sname: '二级 2-1',
			pid:1
		  }]
		}
	  ],
	  id:0,
	  categoryId:0
	}
  },
  watch: {
    meumVisible: {
      immediate: true,
  //     handler () {
		// this.getTree()
  //     }
	  handler (val) {
	    if (val && this.ids) {
			console.warn(this.ids[0])
		 if(this.ids[0]<100){
			 this.id = 1
		 }
	      // this.getDocumentDetail(this.detail.id)
		  this.getTree()
	    }
	  }
    }
  },
  methods: {
	// openMethods(){
	// 	this.getTree()
	// },
	close () {
	  this.$emit('close')
	},
	move(){
		if(this.$refs.tree.getCheckedNodes()[0]){
			console.log(this.$refs.tree.getCheckedNodes()[0].sid);
			 const id = this.$refs.tree.getCheckedNodes()[0].sid
			// this.$router.push({ path: `/clustering/second-level/${id}` })
			clusteringAPI.updateCategory(this.ids,id).then(res => {
				
			}).catch(err => {
			  console.log(err)
			})
			 this.$router.push({ path: `/clustering/second-level/${id}` })
			 this.$message({
			          showClose: true,
			          message: '恭喜你，迁移成功！',
			          type: 'success'
			        });
			this.close()
		}else{
			this.$message({
			          showClose: true,
			          message: '请选择你需要迁移的分类簇',
			          type: 'warning'
			        });
		}
		 
	},
	getTree () {
	  // console.warn(this.detail.id)
	  clusteringAPI.getTree(this.id).then(res => {
		// TODO 接口返回可能格式跟预想不一样
		// this.treeData = res || [];
		this.treeData = res
		// const defaultId = this.treeData[0] && this.treeData[0].sid;
	  }).catch(err => {
		console.log(err)
	  })
	}
  }

}
</script>

<style>
</style>
