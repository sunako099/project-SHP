import { reqCartList} from "@/api"
//state:仓库存储数据的地方
const state={
    cartList:[]
}
//mutations:修改state唯一手段
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList;
    }
}
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
    async getCartList({commit}){
        let result=await reqCartList();
        if(result.code==200){
            commit("GETCARTLIST",result.data);
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters={
    cartList(state){
        return state.cartList[0]||0;
    }
}

//对外暴露Store一个实例
export default {
    state,
    mutations,
    actions,
    getters
}