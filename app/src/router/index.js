//路由配置引入
import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

//重写push和replace
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    routes:[
        {
            path:"/home",
            component:Home, 
            meta:{show:true}
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false}
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false}
        },
        {
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true},
            name:"search"
        },
        {
            path:"/detail/:skuid",
            component:Detail, 
            meta:{show:true}
        },
        {
            path:"/addCartSuccess",
            component:AddCartSuccess, 
            name:'addCartSuccess',
            meta:{show:true}
        },
        {
            path:"/shopcart",
            component:ShopCart, 
            meta:{show:true}
        },
        //重定向
        {
            path:'*',
            redirect:"/home"
        }
    ],
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        return {y:0}
    }
})