import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart.js'
import user from './user.js'
import trade from './trade.js'

export default new Vuex.Store({
    
    //实现Vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})