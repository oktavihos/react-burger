import request from "..";
import { ACCESS_TOKEN_FIELD } from "../../config/api";
import refreshToken from "../refresh-token";

const securityRequest = async <T>(
    endpoint: string,
    method: string = 'GET',
    body?: Object
): Promise<T> => {
    try{
        const accessToken = localStorage.getItem(ACCESS_TOKEN_FIELD);
        if(!accessToken) return Promise.reject("Пользователь не авторизован");
        return await request<T>(endpoint, method, body, {authorization: `Bearer ${accessToken}`});
    }catch(error){
        if (error instanceof Error && error.message === "jwt expired") {
            const accessToken = await refreshToken();
            return await request<T>(endpoint, method, body, {authorization: `Bearer ${accessToken}`});
        }else{
            return Promise.reject(error);
        }
    }
}

export default securityRequest;