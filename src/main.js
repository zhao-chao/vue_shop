import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入全局样式
import './assets/css/global.css'

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

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')
