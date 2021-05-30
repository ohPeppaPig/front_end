<template>  
	<div id="echart-line" :style="{float:'left',width: '400px', height: '400px'}"></div>	  
</template>

<script>
import remarkFormDialog from "./remark-form-dialog.vue"
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
// require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
	components:{
		remarkFormDialog
	},
	data () {
	  return {
	    visible: false,
		ids:[]
	  }
	},
    methods:{
	  

      initChart(name,xData,yData) {
       
         var myChart = echarts.init(document.getElementById('echart-line'));
    //       var  option = {
               
    //             tooltip: {
    //                 trigger: 'axis'
    //             },
    //             legend: {
    //                 data: [name],
    //                 bottom:'0%'
    //             },
    //             grid: { //调整图表上下左右位置
    //                 top:'10%',
    //                 left: '3%',
    //                 right: '8%',
    //                 bottom: '11%',
    //                 containLabel: true
    //             },
               
    //             xAxis: {
    //                 type: 'category',
    //                 boundaryGap: false,
    //                 data: xData
    //             },
    //             yAxis: {
    //                 type: 'value'
    //             },
    //             series: [
    //                 {
    //                     name: name,
    //                     type: 'line',
    //                     stack: '总量',
    //                     data: yData
    //                 },
    //             ]
    //         };
		  // getchart.setOption(option);
		  // myChart.on('click', function(params) {
		  //     //     const id = param.data.sid;
		  // 			 // that.$router.push({ path: `/clustering/first-level/${id}` })
		  // 	console.warn("123456")
		  // 	console.warn(params)
		  // 	this.ids=param.data.id;
		  // 	console.warn(this.ids)
		  // 	// this.visible = true
		  // });
		  myChart.setOptions({
               
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
                        name: name,
                        type: 'line',
                        stack: '总量',
                        data: yData
                    },
                ]
            });
			
		myChart.on('click', function(params) {
		    console.log(params); 
		})
		myChart.getZr().on('click', params => {
				 console.warn(123)
		          let pointInPixel = [params.offsetX, params.offsetY]
		          if (myChart.containPixel('grid', pointInPixel)) {
		            let xIndex = myChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]
		            console.log(xIndex)
		          }
		        })
			
        //   //随着屏幕大小调节图表
        //   window.addEventListener("resize", () => {
        //     getchart.resize();
        // });
      }

    }

}
</script>

