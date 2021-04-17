<template>
	 <el-dialog 
	 title="详细信息"
	 :visible.sync="docDetailVisible"
	 :close-on-click-modal="false"
	 :close-on-press-escape="false"
	 width="800px"
	 class="remark-form"
	 @close="close"
	 append-to-body>
		<p>title: {{ documentDetail.title }}</p>
		<el-divider></el-divider>
		<p>keySentence: {{ documentDetail.keySentence }}</p>
		<el-divider></el-divider>
		<!-- <div  title="this.aaa" style="width:200px;white-space: nowrap;text-overflow:ellipsis; overflow:hidden;">{{documentDetail.content}}</div> -->
		<p>content: {{ documentDetail.content }}</p>
	   
	   <img v-for="url in documentDetail.urls" :src="url" height="500" width="750"/>
	 </el-dialog>
</template>

<script>
	import * as clusteringAPI from '@services/clustering.js'
	
	 export default {
		name: 'docDetailDialog',
		props: ['docDetailVisible', 'detail'],
	    data() {
	      return {
	        documentDetail:{"title":"【衣食住行】声音提醒","keySentence":"对于服务管理员,选择范围同服务,任务出现的间隔小于完整语音播报时长时","content":"需要声音提醒的场景梳理： 极端场景：对于新任务和新订单，一个节点的负责人不断收到任务，任务出现的间隔小于完整语音播报时长时：只播报一个完整语言。  对于服务管理员：这两条服务，默认管理员为“事务负责人，可以进行选择，选择范围同服务”   ",
			"urls":[
				"https://mkpub-release.menkor.com/affair/10000223/announcement/发布中表格的问题.jpeg"
				
				]
			},
			docDetailVisible:false
	      }
	    },
		watch: {
		  docDetailVisible: {
		    immediate: true,
		    handler (val) {
		      if (val && this.detail) {
		        this.findAllContents(this.detail.id)
		      }
		    }
		  }
		},
	    methods: {
			close () {
			  this.$emit('close')
			},
		  findAllContents(id){
			  clusteringAPI.findAllContents(id).then(res => {
				this.documentDetail = res
				
			  }).catch(err => {
				console.log(err)
			  })
		    }
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