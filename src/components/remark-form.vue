<template>
	 <el-dialog 
	 title="批注信息"
	 :visible.sync="remarkVisible"
	 :close-on-click-modal="false"
	 :close-on-press-escape="false"
	 width="600px"
	 class="remark-form"
	 @close="close">
	   <el-form :model="form">
	     <el-form-item label="批注" :label-width="formLabelWidth">
	       <el-input v-model="form" autocomplete="off"></el-input>
	     </el-form-item>
	     <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
	       <el-select v-model="form.region" placeholder="请选择活动区域">
	         <el-option label="区域一" value="shanghai"></el-option>
	         <el-option label="区域二" value="beijing"></el-option>
	       </el-select>
	     </el-form-item> -->
	   </el-form>
	   <div slot="footer" class="dialog-footer">
	     <el-button @click="remarkVisible = false">取 消</el-button>
	     <el-button type="primary" @click="onSubmit">确 定</el-button>
	   </div>
	 </el-dialog>
</template>

<script>
	import * as clusteringAPI from '@services/clustering.js'
	
	 export default {
		name: 'remarkFormDialog',
		props: ['remarkVisible', 'detail'],
	    data() {
	      return {
	        form: "",
			remarkVisible:false
	      }
	    },
		watch: {
		  remarkVisible: {
		    immediate: true,
		    handler (val) {
		      if (val && this.detail) {
		        this.findComment(this.detail.id)
		      }
		    }
		  }
		},
	    methods: {
			close () {
			  this.$emit('close')
			},
	      onSubmit() {
	        this.insertComment(this.detail.id,this.form)
			this.$parent.getDetail()
			this.remarkVisible = false
			// this.$router.go(0)
			
	      },
		  findComment(id){
			  clusteringAPI.findComment(id).then(res => {
			    // TODO 赋值二级分类簇表格信息
			  	this.form = res
			  }).catch(err => {
			    console.log(err)
			  })
		  },
		  insertComment(id,comment){
			  clusteringAPI.insertComment(id,comment).then(res => {
				remarkVisible = false
				this.close()
			  }).catch(err => {
				console.log(err)
			  })
		  }
	    },
		created () {
			const id = this.detail.id;
			this.findComment(id)
		}
	  }
	 
</script>

<style lang="scss" scoped>
.remark-form {
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
}
</style>
