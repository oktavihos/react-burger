import { useState } from "react";

const useForm = <T>(initialState: T) => {
    const [values, setValues] = useState<T>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
}

export default useForm;