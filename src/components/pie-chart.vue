<template>
	<div id="myChart" :style="{width: '400px', height: '300px'}"></div>

</template>

<script>
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')


export default {
  created(){
  },
  // mounted(){
  //   this.initData(pieData);
  // },
  methods:{
    //初始化数据
    initData(name,pieData) {
		var that = this;
	 //  that.chart.on('click',function (param) {
		// that.$emit("clickPie", param.dataIndex);
	 //  })
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
		  backgroundColor: '#2c343c',
          title : {
              text: '文档数据分类展示图',//主标题
              // subtext: '纯属虚构',//副标题
              x:'center',//x轴方向对齐方式
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
		  // roseType: 'angle',
		  itemStyle: {
		      // 阴影的大小
		      shadowBlur: 200,
		      // 阴影水平方向上的偏移
		      shadowOffsetX: 0,
		      // 阴影垂直方向上的偏移
		      shadowOffsetY: 0,
		      // 阴影颜色
		      shadowColor: 'rgba(0, 0, 0, 0.5)',
			  emphasis: {
			          shadowBlur: 200,
			          shadowColor: 'rgba(0, 0, 0, 0.5)'
			      }
		  },
          legend: {
              orient: 'vertical',
              bottom: 'bottom',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
              {
                  name: name,
                  type: 'pie',
                  radius : '50%',
                  center: ['50%', '60%'], 
				  data:pieData,
                  // data:[
                  //     {value:335, name:'直接访问'},
                  //     {value:310, name:'邮件营销'},
                  //     {value:234, name:'联盟广告'},
                  //     {value:135, name:'视频广告'},
                  //     {value:1548, name:'搜索引擎'}
                  // ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      });
	  myChart.on('click', function (param) {
	          const id = param.data.sid;
			 that.$router.push({ path: `/clustering/first-level/${id}` })
	      });
	  window.addEventListener("resize", () => {
	        myChart.resize();
	  });
    },
  }
}
</script>

<style>
</style>
