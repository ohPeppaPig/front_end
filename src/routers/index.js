import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@views/dashboard.vue'
import Dashboard2 from '@views/dashboard2.vue'
import Clustering from '@views/clustering.vue'
import remark from '@views/remarked.vue'
import FirstLevelDetail from '@components/first-level-detail.vue'
import SecondLevelDetail from '@components/second-level-detail.vue'
import ClassifyKeyWordsDialog from '../components/classify-keywords-dialog.vue'
import meum from "../components/meum-select-dialog.vue"
import index from '../views/index.vue'
import indexContent from '../components/index-content.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
	{
		path:'/lable',
		name:'Lable',
		component:index
		// children:[
		// 	{ path: '', redirect: 'indexContent' },
		// 	{ path: 'indexContent', component: indexContent },
		// 	// {  path: 'dashboard',component: Dashboard}
		// ]
	},
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
	{
	  path: '/dashboard2',
	  name: 'Dashboard2',
	  component: Dashboard2
	},
	{
		path:'/remarked',
		name:'remark',
		component:remark
	},
	{
		path:'/KeyWords',
		name:'KeyWords',
		component:ClassifyKeyWordsDialog
	},
	{
		path:'/meum',
		name:'meum',
		component:meum
	},
    {
      path: '/clustering',
      name: 'Clustering',
      component: Clustering,
      children: [
        { path: '', redirect: 'first-level' },
        { path: 'first-level', component: FirstLevelDetail },
        { path: 'first-level/:id', component: FirstLevelDetail },
        { path: 'second-level/:id', component: SecondLevelDetail},
      ]
    },
  ]
})

export default router
