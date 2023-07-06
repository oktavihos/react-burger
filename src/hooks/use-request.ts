import { useCallback } from 'react';
import * as Config from '../config/api';

const useRequest = (
    endpoint: string,
    method: string = 'GET',
    body?: Object
) => {
    const getData = useCallback(async () => {

        let params = {};
        if(body || method !== 'GET'){
            params = {
                method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            };
        }

        return await fetch(`${Config.API_URL}${endpoint}`, params)
            .then(response => response.ok ? response.json() : response.json().then(error => Promise.reject(error)))
            .then(responseResult => {
                if(responseResult.success) return responseResult;
                else{
                    Promise.reject("Произошла ошибка при отправке данных");
                }
            });
    }, [method, endpoint, body]);

    return getData;
}

export default useRequest;