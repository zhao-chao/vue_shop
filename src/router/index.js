import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'

import Home from '../components/Home.vue'

import Welcome from '../components/Welcome.vue'

import Users from '../components/user/Users.vue'

import Rights from '../components/power/Rights.vue'

import Roles from '../components/power/Roles.vue'

import Cate from '../components/goods/Cate.vue'

import Params from '../components/goods/Params.vue'

import List from '../components/goods/List.vue'

import Add from '../components/goods/Add.vue'

import Order from '../components/order/Order.vue'

import Report from '../components/report/Report.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/login' },
		{ path: '/login', component: Login, name: '登录' },
		{
			name: '主页',
			path: '/home',
			component: Home,
			redirect: '/welcome',
			children: [
				{ name: '欢迎', path: '/welcome', component: Welcome },
				{ path: '/users', component: Users, name: '欢迎欢迎' },
				{ path: '/rights', component: Rights, name: '权限列表' },
				{ path: '/roles', component: Roles, name: ' 角色列表' },
				{ path: '/categories', component: Cate, name: ' 商品分类' },
				{ path: '/params', component: Params, name: ' 分类参数' },
				{ path: '/goods', component: List, name: ' 商品列表' },
				{ path: '/goods/add', component: Add, name: ' 分类参数' },
				{ path: '/orders', component: Order, name: ' 订单列表' },
				{ path: '/reports', component: Report, name: ' 数据分析' },
			],
		},
	],
})

// 挂载路由导航守卫，to 表示将要访问的路径，from 表示从哪里来，next 是下一个要做的操作
router.beforeEach((to, from, next) => {
	document.title = to.name
	// 直接放行
	if (to.path === '/login') return next()
	// 获取 token
	const tokenStr = window.sessionStorage.getItem('token')
	// token 不存在，跳转登录界面
	if (!tokenStr) return next('/login')
	// token 存在，放行
	next()
})
export default router
