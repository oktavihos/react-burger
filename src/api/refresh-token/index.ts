import request from ".."
import { ACCESS_TOKEN_FIELD, REFRESH_TOKEN_FIELD } from "../../config/api";
import { TResultToken } from "./types";

const refreshToken = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN_FIELD);
    try{
        if(!token) return Promise.reject("Не обнаружен токен для обновления");
        const result = await request<TResultToken>('auth/token', 'POST', {token: token});
        if(result.success){
            localStorage.setItem(ACCESS_TOKEN_FIELD, result.accessToken);
            localStorage.setItem(REFRESH_TOKEN_FIELD, result.refreshToken);
            return result.accessToken;
        }else{
            return Promise.reject('Произошла ошибка');
        }
    }catch(error){
        return Promise.reject(error);
    }
}

export default refreshToken;