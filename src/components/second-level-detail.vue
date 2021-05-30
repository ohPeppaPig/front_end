<template>
  <div class="second-level-detail-wrap">
    <div class="header">
<!--      <div class="document-name">二级文档簇名称：{{}}</div>
      <div class="document-desc">文档簇描述信息：{{}}</div> -->
    </div>
    <div class="main">
		<el-button type="success" v-show="this.multipleSelection.length > 1" size="mini" style="float: right;" icon="el-icon-s-promotion" @click="moveMulti()">
		多个调整</el-button>      
		<el-button type="success" style="float: right;" icon="el-icon-upload2">上传文档</el-button>
		<el-table
        :data="tableData"
		ref="multipleTable"
		@selection-change="handleSelectionChange"
        style="width: 100%">
		<el-table-column
		  type="selection"
		  width="55">
		</el-table-column>
		<el-table-column
		  prop="id"
		  label="id"
		  width="150">
		  <template slot-scope="scope">
		    <div style="color:brown" @click="detail(scope.row)">{{ scope.row.id }}</div>
			<!-- <div>{{categoryTwo.name}}</div> -->
		  </template>
		</el-table-column>
        <!-- <el-table-column
          prop="id"
          label="id"
          width="150">
        </el-table-column> -->
        <el-table-column
          prop="title"
          label="title">
        </el-table-column>
        <el-table-column
		width="230">
          <template slot-scope="scope">
		
<!-- 			<el-tooltip class="item" effect="dark" placement="top-start">
			   <i class="el-icon-s-flag" v-show="scope.row.comment" style="font-size: 10px; margin-left: 50px;color:brown;">(1)</i>
			</el-tooltip> -->
			
			<el-button type="success" size="mini" icon="el-icon-s-promotion" @click="move(scope.row)" style="margin-left: 100px;">分类调整</el-button>
			
          </template>
		  
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="footer">
      <div>相似文档簇</div>
      <el-table
        :data="similarData"
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
          <template slot-scope="scope">
            <el-link type="primary" @click="detail(scope.row)">查看</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <second-level-detail-dialog
      :visible="detailDailogVisible"
      :detail="currentDetail"
      @close="detailDailogVisible = false">
    </second-level-detail-dialog>
	
	<meum-select-dialog
	:meumVisible="meumVisible"
	:ids="arr"
	@close="meumVisible = false">
	</meum-select-dialog>
	

  </div>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'
import SecondLevelDetailDialog from './second-level-detail-dialog.vue'
import meumSelectDialog from "./meum-select-dialog.vue"


export default {
  name: 'SecondLevelDetail',
  data () {
    return {
      tableData: [
		  {id:13190750,
		  title:"【产学研教】共享雨伞硬件厂家调研",
		  content:" 1.深圳便捷伞科技有限公司电话：13632822821邮箱：bjstech@163.combjstech@163.com官网：",
		  categoryLevelOneId:6,
		  categoryLevelTwoId:19,
		  comment:"123"}
		  ],
      // similarData: [{}],
      detailDailogVisible: false,
	  meumVisible: false,
      currentDetail: null,
	  multipleSelection: [],
	  arr:[]
    }
  },
  components: {
    SecondLevelDetailDialog,
	meumSelectDialog
  },
  methods: {
	moveMulti(){
		this.arr = []
		for(var n = 0;n<this.multipleSelection.length;n++){
			this.arr.push(this.multipleSelection[n].id)
		}
		console.warn(this.arr)
		console.warn(this.arr[0])
		this.meumVisible = true
		// clusteringAPI.moveMulti(this.arr).then(res => {
		//   // TODO 赋值二级分类簇表格信息
		// 	this.arr = []
		// 	console.warn(this.arr)
		// }).catch(err => {
		//   console.log(err)
		// })
	},
    detail (val) {
      this.currentDetail = val
      this.detailDailogVisible = true
    },
    getDetail (id) {
      clusteringAPI.getSecondLevelDetail(id).then(res => {
        // TODO 赋值二级分类簇表格信息
		this.tableData = res
      }).catch(err => {
        console.log(err)
      })
    },
	move(val){
		this.arr = []
		this.arr.push(val.id)
		this.meumVisible = true
	},
	remark(val){
		this.currentDetail = val
		this.remarkFormVisible = true
	},
	
	toggleSelection(rows) {
		if (rows) {
		  rows.forEach(row => {
			this.$refs.multipleTable.toggleRowSelection(row);
		  });
		} else {
		  this.$refs.multipleTable.clearSelection();
		}
	  },
	  handleSelectionChange(val) {
		this.multipleSelection = val;
	  }
	
  },
  created () {
    const id = this.$route.params.id;
    this.getDetail(id)
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
