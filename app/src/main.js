import Vue from 'vue'
import App from './App.vue'
//注册三级联动组件为全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

//引入路由
// 在main.js注册路由，所有的路由和非路由组件身上都会拥有$router $route属性
// $router：一般进行编程式导航进行路由跳转
// $route： 一般获取路由信息（name path params等）
import router from '@/router';
//引入仓库
import store from '@/store';

// import { reqCategoryList } from '@/api/index'
// reqCategoryList();

import '@/mock/mockServe';

import "swiper/css/swiper.css";
//注册轮播图为全局组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name,Carousel);

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
  //注册路由,组件身上都会有$route,$router
  router,
  //注册仓库，组件身上都会有$store
  store
}).$mount('#app')
