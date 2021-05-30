<template>
  <div class="first-level-detail-wrap">
    <div class="header">
     <div class="document-name" style="color: deeppink;">二级分类簇列表</div>
      <div class="param-wrap">
        <div>动态调整聚类：</div>
        <el-slider
          v-model="sliderParam"
          :format-tooltip="formatTooltip"
          @change="handleSliderChange"
		  style="width: 100px;">
        </el-slider>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="secondLevelData"
		stripe="true"
        style="width: 100%">
        <el-table-column
		  prop="categoryTwo.name"
          label="二级分类簇名称"
          width="200">
          <template slot-scope="scope">
            <div style="color:brown" @click="detail(scope.row)">{{ scope.row.categoryTwo.sname }}</div>
			<!-- <div>{{categoryTwo.name}}</div> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="分类簇描述信息">
        </el-table-column>
		<!-- <el-table-column
		width="230">
		  <template slot-scope="scope">
		   <el-button
			size="mini"
			type="primary"
			@click="detail(scope.row)">查看</el-button>
		  </template>
		</el-table-column> -->
      </el-table>
    </div>
    <div class="footer" v-if="showDiff">
      <div>文档簇diff</div>
      <div>
        调整前：
        <div class="content">
          <!-- <div>文档簇名称：{{}}</div> --><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
          <!-- <div>文档簇描述：</div> --><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
		  <el-table
		    :data="diffPre"
			stripe=true
		    style="width: 100%">
		    <el-table-column
		  		  prop="categoryTwo.sname"
		      label="二级分类簇名称"
		      width="200">
		      <template slot-scope="scope">
		        <div>{{ scope.row.categoryTwo.sname }}</div>
		  			<!-- <div>{{categoryTwo.name}}</div> -->
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="description"
		      label="分类簇描述信息">
		    </el-table-column>
		  </el-table>
        </div>
      </div>
      <div>
        调整后：
        <div class="content">
         <!-- <div>文档簇名称：</div> --><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
          <!-- <div>文档簇描述：</div> --><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
		  <el-table
		    :data="diffAfter"
			stripe=true
		    style="width: 100%">
		    <el-table-column
		  		  prop="categoryTwo.sname"
		      label="二级分类簇名称"
		      width="200">
		      <template slot-scope="scope">
		        <div>{{ scope.row.categoryTwo.sname}}</div>
		  			<!-- <div>{{categoryTwo.name}}</div> -->
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="description"
		      label="分类簇描述信息">
		    </el-table-column>
		  </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'

export default {
  name: 'FirstLevelDetail',
  data () {
    return {
      sliderParam: 3,
      secondLevelData: [{categoryTwo:{"sid":19,"sname":"","pid":6},
	  description:""}
		],
      // diffData: {},
	  diffAfter:[
		  {categoryTwo: {sid: 0, sname: "", pid: 0},
		   description: ""
			}],
	  diffPre:[
	  		  {categoryTwo: {sid: 0, sname: "", pid: 0},
	  		   description: ""
	  			}],
      showDiff: false
    }
  },
  methods: {
    formatTooltip (val) {
      return `${val} / 100`
    },
    handleSliderChange (val) {
      this.adjustFirstLevelCluster(val)
    },
    getDetail (id) {
      clusteringAPI.getFirstLevelDetail(id).then(res => {
        // TODO 赋值二级分类簇表格信息
		this.secondLevelData = res
      }).catch(err => {
        console.log(err)
      })
    },
    adjustFirstLevelCluster (val) {
      const id = this.$route.params.id;
      clusteringAPI.adjustFirstLevelCluster(id, val).then(res => {
        // TODO 重新赋值二级分类簇表格信息，赋值diff信息
		this.secondLevelData = res.secondaryMenuVoList,
		this.diffPre = res.diffPre,
		this.diffAfter = res.diffAfter,
        this.showDiff = true
      }).catch(err => {
        console.log(err)
      })
    },
	detail(val){
		const id = val.categoryTwo.sid
		this.$router.push({ path: `/clustering/second-level/${id}` })
	}
  },
  created () {
    const id = this.$route.params.id;
    this.getDetail(id)
  }
}
</script>

<style lang="scss" scoped>
.first-level-detail-wrap {
  .header {
    display: flex;
    align-items: center;
    .document-name {
      width: 300px;
    }
    .param-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      .el-slider {
        flex: 1;
      }
    }
  }
  .main {
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    margin: 10px 0;
  }
  .footer {
    .content {
      display: flex;
      div {
        width: 50%;
      }
    }
  }
}
</style>
