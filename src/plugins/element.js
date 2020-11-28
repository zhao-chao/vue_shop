import Vue from 'vue'
// import { Button } from 'element-ui'
// import { Form, FormItem } from 'element-ui'
// import { Input } from 'element-ui'
// // 导入弹框提示组件
// import { Message } from 'element-ui'

import {
	Message,
	Button,
	Form,
	FormItem,
	Input,
	Container,
	Header,
	Aside,
	Main,
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 主页的组件
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
// 弹出框组件 需要全局挂载
Vue.prototype.$message = Message
