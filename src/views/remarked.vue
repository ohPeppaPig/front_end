<template>
	<div>
		<el-divider content-position="left">备注文档集</el-divider>
		<el-table
		    :data="tableData"
		    stripe=true
			border=true
		    style="width: 100%">
		    <el-table-column
		      prop="id"
		      label="id"
		      width="100">
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
			<el-table-column
			  prop="comment"
			  label="comment">
			</el-table-column>
			<el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.row)">查询详细</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.row)">删除批注</el-button>
			      </template>
			    </el-table-column>
		  </el-table>
		  
		  <doc-detail
		  :docDetailVisible="remarkFormVisible"
		  :detail="currentDetail"
		  @close="remarkFormVisible = false">
		  </doc-detail>
		
	</div>
	
</template>

<script>
	import * as clusteringAPI from '@services/clustering.js'
	import docDetail from '@components/doc-detail.vue'
	
	export default {
	    data() {
	      return {
	        tableData: [
				{"id":13000312,"title":"【会议记录】2018年5月21日例会记录","categoryOne":"产品会议","categoryTwo":"周,计划,波,杜,物资","comment":"注释"},
				{"id":13190750,"title":"【产学研教】共享雨伞硬件厂家调研","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"123445的撒大"},
				{"id":13240745,"title":"【产学研教】共享雨伞需求","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"12"},
				{"id":13291129,"title":"【 产学研教】共享雨伞H5需求","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"dasd"},
			],
			remarkFormVisible:false,
			currentDetail: null
	      }
	    },
		components:{
			docDetail
		},
		methods:{
			getRemarkedDocs() {
			  clusteringAPI.findRemarkedDocs().then(res => {
			    
				this.tableData = res
			  }).catch(err => {
			    console.log(err)
			  })
			},
			handleEdit(val){
				this.remarkFormVisible=true
				this.currentDetail=val
			},
			handleDelete(val){
				clusteringAPI.delComment(val.id).then(res => {
					this.getRemarkedDocs()
				}).catch(err => {
				  console.log(err)
				})
			}
		},
		created() {
			this.getRemarkedDocs()
		}
	}
</script>

<style>
</style>
