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
	Menu,
	Submenu,
	MenuItem,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	Row,
	Col,
	Table,
	TableColumn,
	Switch,
	Tooltip,
	Pagination,
	Dialog,
	MessageBox,
	Tag,
	Tree,
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

// 左侧列表
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

// 面包屑
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)

// 栅格系统
Vue.use(Row)
Vue.use(Col)

// 表格
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
// 分页

Vue.use(Pagination)
// 对话框
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)

// 弹出框组件 需要全局挂载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
