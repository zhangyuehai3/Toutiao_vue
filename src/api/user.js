import request from '@/utils/request'
import store from '@/store/'

export const login = data =>{
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}
export const sendSms = mobile =>{
    return request({
        method:'GET',
        url:`/app/v1_0/sms/codes/${mobile}`,
        
    })
}
export const getCurrentUser = () =>{
    return request({
        method:'GET',
        url:'/app/v1_0/user',
       
    })
}

export const getUserChannels = () =>{
    return request({
        method:'GET',
        url:'/app/v1_0/user/channels',
       
    })
}
export const addFollow =userId =>{
    return request({
        method:'POST',
        url:'/app/v1_0/user/followings',
        data:{
            target:userId
        }
       
    })
}
export const deleteFollow = userId =>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/following/${userId}`,
       
    })
}

export const getUserProfile = ()=>{
    return request({
        method:'GET',
        url:`/app/v1_0/user/profile`,
       
    })
}
export const updateUserProfile = data=>{
    return request({
        method:'PATCH',
        url:`/app/v1_0/user/profile`,
       data
    })
}

export const updateUserPhoto = data=>{
    return request({
        method:'PATCH',
        url:`/app/v1_0/user/photo`,
       data
    })
}

