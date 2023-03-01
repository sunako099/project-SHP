//路由配置引入
import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter)

//引入store
import store from '@/store';


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
let router= new VueRouter({
    routes:[
        {
            path:"/home",
            component:()=>import('@/pages/Home') ,
            meta:{show:true}
        },
        {
            path:"/login",
            component:()=>import('@/pages/Login') ,
            meta:{show:false}
        },
        {
            path:"/register",
            component:()=>import('@/pages/Register') ,
            meta:{show:false}
        },
        {
            path:"/search/:keyword?",
            component:()=>import('@/pages/Search') ,
            meta:{show:true},
            name:"search"
        },
        {
            path:"/detail/:skuid",
            component:()=>import('@/pages/Detail') ,
            meta:{show:true}
        },
        {
            path:"/addCartSuccess",
            component:()=>import('@/pages/AddCartSuccess') , 
            name:'addCartSuccess',
            meta:{show:true}
        },
        {
            path:"/shopcart",
            component:()=>import('@/pages/ShopCart') ,  
            meta:{show:true}
        },
        {
            path:"/trade",
            component:()=>import('@/pages/Trade') , 
            meta:{show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/shopcart'){
                    next();
                }else{
                    next(false);
                }
            }
        },
        {
            path:"/pay",
            component:()=>import('@/pages/Pay') ,  
            meta:{show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/trade'){
                    next();
                }else{
                    next(false);
                }
            }
        },
        {
            path:"/paySuccess",
            component:()=>import('@/pages/PaySuccess') , 
            meta:{show:true},
            beforeEnter:(to,from,next)=>{
                if(from.path=='/pay'){
                    next();
                }else{
                    next(false);
                }
            }
        },
        {
            path:"/center",
            component:()=>import('@/pages/Center') ,  
            meta:{show:true},
            //子路由组件
            children:[
                {
                    path:'myorder',
                    component:()=>import('@/pages/Center/myOrder') , 
                },
                {
                    path:'grouporder',
                    component:()=>import('@/pages/Center/groupOrder') , 
                },
                //重定向
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
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

let token=store.state.user.token;
let name=store.state.user.userInfo.name;

//路由守卫,全局
router.beforeEach(async(to,from,next)=>{
    if(token){
        //已登录，不可去登录页
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        }else{
            //已登录，有用户名
            if(name){
                next();
            }else{
                //没用户名，派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch('getUserInfo')
                    next();
                } catch (error) {
                    //token失效，获取不到用户信息
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        //未登录不能去支付相关
        let toPath=to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next();
        }
        
    }
})


export default router;