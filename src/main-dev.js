import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入全局样式
import './assets/css/global.css'

// 插件
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器

import VueQuillEditor from 'vue-quill-editor'

// 导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

//导入进度条插件
import NProgress from 'nprogress'
//导入进度条样式
import 'nprogress/nprogress.css'

// src/main.js
import axios from 'axios'
// 设置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加拦截器 让登录后的请求带上 令牌  让

//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use((config) => {
	//当进入request拦截器，表示发送了请求，我们就开启进度条
	NProgress.start()
	//为请求头对象，添加token验证的Authorization字段
	config.headers.Authorization = window.sessionStorage.getItem('token')
	//必须返回config
	return config
})
//在response拦截器中，隐藏进度条
axios.interceptors.response.use((config) => {
	//当进入response拦截器，表示请求已经结束，我们就结束进度条
	NProgress.done()
	return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

//创建过滤器将秒数过滤为年月日，时分秒
Vue.filter('dateFormat', function(originVal) {
	const dt = new Date(originVal)
	const y = dt.getFullYear()
	const m = (dt.getMonth() + 1 + '').padStart(2, '0')
	const d = (dt.getDate() + '').padStart(2, '0')

	const hh = (dt.getHours() + '').padStart(2, '0')
	const mm = (dt.getMinutes() + '').padStart(2, '0')
	const ss = (dt.getSeconds() + '').padStart(2, '0')

	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')
