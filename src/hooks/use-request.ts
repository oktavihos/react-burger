import { useCallback } from 'react';
import * as Config from '../config/api';

const useRequest = <T>(
    method: string,
    setLoading: (load: boolean) => void = () => {},
    setErrors: (error: string) => void = () => {}
) => {
    const getData = useCallback(() => async () => {
        setLoading(true);
        let result: T = await fetch(`${Config.API_URL}${method}`)
            .then(response => response.json())
            .then(responseResult => {
                if(responseResult.success) return responseResult.data;
                else{
                    return [];
                }
            })
            .catch(error => {});
        setTimeout(() => { //DEMO
            setLoading(false);
        }, 800);
        return result;
    }, [method, setLoading]);

    return getData;
}

export default useRequest;