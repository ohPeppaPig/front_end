<template>
  <div class="dashboard-wrap">
    <div class="current">
      <div class="title">当前项目:<i>政府数据</i></div>
	  
	  <!-- 数量展示 -->
	  <el-row class="panel-group" :gutter="40">
	    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	      <div class="card-panel">
	        <div class="card-panel-icon-wrapper icon-money "  @click="link('/clustering/first-level/91')">
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
			<pie-chart2 ref="chart2"/>
			
	      </div>
	    </el-col>
		<el-col :xs="24" :sm="24" :lg="8" style="margin-left: 50px;">
		  <div class="chart-wrapper">
			<!-- <chart-lint ref='chart_line_one'></chart-lint> -->
			<column-chart2 ref='chart_line_one'></column-chart2>
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
	
<!-- 	<doc-detail
	:docDetailVisible="remarkFormVisible"
	:detail="currentDetail"
	@close="remarkFormVisible = false">
	</doc-detail> -->
	
	<second-level-detail-dialog
	  :visible="remarkFormVisible"
	  :detail="currentDetail"
	  @close="remarkFormVisible = false">
	</second-level-detail-dialog>
  </div>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'	
import UploadDialog from '@components/upload-dialog.vue'
import reversedWords from '@components/reversed-words'
import PieChart2 from '@components/pie-chart2.vue'
import ClassifyKeyWordsDialog from '@components/classify-keywords-dialog.vue'
import chartLint from '@components/chartLint.vue'
import columnChart2 from '@components/columnChart2.vue'
// import docDetail from '@components/doc-detail.vue'
import SecondLevelDetailDialog from '../components/second-level-detail-dialog.vue'


export default {
  name: 'Dashboard2',
  mounted() {
	// this.chartDispaly()
  	this.$refs.chart2.initData(this.name,this.data)
	const {name,xData,yData} = this
    console.log(this.$refs)
    this.$refs.chart_line_one.initChart(name,xData,yData)
  },
  data () {
    return {
	  id:1,
	  nums:{
		oneCategory:1,
		twoCategory:2,
	    commentNums:3,
		allDocNums:4
	  },
	 //  cities: [{
		// value: 'Beijing',
		// label: '北京'
		// }, {
		// value: 'Shanghai',
		// label: '上海'
	 //  }],
	  tableData: [
		  {"id":1,"title":"关于组织实施2020年互联网大数据类企业转型升级计划的通知","categoryOne":"工信厅","categoryTwo":"科技厅","comment":null},{"id":2,"title":"关于组织开展2020年度首批省星级上云企业认定工作的通知","categoryOne":"工信厅","categoryTwo":"申报,企业,材料,发展,云","comment":null},{"id":3,"title":"关于组织开展千企升级企业入库和2020年度省级专精特新小巨人企业申报推荐以及2017年度省级专精特新小巨人企业申报复核工作的通知","categoryOne":"工信厅","categoryTwo":"申报,企业,材料,发展,云","comment":null},{"id":4,"title":"关于组织开展推荐申报第二批国家专精特新“小巨人”企业的通知","categoryOne":"工信厅","categoryTwo":"申报,企业,材料,发展,云","comment":null},{"id":5,"title":"关于组织申报2020年江苏省小型微型企业创业创新示范基地的通知","categoryOne":"工信厅","categoryTwo":"申报,企业,材料,发展,云","comment":null}
		  ],
      uploadDialogVisible: false,
	  reversedWordsVisibke:false,
	  keyWordsVisible:false,
	  name:'备注记录数量',
	  data:[{"sid":91,"name":"企业 工业 互联网","value":16},
	  {"sid":92,"name":"科技 创新 技术","value":15},
	  {"sid":93,"name":"资金 补助 财政","value":13},
	  {"sid":94,"name":"其他","value":3},
	  // {"sid":94,"name":"财政厅/科技厅","value":1},
	  // {"sid":95,"name":"财政厅/农业厅","value":1},
	  // {"sid":96,"name":"财政厅/发改委","value":2},
	  // {"sid":97,"name":"财政厅/农业厅","value":1},
	  ],
	  xData: ['0','2021-02', '2021-03', '2021-04', '2021-05'],
	  yData: [0,10, 20, 15, 9],
	  yData: [{value:0,id:[]},
	  {value:3,id:[1,2,3]},
	  {value:5,id:[4,5,6,7,8]},
	  {value:6,id:[9,10,11,12,13,14]},
	  {value:9,id:[15,16,17,18,19,12,1,2,3,4,5]}],
	  remarkFormVisible:false,
	  currentDetail: null
    }
  },
  components: {
    UploadDialog,
	reversedWords,
	PieChart2,
	ClassifyKeyWordsDialog,
	chartLint,
	columnChart2,
	// docDetail,
	SecondLevelDetailDialog
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
	// chartDispaly(){
	// 	clusteringAPI.adminChartDisplay().then(res => {
	// 		this.data=res
	// 	}).catch(err => {
	// 		console.log(err)
	// 	})
	// },
	// getRemarkedDocs() {
	//   clusteringAPI.findRemarkedDocs().then(res => {
	    
	// 	this.tableData = res
	//   }).catch(err => {
	//     console.log(err)
	//   })
	// },
	detail(val){
		this.remarkFormVisible=true
		this.currentDetail=val
	}	
	
  },
  created () {
	this.id=1
    this.statistics(this.id)
	// this.getRemarkedDocs()
	// this.chartDispaly()
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
