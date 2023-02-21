import { reqCategoryList,reqBannerList} from "@/api"

//state:仓库存储数据的地方
const state={
    //state中数据初始值根据接口返回值写
    categoryList:[],
    BannerList:[]
}
//mutations:修改state唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    BANNERLIST(state,BannerList){
        state.BannerList=BannerList;
    }
}
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result=await reqCategoryList()
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    //获取轮播图数据
    async BannerList({commit}){
        let result=await reqBannerList()
        if(result.code==200){
            commit("BANNERLIST",result.data)
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters={}



export default {
    state,
    mutations,
    actions,
    getters
}