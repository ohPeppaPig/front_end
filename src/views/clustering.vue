<template>
  <el-container class="clustering-wrap">
    <el-aside class="document-tree">
      <el-card style="padding-left: 50px;">
		<el-input
		  placeholder="输入关键字进行过滤"
		  style="width: auto;height: auto;margin-bottom: 10px;"
		  v-model="filterText">
		</el-input>
        <el-tree
          :data="treeData"
		  show-checkbox
		  node-key="id"
		  draggable
		  accordion
          :expand-on-click-node="false"
          :props="{children: 'categoryTwo', label: 'sname'}"
          @node-click="handleNodeClick"
		  :filter-node-method="filterNode"
		  ref="tree"
		  >
		  <span class="custom-tree-node" slot-scope="{ node, data }">
			  <span>{{ node.label }}</span>
			  <span class="inside" style="display: ;">
			  <!--  <el-button
				  type="text"
				  size="mini"
				  @click="() => open(data)">
				  修改
				</el-button> -->
				<i class="el-icon-plus" @click="() => append(data)" style="padding-right:5px ;"></i>
				<i class="el-icon-edit" @click="() => open(data)" style="padding-right:5px ;"></i>
				<i class="el-icon-delete" @click="() => remove(node,data)"></i>
			  </span>
		   </span>
        </el-tree>
		<!-- <pie-chart ref="chart" style="padding-right: 80px;"/> -->
      </el-card>
	  
    </el-aside>
    <el-main class="content-wrap">
      <el-card>
        <router-view></router-view>
      </el-card>
    </el-main>
  </el-container>  
</template>

<script>
import * as clusteringAPI from '@services/clustering.js'
import PieChart from '@components/pie-chart.vue'

// import {EventBus} from '../utils/bus.js'

export default {
  name: 'Clustering',
   watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
	components:{
		PieChart
	},
  data () {
    return {
	  filterText: '',
      treeData: [
        {
		  sid: 1,
          sname: '一级 1',
          pid:0,
          categoryTwo: [{
			sid: 1,  
            sname: '二级 1-1',
			pid:1
          }]
        },    
        {
		  sid:2,
          sname: '二级 1',
		  pid:0,
          categoryTwo: [{
			sid:1,
            sname: '二级 2-1',
			pid:1
          }]
        }
      ],
	  id:0,
	  IsShow:0,
	  data:[{"sid":6,"name":"产学研教","value":56},{"sid":7,"name":"成长伙伴","value":15},{"sid":8,"name":"物资库","value":72},{"sid":9,"name":"产品会议","value":96},{"sid":10,"name":"盟客网","value":23},{"sid":11,"name":"智慧城市","value":23},{"sid":12,"name":"超级账号","value":228},{"sid":13,"name":"思目论坛","value":5},{"sid":14,"name":"需求记录清单","value":45},{"sid":15,"name":"培训相关","value":9},{"sid":16,"name":"盟客币","value":77},{"sid":17,"name":"旅游申请","value":7},{"sid":18,"name":"衣食住行","value":238}],
	  name:"分类名称"
    }
  },
  mounted() {
	this.getTree()
	this.chartDispaly()
	// this.$refs.chart.initData(this.name,this.data)
  },
  methods: {
	filterNode(value, data) {
		if (!value) return true;
		return data.sname.indexOf(value) !== -1;
	},
	chartDispaly(){
		var i = 0
		if(this.$route.params.id > 88){
			i = 1
			
		}
		clusteringAPI.adminChartDisplay(i).then(res => {
			this.data=res
			this.$refs.chart.initData(this.name,this.data)
		}).catch(err => {
			console.log(err)
		})
	},
	append(data) {
		const newChild = { sid: -1, sname: '未定义',pid:0, categoryTwo: [] };
		if (!data.categoryTwo) {
		  this.$set(data, 'categoryTwo', []);
		}
		data.categoryTwo.push(newChild);
	},
	remove(node, data) {
		this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
				  const parent = node.parent;
				  const children = parent.data.categoryTwo || parent.data;
				  const index = children.findIndex(d => d.sid === data.sid);
				  children.splice(index, 1);
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		
	  },
	open(data) {
	        this.$prompt('请输入新的分类名称').then(({ value }) => {
	          
			console.warn(data)
			console.warn(value)
			data.sname = value
			if(data.sid === -1){
				return
			}
			clusteringAPI.updateTitleName(data.sid,value).then(res => {
			  this.$router.go(0);

			  this.$message({
			    type: 'success',
				message:'修改成功'
			  });
			})

	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '取消输入'
	          });       
	        });
	 },
    handleNodeClick (val) {
      const id = val && val.sid;
      if (val.categoryTwo) { // 点击一级标题
        this.$router.push({ path: `/clustering/first-level/${id}` })
      } else { // 点击二级标题
        this.$router.push({ path: `/clustering/second-level/${id}` })
      }
    },
    getTree () {
	  console.warn("id参数为："+this.$route.params.id)
	  if(this.$route.params.id){
		  this.id = this.$route.params.id
	  }else{
		  this.id = 0
	  }
	  if(this.id>1){
		  if(this.id>88){
			  this.id = 1
		  }else{
			  this.id=0
		  }
	  }
	  console.warn(this.id); // 这里是undefined
      clusteringAPI.getTree(this.id).then(res => {
        // TODO 接口返回可能格式跟预想不一样
        // this.treeData = res || [];
		this.treeData = res
        // const defaultId = this.treeData[0] && this.treeData[0].sid;
		const defaultId = this.treeData[0].sid;
        this.$router.push({ path: `/clustering/first-level/${defaultId}` })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
	// EventBus.$on('msg', (val) => {
	//         this.id = val
	//     });
	
    this.getTree()
  }

}
</script>

<style lang="scss" scoped>
	
.chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
}
.clustering-wrap {
  main {
    padding: 0;
  }
  .document-tree {
    width: unset !important;
    .el-card {
      width: 420px;
      min-height: calc(100vh - 90px);
      margin-right: 10px;
    }
  }
  .content-wrap {
    .el-card {
      min-height: calc(100vh - 90px);
    }
  }
}
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
	
  }
  .custom-tree-node:hover{
	  background: #EAEFFF;
	  .inside{
	  	  display:inline
	  }	
  }
  .inside{
	  display:none;
  }
  // .inside:hover{
	 //  background: #EAEFFF;
	 //  .inside{
	 //  	  display:inline
	 //  }		
  // }
</style>
