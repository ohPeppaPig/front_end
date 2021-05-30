## 业务文档辅助归档在线工具--前端代码实现

#### 使用框架及工具包

- Vue.js + ElementUI + Axios (封装了Ajax的网络服务包)+ Router（vue.js 的路由工具包）
- Echart（图表可视化）
- npm (包管理工具)



#### 配置步骤

1. 安装npm 
   - 配置参考博客：https://www.cnblogs.com/lgx5/p/10732016.html
   - npm -v 指令 查看是否安装成功
2. 安装Vue.js + ElementUI + Axios+Router+Echart
   - npm install + 相关组件
   - 也可不安装，前端代码配置了相应的json
3. 安装完毕后：
   1. 从Github上拉去代码
   2. npm install
   3. npm start 即可启动

ps : ElementUI组件过低时，会导致标签页的组件无法引入（程序已解决）



#### 代码包结构

src

- components ： 可视化组件 html
- imgs ：放置图片
- routers ：配置路由相关
- services：服务接口
  - cluster.js ：对外提供的服务接口
  - instance.js ：封装Axios组件
- view ：主视图
- App.vue : 主启动类
- main.js : 项目的入口文件

package.json : 包管理 （类似maven中的pom.xml）

vue.config.js :vue相关配置



