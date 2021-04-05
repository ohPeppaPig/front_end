<template>
  <div class="first-level-detail-wrap">
    <div class="header">
      <div class="document-name">一级分类名称：{{}}</div>
      <div class="param-wrap">
        <div>动态调整聚类：</div>
        <el-slider
          v-model="sliderParam"
          :format-tooltip="formatTooltip"
          @change="handleSliderChange">
        </el-slider>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="secondLevelData"
        style="width: 100%">
        <el-table-column
          label="二级分类簇名称"
          width="200">
          <template slot-scope="scope">
            <div>{{ scope.row.categoryTwo.sname }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="分类簇描述信息">
        </el-table-column>
      </el-table>
    </div>
    <div class="footer" v-if="showDiff">
      <div>文档簇diff</div>
      <div>
        调整前：
        <div class="content">
          <div>文档簇名称：</div><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
          <div>文档簇描述：</div><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
        </div>
      </div>
      <div>
        调整后：
        <div class="content">
          <div>文档簇名称：</div><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
          <div>文档簇描述：</div><!--TODO 取对应参数，模板绑定 {{ a.b }}-->
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
      secondLevelData: [],
      diffData: {},
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
      }).catch(err => {
        console.log(err)
      })
    },
    adjustFirstLevelCluster (val) {
      const id = this.$route.params.id;
      clusteringAPI.adjustFirstLevelCluster(id, val).then(res => {
        // TODO 重新赋值二级分类簇表格信息，复制diff信息
        this.showDiff = true
      }).catch(err => {
        console.log(err)
      })
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
