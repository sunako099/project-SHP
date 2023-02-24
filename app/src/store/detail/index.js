import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from "@/utils/uuid_token"

//state:仓库存储数据的地方
const state={
    goodInfo:{},
    uuid_token:getUUID()
}
//mutations:修改state唯一手段
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
}
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions={
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId);
        if(result.code==200){
            commit("GETGOODINFO",result.data)
        }
    },
    //服务器写入数据成功，并没有返回什么，所以不用三连环存储数据
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        //async函数返回promise，获取请求成功还是失败的状态返回给组件
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters={
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
}



export default {
    state,
    mutations,
    actions,
    getters
}