<template>
  <el-dialog
    title="数据详情"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="800px"
    class="second-level-detail-dialog"
	append-to-body
    @close="close">
	
	<el-card class="box-card">
	  <div slot="header" class="clearfix">
	    <span style="color:coral;">{{ documentDetail.title }}</span>
	  </div>
	  <div class="text item">
		<span style="color: brown;">文档摘要：{{documentDetail.keySentence}}</span>
	    
	  </div>
	  <div class="text item" style="margin-top: 30px;">
	    <!-- <div>{{documentDetail.content}}</div> -->
		<pre v-show="isOpen">{{documentDetail.content}}</pre>
		
		<pre v-show="!isOpen">{{documentDetail.content.substring(0,300)}}</pre>
		<el-button  v-show="!isOpen" @click="isOpen = !isOpen" type="primary" round>展开全部信息</el-button>
		<el-button type="success" round v-show="isOpen" @click="isOpen = !isOpen">收起</el-button>
		
	  </div>
	</el-card>
	
	<el-card class="box-card" style="margin-top: 20px;">
	  <div slot="header" class="clearfix">
	    <span style="color: red;">相似文档集</span>
	  </div>
	  <el-table
		  :data="similaryDocs"
		stripe=true>
		<el-table-column
		  
		  label="id"
		  width="150">
		  <template slot-scope="scope">
			<div style="color:brown" @click="docDetail(scope.row)">{{ scope.row.id }}</div>
			<!-- <div>{{categoryTwo.name}}</div> -->
		  </template>
		</el-table-column>
		  <el-table-column
			prop="title"
			label="title">
		  </el-table-column>
		  <el-table-column
			prop="categoryOneName"
			label="一级分类">
		  </el-table-column>
		  <el-table-column
			prop="categorytwoName"
			label="二级分类">
		  </el-table-column>
		</el-table>
	</el-card>
	
	<el-card class="box-card" style="margin-top: 20px;">
	  <div slot="header" class="clearfix">
	    <span style="color: red;">相似分类簇</span>
	  </div>
	  <el-table
		  :data="similaryTitle"
		stripe=true>
		
		  <el-table-column
			prop="titleOne"
			label="一级分类">
		  </el-table-column>
		  <el-table-column
			prop="titleTwo"
			label="二级分类">
		  </el-table-column>
		</el-table>
	</el-card>
	

	  <el-divider content-position="left">用户评论</el-divider>
	  <!-- todo 增加评论功能--> 
	  <comment></comment>
	  
  </el-dialog>
  

  
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'

import comment from './comment.vue'
export default {
  name: 'SecondLevelDetailDialog',
  props: ['visible', 'detail'],
  components:{
	  
	  comment
  },
  data () {
    return {
	  documentDetail:{"id":13291337,
	  "title":"衣食住行-充值优惠v1.1",
	  "content":"1.背景：餐厅目前充值送盟客币采用的方案是循环满减：每满500元送50盟客币。2.功能：本版本新增循环满减的功能优化优惠方案的展示2.1功能名称：会员充值配置用户故事：商家配置会员充值优惠。功能详述：优先级：高平台：WEB。描述：两种充值方式，互斥：多级优惠，即现有的功能（本迭代新增）每满减，即每满多少现金就送多少盟客币。 2.2功能名称：使用充值优化充值活动的展示",
	  "keySentence":"目前充值送盟客币采用的方案是循环满减：每满500元送50盟客币",
	  
	  },
	  visible:false,
	  docDetailVisible:false,
	  nextDetail:null,
	  isOpen: false,
	  "similaryTitle":[
	  	{
	  		"titleOne":"物资库",
	  		"titleTwo":"物资，需求，库存，模板"
	  	},
	  	{
	  		"titleOne":"物资库",
	  		"titleTwo":"服务，物资，销售，生产"
	  	}
	  ],
	  "similaryDocs":[
	  		  {"id":13161412,
	  		  "title":"物资库、获取物资服务重构",
	  		  "categoryOneName":"物资库",
	  		  "categorytwoName":"服务，物资，销售，生产"},
	  		  {"id":13340715,
	  		  "title":"【物资供需迭代】物资采购服务、供给发布",
	  		  "categoryOneName":"物资库",
	  		  "categorytwoName":"服务，物资，销售，生产"},
	  ],
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (val && this.detail) {
          this.getDocumentDetail(this.detail.id)
		  this.nextDetail=this.detail
        }
      }
    }
  },
  methods: {
	// showLessText(){
		
	// }
    close () {
      this.$emit('close')
    },
    getDocumentDetail (id) {
      clusteringAPI.getDocumentDetail(id).then(res => {
        this.documentDetail = res
		this.documentDetail.content = this.documentDetail.content.replace(/↵/g,"\n");
      })
    },
	docDetail(val){
		this.visible = false
		this.docDetailVisible = true
		this.nextDetail = val
		this.close()
	}
  }
}
</script>

<style lang="scss" scoped>

.text {
font-size: 14px;
}

.item {
margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
display: table;
content: "";
}
.clearfix:after {
clear: both
}

.box-card {
width: 750px;
}

.second-level-detail-dialog {
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
}
</style>
