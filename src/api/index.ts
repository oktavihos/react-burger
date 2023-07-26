import * as Config from '../config/api';

const request = async <T = any>(
    endpoint: string,
    method: string = 'GET',
    body?: Object,
    headers = {}
): Promise<T> => {
    let params: RequestInit | undefined = {};
    if(body || method !== 'GET'){
        params = {
            method,
            body: JSON.stringify(body)
        };
    }

    params.headers = {
        'Content-Type': 'application/json;charset=utf-8',
        ...headers
    };

    return await fetch(`${Config.API_URL}${endpoint}`, params)
        .then(response => response.ok ? response.json() : response.json().then(error => Promise.reject(error)))
        .then(result => {
            if(result.success) return result;
            else return Promise.reject('Произошла ошибка при получении данных с сервера');
        });
}

export default request;