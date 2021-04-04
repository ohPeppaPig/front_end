import Vue from 'vue'
import App from './App.vue'
import router from './routers';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;
Vue.use(ElementUI)

new Vue({
	router: router,
	render: h => h(App)
}).$mount('#app')

