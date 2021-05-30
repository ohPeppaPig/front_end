<template>
  <el-dialog
    title="上传待分析项目集"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    class="second-level-detail-dialog"
    @close="close">
    <div style="margin-top: 30px;">
      <el-form ref="form" label-width="100px">
        <el-form-item label="项目名称">
          <el-input placeholder="请输入项目名称" v-model="name"></el-input>
        </el-form-item>
      </el-form>
	  
	  <el-form ref="form" label-width="100px">
	    <el-form-item label="备注信息">
	      <el-input placeholder="请输入备注信息" v-model="remark"></el-input>
	    </el-form-item>
	  </el-form>
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8080/docs/uploadFolder"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
	  
	  <uploader-btn :directory="true" style="margin: 0 10px;">
	      <template slot-scope="scope">
	        <el-tag type="info" size="mini">选择文件夹</el-tag>
	      </template>
	  </uploader-btn>
	  
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
	
	
	<classify-key-words-dialog
	:visible="keyWordsVisible"
	:projectId="id"
	@close="keyWordsVisible = false">
	</classify-key-words-dialog>
  </el-dialog>
  
 
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'
import ClassifyKeyWordsDialog from './classify-keywords-dialog.vue'

export default {
  name: 'UploadDialog',
  props: ['visible'],
  components:{
	  ClassifyKeyWordsDialog
  },
  data () {
    return {
		name:"",
		remark:"",
		keyWordsVisible:false,
		id:0
    }
  },
  watch: {
  },
  methods: {
    close () {
      this.$emit('close')
    },
	submit(){
		this.keyWordsVisible=true,
		this.id=0
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
