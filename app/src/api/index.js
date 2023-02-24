import requests from "@/api/request";
import mockRequests from "@/api/mockAjax"

export const reqCategoryList=()=>{
    return requests({url:'/product/getBaseCategoryList',method:'GET'})
}
export const reqBannerList=()=>{
    return mockRequests({url:'/banner',method:'GET'})
}
export const reqFloorList=()=>{
    return mockRequests({url:'/floor',method:'GET'})
}
//当前接口给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({url:"/list",method:"post",data:params})

export const reqGoodsInfo=(skuId)=>{
    return requests({url:`/item/${skuId}`,method:'get'})
}
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
export const reqCartList=()=>requests({url:'/cart/cartList',method:"get"})