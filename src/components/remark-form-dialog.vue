<template>
	<el-dialog
	  title="备注文档集"
	  :visible.sync="visible"
	  :close-on-click-modal="false"
	  :close-on-press-escape="false"
	  width="780px"
	  @opened="openMethods"
	  @close="close">
	  
	  <el-table
	      :data="tableData"
	      stripe=true
	  	  border=true
	      style="width: 100%">
	      <el-table-column
	        prop="id"
	        label="id"
	        width="150">
	        <template slot-scope="scope">
	          <div style="color:brown" @click="handleEdit(scope.row)">{{ scope.row.id }}</div>
	      	<!-- <div>{{categoryTwo.name}}</div> -->
	        </template>
	      </el-table-column>
	      <el-table-column
	        prop="title"
	        label="title"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="categoryOne"
	        label="categoryOne"
	  	  width="150">
	      </el-table-column>
	  	<el-table-column
	  	  prop="categoryTwo"
	  	  label="categoryTwo">
	  	</el-table-column>
	 </el-table>
	    
	    <second-level-detail-dialog
	      :visible="detailDailogVisible"
	      :detail="currentDetail"
	      @close="detailDailogVisible = false">
	    </second-level-detail-dialog>
	  
	  
	</el-dialog>
	
	
</template>

<script>
	import * as clusteringAPI from '@services/clustering.js'
	import SecondLevelDetailDialog from "./second-level-detail-dialog.vue"
	
	export default {
		props: ['visible', 'ids'],
		components:{
			SecondLevelDetailDialog
		},
	      data() {
	        return {
	          tableData: [
	          	{"id":13000312,"title":"【会议记录】2018年5月21日例会记录","categoryOne":"产品会议","categoryTwo":"周,计划,波,杜,物资","comment":"注释"},
	          	{"id":13190750,"title":"【产学研教】共享雨伞硬件厂家调研","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"123445的撒大"},
	          	{"id":13240745,"title":"【产学研教】共享雨伞需求","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"12"},
	          	{"id":13291129,"title":"【 产学研教】共享雨伞H5需求","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"dasd"},
	          ],
			  detailDailogVisible:false,
			  currentDetail:null
	        }
	      },
		  methods:{
			openMethods(){
				console.warn("打开备注成功")
				this.getRemarkedDocs()
			},
			close () {
			  this.$emit('close')
			},
			getRemarkedDocs() {
			  clusteringAPI.findComments(this.ids).then(res => {
			    
				this.tableData = res
			  }).catch(err => {
			    console.log(err)
			  })
			},
			handleEdit(val){
				this.detailDailogVisible=true
				this.currentDetail=val
			}
		  }
	}
</script>

<style>
</style>
