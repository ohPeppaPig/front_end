<template>
  <el-container>
    <el-aside class="aside">
      <div class="logo">文档聚类平台</div>
      <el-menu background-color="#001628" text-color="#ffffff" active-text-color="#ffffa6" :router="true">
		<!-- <el-menu-item index="/dashboard">
          <i class="el-icon-suitcase"></i>
          <span>工作台</span>
        </el-menu-item> -->
		<el-menu-item index="/lable">
		  <i class="el-icon-suitcase"></i>
		  <span>首页</span>
		</el-menu-item>
        <el-menu-item index="/clustering">
          <i class="el-icon-folder-opened"></i>
          <span>文档分类管理</span>
        </el-menu-item>
		<el-menu-item index="/remarked">
		  <i class="el-icon-folder-opened"></i>
		  <span>文档批注</span>
		</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- <el-header class="header"></el-header> -->
      <el-main class="main" >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style lang="scss" scoped>
.aside {
  // height: 100vh;
  height: 970px;
  background:#001628;
  .logo {
    height: 60px;
    color: white;
    line-height: 60px;
    padding-left: 30px;
  }
  /deep/ .el-menu {
    border-right: none; 
  }
}
.header {
  height: 60px;
  color: white;
  line-height: 60px;
  border-bottom: 1px solid #eaeaea;
}
.main {
  padding: 10px;
}
</style>
