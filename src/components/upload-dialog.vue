<template>
  <el-dialog
    title="数据详情"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
    class="second-level-detail-dialog"
    @close="close">
    <div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input placeholder="请输入项目名称"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'

export default {
  name: 'UploadDialog',
  props: ['visible'],
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    close () {
      this.$emit('close')
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
