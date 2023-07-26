import request from ".."
import { TResultToken } from "./types";

const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    try{
        if(!token) return Promise.reject("Не обнаружен токен для обновления");
        const result = await request<TResultToken>('auth/token', 'POST', {token: token});
        if(result.success){
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            return result.accessToken;
        }else{
            return Promise.reject('Произошла ошибка');
        }
    }catch(error){
        return Promise.reject(error);
    }
}

export default refreshToken;