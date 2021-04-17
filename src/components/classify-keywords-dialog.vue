<template>
  <el-dialog
    title="系统提示"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="780px"
    class="classify-keywords-dialog"
	@opened="openMethods"
    @close="close"
	 append-to-body>
    <div>
     <div><i class="el-icon-info" style="font-size: medium;display: inline-block;">系统为您检测可能重要的相关关键字!</i></div>
	 <el-divider content-position="left">重要关键字</el-divider>
	 <div>
		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		<div style="margin: 15px 0;"></div>
		<!-- <el-checkbox-group v-model="checkedKeyWords" > -->
			<el-checkbox v-for="keyWord in keyWords" v-model="checked" :label="keyWord" :key="keyWord">{{keyWord}}</el-checkbox>
	    <!-- </el-checkbox-group> -->
	 </div>
	 <div style="margin: 40px 0;"></div>
	 <el-divider content-position="left">其他关键字</el-divider>
	 <!-- <el-checkbox-group v-model="checkedKeyWords" > -->
	 	<el-checkbox v-for="otherWord in otherWords" :label="otherWord" :key="otherWord">{{otherWord}}</el-checkbox>
	 <!-- </el-checkbox-group> -->
    </div>
	<div style="margin: 50px 0;"></div>
	<el-divider content-position="left">自定义关键字</el-divider>
	 <el-input placeholder="请输入自定义关键字,多个请用逗号隔开" size="medium" v-model="input1">
	    <template slot="prepend">关键字</template>
	 </el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="link">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'
// import {EventBus} from '../utils/bus.js'



export default {
  name: 'keywords',
  props: ['visible',"projectId"],
  data () {
    return {
		a:100,
		keyWords:["衣食住行","成长伙伴","产学研教","超级账号","物资库","盟客网","产品会议","智慧城市"],
		otherWords:["旅游申请","会议纪要","思目论坛","需求更新","资金","招聘","保修","交易"],
		customize:"",
		checkAll: false,
		// checkedKeyWords: ["旅游申请","会议纪要"],
		isIndeterminate: true,
		checked:true,
		input1:""
		
    }
  },
  // watch: {
  //   visible: {
  //     immediate: true,
  //     handler () {
		//   this.$nextTick(function(){
		//   	 this.findKeyWords(this.projectId)
		//   });
        
  //     }
  //   }
  // },
  methods: {
	openMethods(){
		this.findKeyWords(this.projectId)
	},
    close () {
      this.$emit('close')
    },
	handleCheckAllChange(val) {
	        this.keyWords = checkedKeyWords ? cityOptions : [];
	        this.isIndeterminate = false;
	},
	handleCheckedCitiesChange(value) {
		let checkedCount = value.length;
		this.checkAll = checkedCount === this.cities.length;
		this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	},
	findKeyWords(id){
		  clusteringAPI.findKeyWords(id).then(res => {
			 
			this.keyWords=res.keyWords
			this.otherWords=res.otherWords
		  }).catch(err => {
			console.log(err)
		  })
	},
	link () {
	  // EventBus.$emit('msg',this.projectId)
	  
	  this.$router.push({
		  name:'Clustering',
		  params: { id: this.projectId }
	  })
	}
  }
}
</script>

<style lang="scss" scoped>
.second-level-detail-dialog {
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
  .upload-demo {
    /deep/ .el-upload {
      display: block;
    }
    /deep/ .el-upload-dragger {
      margin: 0 auto;
    }
  }
}
</style>

