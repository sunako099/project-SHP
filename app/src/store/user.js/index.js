import { reqGetCode,reqUserRegister,reqUserLogin, reqUserInfo, reqLogout} from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token";

const state={
    code:'',
    token:getToken(),
    userInfo:{}
}

const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    CLEAR(state){
        state.code='';
        state.userInfo={};
        removeToken();
    }
}

const actions={
    async getCode({commit},phone){
        let result=await reqGetCode(phone);
        if(result.code==200){
            commit("GETCODE",result.data);
            return 'OK';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async userRegister({commit},user){
        let result=await reqUserRegister(user);
        if(result.code==200){
            return 'OK';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async userLogin({commit},data){
        let result=await reqUserLogin(data);
        if(result.code==200){
            commit('USERLOGIN',result.data.token);
            setToken(result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        if(result.code==200){
            commit("GETUSERINFO",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async userLogout({commit}){
        let result=await reqLogout();
        if(result.code==200){
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
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