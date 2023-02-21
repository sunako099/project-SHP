import requests from "@/api/request";
import mockRequests from "@/api/mockAjax"

export const reqCategoryList=()=>{
    return requests({url:'/product/getBaseCategoryList',method:'GET'})
}
export const reqBannerList=()=>{
    return mockRequests({url:'/banner',method:'GET'})
}