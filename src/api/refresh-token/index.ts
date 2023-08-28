import request from ".."
import { ACCESS_TOKEN_FIELD, REFRESH_TOKEN_FIELD } from "../../config/api";
import { TResultToken } from "./types";

const refreshToken = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN_FIELD);
    try{
        if(!token) return Promise.reject("Не обнаружен токен для обновления");
        const result = await request<TResultToken>('auth/token', 'POST', {token: `Bearer ${token}`});
        if(result.success){
            const accessToken = result.accessToken.split('Bearer ')[1];
            const refreshToken = result.refreshToken;
            localStorage.setItem(ACCESS_TOKEN_FIELD, accessToken);
            localStorage.setItem(REFRESH_TOKEN_FIELD, refreshToken);
            return accessToken;
        }else{
            return Promise.reject('Произошла ошибка');
        }
    }catch(error){
        return Promise.reject(error);
    }
}

export default refreshToken;