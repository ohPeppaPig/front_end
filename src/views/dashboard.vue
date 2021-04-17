<template>
  <div class="dashboard-wrap">
	<div class="content">
	   <div class="right">
		   <el-select v-model="value" placeholder="历史文档" style="margin-right:30px">
			 <el-option @click="keyWords(0)">
			   <span style="float: left" @click="keyWords(0)">思目</span>
			   <span style="float: right; color: #8492a6; font-size: 13px" @click="keyWords(0)">simu</span>
			 </el-option>
			 <el-option @click="keyWords(1)">
			   <span style="float: left" @click="keyWords(1)">政策</span>
			   <span style="float: right; color: #8492a6; font-size: 13px">government</span>
			 </el-option>
		   </el-select>
		 <el-button type="primary" @click="upload">上传文档<i class="el-icon-upload el-icon--right"></i></el-button>
	     <el-button @click="customWords">自定义常用词</el-button>
	   </div>
	</div>
	
    <div class="current">
      <div class="title">当前项目:</div>
	  
	  <!-- 数量展示 -->
	  <el-row class="panel-group" :gutter="40">
	    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	      <div class="card-panel">
	        <div class="card-panel-icon-wrapper icon-money "  @click="link('/clustering/first-level/:6')">
	          <!-- <svg-icon icon-class="eye" class-name="card-panel-icon"/> -->
				<i style="font-size:25px" class="el-icon-folder-opened"></i>
	        </div>
	        <div class="card-panel-description">
	          <div class="card-panel-text">一级分类数目:</div>
			  <i style="font-size:18px">{{nums.oneCategory}}</i>  
<!-- 	          <count-to class="card-panel-num" :startVal="0" :endVal="visitAddTotal" :duration="3200"></count-to>
 -->	        </div>
	      </div>
	    </el-col>
	  
	    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	      <div class="card-panel">
	        <div class="card-panel-icon-wrapper icon-people" @click="btnClick('2')">
				<i style="font-size:25px" class="el-icon-folder-opened"></i>
	        </div>
	        <div class="card-panel-description">
	          <div class="card-panel-text">二级分类数目:</div>
				<i style="font-size:18px">{{nums.twoCategory}}</i>
<!-- 	          <count-to class="card-panel-num" :startVal="0" :endVal="userTotal" :duration="2600"></count-to>
 -->	        </div>
	      </div>
	    </el-col>
	  
	    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	      <div class="card-panel">
	        <div class="card-panel-icon-wrapper icon-message" @click="link('/remarked')">
				<i style="font-size:30px" class="el-icon-s-comment"></i>
	        </div>
	        <div class="card-panel-description">
	          <div class="card-panel-text">评论数:</div>
			  <i style="font-size:18px">{{nums.commentNums}}</i>
<!-- 	          <count-to class="card-panel-num" :startVal="0" :endVal="commentTotal" :duration="3000"></count-to>
 -->	        </div>
	      </div>
	    </el-col>
	    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	      <div class="card-panel">
	        <div class="card-panel-icon-wrapper icon-shoppingCard" @click="btnClick('4')">
				<i style="font-size:30px" class="el-icon-document"></i>
			</div>
	        <div class="card-panel-description">
	          <div class="card-panel-text">文章总数:</div>
			  <i style="font-size:18px">{{nums.allDocNums}}</i>
<!-- 	          <count-to class="card-panel-num" :startVal="0" :endVal="blogTotal" :duration="3600"></count-to>
 -->	        </div>
	      </div>
	    </el-col>
	  </el-row>
	  <!-- <el-divider></el-divider> -->
	  
	  
	  <!-- 分类图-->
	  <el-row :gutter="32" >
	    <el-col :xs="24" :sm="24" :lg="8">
	      <div class="chart-wrapper">
	        <!-- <pie-chart ></pie-chart> -->
			<pie-chart ref="chart"/>
	      </div>
	    </el-col>
		<el-col :xs="24" :sm="24" :lg="8" style="margin-left: 50px;">
		  <div class="chart-wrapper">
			<!-- <chart-lint ref='chart_line_one'></chart-lint> -->
			<column-chart ref='chart_line_one'></column-chart>
		  </div>
		</el-col>
	  </el-row>
	  
	  <el-divider content-position="left">批注文档集</el-divider>
	 <el-table
	     :data="tableData"
	     height="250"
	     border
	     style="width: 100%">
		 <el-table-column
		   prop="id"
		   label="id"
		   width="100">
		   <template slot-scope="scope">
		     <div style="color:brown" @click="detail(scope.row)">{{ scope.row.id }}</div>
		 	<!-- <div>{{categoryTwo.name}}</div> -->
		   </template>
		 </el-table-column>
	     <el-table-column
	       prop="title"
	       label="title"
	       width="200">
	     </el-table-column>
	     <el-table-column
	       prop="categoryOne"
	       label="categoryOne"
	       width="150">
	     </el-table-column>
	     <el-table-column
	       prop="categoryTwo"
	       label="categoryTwo"
		   width="180">
	     </el-table-column>
		 
		 <el-table-column
		   label="time"
		   width="100">
		   <template slot-scope="scope">
		     <div @click="detail(scope.row)">2021-4-12</div>
		 	<!-- <div>{{categoryTwo.name}}</div> -->
		   </template>
		 </el-table-column>
		 
		 <el-table-column
		   label="user"
		   width="100">
		   <template slot-scope="scope">
		     <div @click="detail(scope.row)">管理员</div>
		 	<!-- <div>{{categoryTwo.name}}</div> -->
		   </template>
		 </el-table-column>
	 </el-table>	 
    </div>

   <!-- <div class="history">
      <div class="title">历史项目</div>
      <div class="content">
		  <el-row class="panel-group" :gutter="40">
			  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
				  <div class="card-panel">
					<div class="card-panel-icon-wrapper" @click="btnClick('2')">
						<i style="font-size:20px" class="el-icon-folder-opened"></i>
					</div>
					<div class="card-panel-description">
					  <el-link type="primary" @click="keyWords(0)">思目数据分析</el-link>
					</div>
				  </div>
			  </el-col>
			  
			  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
				  <div class="card-panel">
					<div class="card-panel-icon-wrapper" @click="btnClick('2')">
						<i style="font-size:20px" class="el-icon-folder-opened"></i>
					</div>
					<div class="card-panel-description">
						<el-link type="primary" @click="keyWords(1)">政府文档分析</el-link>
					</div>
				  </div>
			  </el-col>
		  </el-row>
		 
      </div>
    </div> -->
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
	
	<doc-detail
	:docDetailVisible="remarkFormVisible"
	:detail="currentDetail"
	@close="remarkFormVisible = false">
	</doc-detail>
  </div>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'	
