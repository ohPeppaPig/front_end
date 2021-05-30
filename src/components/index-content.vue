<template>
	<div>
		<el-card shadow="always" style="padding-bottom: 20px;">
		 <!--    <el-select  placeholder="历史文档" style="margin-right:30px">
		     			 <el-option @click="keyWords(0)">
		     			   <span style="float: left" @click="keyWords(0)">思目</span>
		     			   <span style="float: right; color: #8492a6; font-size: 13px" @click="keyWords(0)">simu</span>
		     			 </el-option>
		     			 <el-option @click="keyWords(1)">
		     			   <span style="float: left" @click="keyWords(1)">政策</span>
		     			   <span style="float: right; color: #8492a6; font-size: 13px">government</span>
		     			 </el-option>
		       </el-select> -->
		     <div style="float: right;">
		     			 <el-button type="primary" @click="upload">上传文档<i class="el-icon-upload el-icon--right"></i></el-button>
		     			 <el-button @click="customWords">自定义常用词</el-button>
						 <el-button @click="keyWords(0)">关键词选择</el-button>
		     </div>
		</el-card>
		<el-divider content-position="left">历史文档</el-divider>
		<!-- <el-card>
			<div>
				<el-button  @click="add(0)">思目数据分析</el-button>
				<el-button  @click="add(1)">政府数据分析</el-button>
			</div>
		</el-card> -->
		
		<upload-dialog
		  :visible="uploadDialogVisible"
		  @close="uploadDialogVisible = false">
		</upload-dialog>
		<!-- <upload-dialog
		  :visible="reversedWordsVisibke"
		  @close="reversedWordsVisibke = false">
		</upload-dialog> -->
		<reversed-words
		:visible="reversedWordsVisibke"
		@close="reversedWordsVisibke = false">
		</reversed-words>
		
		<classify-key-words-dialog
		:visible="keyWordsVisible"
		:projectId="id"
		@close="keyWordsVisible = false">
		</classify-key-words-dialog>
	</div>
</template>

<script>
	import UploadDialog from '@components/upload-dialog.vue'
	import reversedWords from '@components/reversed-words'
	import ClassifyKeyWordsDialog from '@components/classify-keywords-dialog.vue'
	
	export default {
		 data() {
			 return{
				 uploadDialogVisible:false,
				 reversedWordsVisibke:false,
				 keyWordsVisible:false,
				 id:0
			 }
		 },
		
		components:{
			UploadDialog,
			reversedWords,
			ClassifyKeyWordsDialog
		},
		methods:{
			keyWords(id){
				// this.project.id = 0
				this.id=id
				this.keyWordsVisible=true
				// this.statistics(this.id)
			},
			upload () {
			  this.uploadDialogVisible = true
			},
			customWords () {
				this.reversedWordsVisibke = true
			},
			link (path) {
			  this.$router.push(path)
			},
			add(id){
				// this.$parent.add(id)
				console.warn(this.$parent)
			}
		}
	}
</script>

<style>
</style>
