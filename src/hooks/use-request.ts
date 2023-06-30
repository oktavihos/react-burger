import { useCallback } from 'react';
import * as Config from '../config/api';

const useRequest = (
    method: string
) => {
    const getData = useCallback(async () => {
        return await fetch(`${Config.API_URL}${method}`)
            .then(response => response.ok ? response.json() : response.json().then(error => Promise.reject(error)))
            .then(responseResult => {
                if(responseResult.success) return responseResult.data;
                else{
                    throw new Error("Произошла ошибка при отправке данных");
                }
            });
    }, [method]);

    return getData;
}

export default useRequest;