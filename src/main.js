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

// src/main.js
import axios from 'axios'
// 设置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加拦截器 让登录后的请求带上 令牌  让

//axios设置请求拦截器
axios.interceptors.request.use((config) => {
	config.headers.Authorization = window.sessionStorage.getItem('token') //设置响应头
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
