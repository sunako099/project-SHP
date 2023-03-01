import { reqAddressInfo,reqOrderInfo} from "@/api"

const state={
    address:[],
    orderInfo:{}
}

const mutations={
    GETUSERADRESS(state,address){
        state.address=address;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo;
    }
}

const actions={
    async getUserAddress({commit}){
        let result=await reqAddressInfo();
        if(result.code==200){
            commit("GETUSERADRESS",result.data)
        }
    },
    async getOrderInfo({commit}){
        let result=await reqOrderInfo();
        if(result.code==200){
            commit("GETORDERINFO",result.data)
        }
    },
}

const getters={
}

//对外暴露Store一个实例
export default {
    state,
    mutations,
    actions,
    getters
}