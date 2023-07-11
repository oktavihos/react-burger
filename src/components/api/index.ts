import * as Config from '../../config/api';

const request = async <T = any>(
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

    return await fetch(`${Config.API_URL}${endpoint}`, params)
        .then(response => response.ok ? response.json() : response.json().then(error => Promise.reject(error)));
}

export default request;