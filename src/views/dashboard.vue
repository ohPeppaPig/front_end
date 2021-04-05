<template>
  <div class="dashboard-wrap">
    <div class="current">
      <div class="title">当前项目</div>
      <div class="content">
        <div class="left">
          <div class="top">
            <span>文档总数: 1000</span>
            <span>一级分类数目: 1000</span>
            <span>二级分类数目: 1000</span>
          </div>
          <div class="bottom"></div>
        </div>
        <div class="right">
          <el-button @click="upload">上传文档</el-button>
          <el-button @click="customWords">自定义常用词</el-button>
        </div>
      </div>
    </div>
    <div class="history">
      <div class="title">历史项目</div>
      <div class="content">
        <el-link type="primary" @click="link('/clustering/first-level')">思目数据分析</el-link>
        <el-link type="primary" @click="link('/clustering/first-level')">政府文档分析</el-link>
      </div>
    </div>
    <upload-dialog
      :visible="uploadDialogVisible"
      @close="uploadDialogVisible = false">
    </upload-dialog>
  </div>
</template>

<script>
import UploadDialog from '@components/upload-dialog.vue'
export default {
  name: 'Dashboard',
  data () {
    return {
      uploadDialogVisible: false
    }
  },
  components: {
    UploadDialog
  },
  methods: {
    upload () {
      this.uploadDialogVisible = true
    },
    customWords () {
    },
    link (path) {
      this.$router.push(path)
    }
  },
}
</script>

<style lang="scss" scoped>
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
</style>
