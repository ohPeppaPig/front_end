<template>
  <el-dialog
    title="数据详情"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="1000px"
    class="second-level-detail-dialog"
    @close="close">
    <div>
      <p>id: {{ documentDetail.id }}</p>
	  <el-divider></el-divider>
      <p>title: {{ documentDetail.title }}</p>
	  <el-divider></el-divider>
      <p>keySentences: {{ documentDetail.keySentence }}</p>
	  <p>content:{{documentDetail.content}}</p>
	  
		
      <!-- <h4>相似文档集</h4> -->
	  <el-divider content-position="left">相似文档集</el-divider>
		
      <el-table
        :data="documentDetail.similaryDocs"
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
<!--        <el-table-column
          prop="keySentences"
          label="keySentences">
        </el-table-column> -->
        <el-table-column
          prop="categoryOneName"
          label="一级分类">
        </el-table-column>
        <el-table-column
          prop="categorytwoName"
          label="二级分类">
        </el-table-column>
      </el-table>
	  <el-divider content-position="left">用户评论</el-divider>
	  <!-- todo 增加评论功能--> 
	  
	  
    </div>
	<doc-detail
	:docDetailVisible="docDetailVisible"
	:detail="nextDetail"
	@close="docDetailVisible = false">
	</doc-detail>
  </el-dialog>
  

  
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'
import docDetail from './doc-detail.vue'
export default {
  name: 'SecondLevelDetailDialog',
  props: ['visible', 'detail'],
  components:{
	  docDetail
  },
  data () {
    return {
	  documentDetail:{"id":13291337,
	  "title":"餐饮服务评价",
	  "content":"商家可以在对应服务中查看已有评价平台,菜品的评论只显示在服务发起所在事务的模板上",
	  "keySentence":"",
	  "similaryDocs":[
		  {"id":13161412,
		  "title":"【服务】服务功能升级V2.0",
		  "keySentences":"涵盖服务对象、服务时间、服务方式、服务内容等,服务相关视觉蓝湖地址",
		  "categoryOneName":"超级账号",
		  "categorytwoName":"服务,申请,管理,角色,升级"},
		  {"id":13340715,
		  "title":"服务迭代：新增分享和设为星标",
		  "keySentences":"移动端发起服务界面,点击提示使用移动端"
		  ,"categoryOneName":"超级账号",
		  "categorytwoName":"服务,申请,管理,角色,升级"},
		  ],
	  },
	  visible:false,
	  docDetailVisible:false,
	  nextDetail:null
	  
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
    close () {
      this.$emit('close')
    },
    getDocumentDetail (id) {
      clusteringAPI.getDocumentDetail(id).then(res => {
        this.documentDetail = res
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
.second-level-detail-dialog {
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
}
</style>
