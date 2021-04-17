<template>
  <div class="second-level-detail-wrap">
    <div class="header">
<!--      <div class="document-name">二级文档簇名称：{{}}</div>
      <div class="document-desc">文档簇描述信息：{{}}</div> -->
    </div>
    <div class="main">
      <el-table
        :data="tableData"
		stripe=true
        style="width: 100%">
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
		   <!-- <el-button
			size="mini"
			type="primary"
			@click="detail(scope.row)">查看</el-button> -->
			
		   <!-- <el-button
			size="mini"
			type="success"
			@click="remark(scope.row)">批注</el-button> -->
			
		<!-- 	<el-button
			size="mini"
			type="success"
			@click="remark(scope.row)" v-show="scope.row.comment">显示</el-button> -->
		
			<el-tooltip class="item" effect="dark" placement="top-start">
			   <!-- <el-button>上左</el-button> -->
			   <div slot="content">{{scope.row.comment}}</div>
			   <i class="el-icon-s-flag" v-show="scope.row.comment" style="font-size: 10px; margin-left: 50px;color:brown;">(1)</i>
			   
			</el-tooltip>
		
			
			<!-- TODO 批注功能 :鼠标悬浮展示信息--> 
			
		<!-- 	<el-tooltip placement="top">
			  <div slot="content">多行信息<br/>第二行信息</div>
			  <el-button size="mini">Top</el-button>
			</el-tooltip> -->
            <!-- <el-link type="primary" @click="detail(scope.row)">查看  </el-link>
			<el-link type="primary" @click="detail(scope.row)">编辑  </el-link>
			<el-link type="primary" @click="detail(scope.row)">删除  </el-link> -->
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
	<remark-form
	:remarkVisible="remarkFormVisible"
	:detail="currentDetail"
	@close="remarkFormVisible = false">
	</remark-form>
  </div>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'
import SecondLevelDetailDialog from './second-level-detail-dialog.vue'
import remarkForm from './remark-form.vue'


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
	  remarkFormVisible:false,
      currentDetail: null,
    }
  },
  components: {
    SecondLevelDetailDialog,
	remarkForm
  },
  methods: {
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
	remark(val){
		this.currentDetail = val
		this.remarkFormVisible = true
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
