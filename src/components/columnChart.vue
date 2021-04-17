<template>
	<!-- <div id="columnChart" :style="{width: 400px, height: 400px}"></div> -->
	<div class="columnChart" id="columnChart" :style="{float:'left',width: '600px', height: '300px'}"></div>
	

</template>

<script>
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
	
	// 	mounted() {
	// 		this.buildData()
	// 	},
		methods:{
			initChart(name,xData,yData){
				let column = echarts.init(document.getElementById('columnChart'))
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
				// column.setOptions({
				// 	title:{text:'数据'},
				// 	xAxis: {
				// 	        type: 'category',
				// 	        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				// 			data:xdata
				// 	    },
				// 	    yAxis: {
				// 	        type: 'value'
				// 	    },
				// 	    series: [{
				// 			data:ydata,
				// 	        // data: [120, 200, 150, 80, 70, 110, 130],
				// 	        type: 'bar'
				// 	}]
				// })
				// getchart.setOption(option);
				  //随着屏幕大小调节图表
				  window.addEventListener("resize", () => {
				    getchart.resize();
				});
			}
		}
		
	}
</script>

<style>
</style>
