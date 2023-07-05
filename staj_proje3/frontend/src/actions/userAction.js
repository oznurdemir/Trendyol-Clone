import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT
}  from '../constans/userConstans'
import axios from 'axios'

export const login =(email,password)=> async(dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
/**kayıt etme işlemini headers'a yazdık. */
        const config = {Headers:
        {
            'Content-Type' : 'application/json'
        }}
        const {data} = await axios.post('/api/users/login/', {'username':email,'password':password},config)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data))

        
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.response
        })
        
    }
}

export const logout=()=> async(dispatch)=>{
    localStorage.removeItem('userInfo')/**userInfo yu local'den çıkarıyoruz. */
    dispatch({
        type:USER_LOGIN_LOGOUT
    })
}