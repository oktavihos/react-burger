import * as Config from '../../config/api';

const request = <T = any>(
    endpoint: string,
    method: string = 'GET',
    body?: Object
): Promise<T> => {
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

    return fetch(`${Config.API_URL}${endpoint}`, params)
        .then(response => response.ok ? response.json() : response.json().then(error => Promise.reject(error)))
        .then(responseResult => {
            if(responseResult.success) return responseResult;
            else{
                Promise.reject("Произошла ошибка при отправке данных");
            }
        });
}

export default request;