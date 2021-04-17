import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@views/dashboard.vue'
import Clustering from '@views/clustering.vue'
import remark from '@views/remarked.vue'
import FirstLevelDetail from '@components/first-level-detail.vue'
import SecondLevelDetail from '@components/second-level-detail.vue'
import ClassifyKeyWordsDialog from '../components/classify-keywords-dialog.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
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
      path: '/clustering',
      name: 'Clustering',
      component: Clustering,
      children: [
        { path: '', redirect: 'first-level' },
        { path: 'first-level', component: FirstLevelDetail },
        { path: 'first-level/:id', component: FirstLevelDetail },
        { path: 'second-level/:id', component: SecondLevelDetail },
      ]
    },
  ]
})

export default router
