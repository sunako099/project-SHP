import Vue from 'vue'
import App from './App.vue'
//注册三级联动组件为全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

import { reqCategoryList } from '@/api/index'
reqCategoryList();

new Vue({
  render: h => h(App),
  //注册路由,组件身上都会有$route,$router
  router,
  //注册仓库，组件身上都会有$store
  store
}).$mount('#app')
