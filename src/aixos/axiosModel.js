import {request} from './axios.js'

//用户登录接口
export function userLogin(data){
    return request('post','',data);
}
