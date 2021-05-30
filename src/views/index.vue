<template>
	<div>
		<!-- <div style="margin-bottom: 20px;">
		  <el-button
		    size="small"
		    @click="addTab(editableTabsValue)"
		  >
		    add tab
		  </el-button>
		</div> -->
		<div>
			<h2>工作台</h2>
		</div>

		
		<el-tabs v-model="editableTabsValue" type="card"  @tab-remove="removeTab">
		  <el-tab-pane
		    v-for="(item, index) in editableTabs"
		    :key="item.name"
		    :label="item.title"
		    :name="item.name"
			:closable="item.close"
		  >
			<tab-component :is="item.content"></tab-component>
		  </el-tab-pane>
		</el-tabs>
		
		<el-card v-if="this.editableTabsValue == '1'">
			<div>
				<el-button  @click="add(0)">思目数据分析</el-button>
				<el-button  @click="add(1)">政府数据分析</el-button>
			</div>
		</el-card>
		
		<!-- <el-main class="content-wrap">
		  <el-card>
		    <router-view></router-view>
		  </el-card>
		</el-main> -->
	</div>
	
</template>

<script>
	import Dashboard from "./dashboard.vue"
	import Dashboard2 from "./dashboard2.vue"
	import indexContent from "../components/index-content.vue"

	export default {
		components:{
			Dashboard,
			Dashboard2,
			indexContent
		},
	    data() {
	      return {
			display:false,
	        editableTabsValue: '1',
	        // editableTabs: [{
	        //   title: 'Tab 1',
	        //   name: '1',
	        //   content: 'Tab 1 content'
	        // }, {
	        //   title: 'Tab 2',
	        //   name: '2',
	        //   content: 'Tab 2 content'
	        // }],
			editableTabs: [
				{
				    title: '首页',
				    name: '1',
				    content: 'indexContent',
					
				},
				{
			    title: '思目数据分析',
			    name: '2',
			    content: 'Dashboard',
				close:'closable'
				},
				{
				title: '政府数据分析',
				name: '3',
				content: 'Dashboard2',
				close:'closable'
				}
			],
	        tabIndex: 2
	      }
	    },
	    methods: {
		  add(id){
			if(id === 0){
				let newTabName = ++this.tabIndex + '';
				this.editableTabs.push({
				  title: '思目数据分析',
				  name: newTabName,
				  content: 'Dashboard',
				  close:'closable'
				});
				this.editableTabsValue = newTabName;
			}else{
				let newTabName = ++this.tabIndex + '';
				this.editableTabs.push({
				  title: '政府数据分析',
				  name: newTabName,
				  content: 'Dashboard2',
				  close:'closable'
				});
				this.editableTabsValue = newTabName;
			}
			
		  },
	      addTab(targetName) {
	        let newTabName = ++this.tabIndex + '';
	        this.editableTabs.push({
	          title: 'New Tab',
	          name: newTabName,
	          content: 'indexContent'
	        });
	        this.editableTabsValue = newTabName;
	      },
	      removeTab(targetName) {
	        let tabs = this.editableTabs;
	        let activeName = this.editableTabsValue;
	        if (activeName === targetName) {
	          tabs.forEach((tab, index) => {
	            if (tab.name === targetName) {
	              let nextTab = tabs[index + 1] || tabs[index - 1];
	              if (nextTab) {
	                activeName = nextTab.name;
	              }
	            }
	          });
	        }
	        
	        this.editableTabsValue = activeName;
	        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
	      }
	    }
	  }
</script>
<style>
</style>