import UploadDialog from '@components/upload-dialog.vue'
import reversedWords from '@components/reversed-words'
import PieChart from '@components/pie-chart.vue'
import ClassifyKeyWordsDialog from '@components/classify-keywords-dialog.vue'
import chartLint from '@components/chartLint.vue'
import columnChart from '@components/columnChart.vue'
import docDetail from '@components/doc-detail.vue'

export default {
  name: 'Dashboard',
  mounted() {
	this.chartDispaly()
  	this.$refs.chart.initData(this.name,this.data)
	const {name,xData,yData} = this
    console.log(this.$refs)
    this.$refs.chart_line_one.initChart(name,xData,yData)
  },
  data () {
    return {
	  nums:{
		oneCategory:1,
		twoCategory:2,
	    commentNums:3,
		allDocNums:4,
		id:5
	  },
	  cities: [{
		value: 'Beijing',
		label: '北京'
		}, {
		value: 'Shanghai',
		label: '上海'
	  }],
	  tableData: [
		{"id":13000312,"title":"【会议记录】2018年5月21日例会记录","categoryOne":"产品会议","categoryTwo":"周,计划,波,杜,物资","comment":"注释"},
		{"id":13190750,"title":"【产学研教】共享雨伞硬件厂家调研","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"123445的撒大"},
		{"id":13240745,"title":"【产学研教】共享雨伞需求","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"12"},
		{"id":13291129,"title":"【 产学研教】共享雨伞H5需求","categoryOne":"产学研教","categoryTwo":"伞,服务,用户,科技,雨伞","comment":"dasd"}
	  ],
      uploadDialogVisible: false,
	  reversedWordsVisibke:false,
	  keyWordsVisible:false,
	  name:'备注记录',
	  data:[{"sid":6,"name":"产学研教","value":56},{"sid":7,"name":"成长伙伴","value":15},{"sid":8,"name":"物资库","value":72},{"sid":9,"name":"产品会议","value":96},{"sid":10,"name":"盟客网","value":23},{"sid":11,"name":"智慧城市","value":23},{"sid":12,"name":"超级账号","value":228},{"sid":13,"name":"思目论坛","value":5},{"sid":14,"name":"需求记录清单","value":45},{"sid":15,"name":"培训相关","value":9},{"sid":16,"name":"盟客币","value":77},{"sid":17,"name":"旅游申请","value":7},{"sid":18,"name":"衣食住行","value":238}],
	  xData: ['0','2021-02', '2021-03', '2021-04', '2021-05'],
	  yData: [0,10, 20, 15, 9],
	  remarkFormVisible:false,
	  currentDetail: null
    }
  },
  components: {
    UploadDialog,
	reversedWords,
	PieChart,
	ClassifyKeyWordsDialog,
	chartLint,
	columnChart,
	docDetail
  },
  methods: {
    upload () {
      this.uploadDialogVisible = true
    },
    customWords () {
		this.reversedWordsVisibke = true
    },
    link (path) {
      this.$router.push(path)
    },
	keyWords(id){
		// this.project.id = 0
		this.id=id
		if(id == 1){
			this.statistics(1)
		}else{
			this.statistics(0)
		}
		this.keyWordsVisible=true
		// this.statistics(this.id)
	},
	statistics(id){
		  clusteringAPI.getStatistics(id).then(res => {
			this.nums=res
		  }).catch(err => {
			console.log(err)
		  })
	},
	chartDispaly(){
		clusteringAPI.adminChartDisplay().then(res => {
			this.data=res
		}).catch(err => {
			console.log(err)
		})
	},
	getRemarkedDocs() {
	  clusteringAPI.findRemarkedDocs().then(res => {
	    
		this.tableData = res
	  }).catch(err => {
	    console.log(err)
	  })
	},
	detail(val){
		this.remarkFormVisible=true
		this.currentDetail=val
	}	
	
  },
  created () {
	this.id=0
    this.statistics(this.id)
	this.getRemarkedDocs()
	this.chartDispaly()
  }
}
</script>

<style lang="scss" scoped>
.right{ float:right;width: 600px;}
.chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
}
.dashboard-wrap {
  .title {
    background: #b3c0d1;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
  }
  .current {
    .content {
      display: flex;
      padding: 10px;
      .left {
        flex: 1;
        .top {
          display: flex;
          justify-content: space-around;
        }
      }
      .right {
        width: 200px;
        button {
          &:last-child {
            margin-left: 0;
            margin-top: 15px;
          }
        }
      }
    }
  }
  .history {
    .content {
      padding: 10px;
      .el-link {
        margin-left: 15px;
      }
    }
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px 0 0 70px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
		// padding-right: 3px;
		margin-right: 1px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
