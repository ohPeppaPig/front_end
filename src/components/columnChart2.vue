<template>
	<!-- <div id="columnChart" :style="{width: 400px, height: 400px}"></div> -->
	<div>
		<div class="columnChart" id="columnChart2" :style="{float:'left',width: '600px', height: '300px'}"></div>
		<remark-form-dialog
		:visible="visible"
		:ids="ids"
		@close="visible = false"></remark-form-dialog>
	</div>

</template>

<script>
	import remarkFormDialog from "./remark-form-dialog.vue"
	let echarts = require('echarts/lib/echarts')
	// 引入饼状图组件
	require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	// import echarts from 'echarts'
	// import Vue from 'vue'
	// Vue.prototype.$echarts = echarts
	export default {
		data(){
			return {
				visible:false,
				ids:[]
			}
		},
	// 	mounted() {
	// 		this.buildData()
	// 	},
		components:{
			remarkFormDialog
		},
		methods:{
			initChart(name,xData,yData){
				var that = this;
				let column = echarts.init(document.getElementById('columnChart2'))
				var  option = {
				        backgroundColor: '#66CCFF',
				        tooltip: {
				            trigger: 'axis'
				        },
				        legend: {
				            data: [name],
				            bottom:'0%'
				        },
				        grid: { //调整图表上下左右位置
				            top:'10%',
				            left: '3%',
				            right: '8%',
				            bottom: '11%',
				            containLabel: true
				        },
				       
				        xAxis: {
				            type: 'category',
				            boundaryGap: false,
				            data: xData
				        },
				        yAxis: {
				            type: 'value'
				        },
				        series: [
				            {
								barWidth:30,
				                name: name,
				                type: 'bar',
				                stack: '总量',
				                data: yData
				            },
				        ]
				    };
				
				column.setOption(option);
				column.on('click', function(params) {
				    console.log(params);
					console.log(params.data.id)
					// this.visible = true
					// this.ids = params.data.id
					that.visible = true
					that.ids = params.data.id
					// that.$router.push({ path: `/remarked` })
				})
				  window.addEventListener("resize", () => {
				    column.resize();
				});
			}
		}
		
	}
</script>

<style>
</style>
