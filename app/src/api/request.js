//对axios进行二次封装
import axios from "axios";

const requests=axios.create({
    baseURL:'/api',
    timeout:5000,
})
requests.interceptors.requests.use((config)=>{
    return config
})
requests.interceptors.response.use((res)=>{
    return res.data;
},(errror)=>{
    return Promise.reject(new Error('false'))
})

//对外暴露
export default requests