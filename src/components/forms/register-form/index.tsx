import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
    const [state, setState] = useState({name: '', email: '', password: ''});

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const refPassword = useRef<HTMLInputElement>(null);

    const viewPassword = () => {
        if(refPassword.current){
            const currentType = refPassword.current.type === 'text'
                ? 'password' 
                : 'text';
            refPassword.current.type = currentType;
        }
    }

    return (
        <form className="text-center">
            <div className="text text_type_main-medium">Регистрация</div>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={setValue}
                value={state.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={setValue}
                value={state.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={setValue}
                icon={'ShowIcon'}
                ref={refPassword}
                value={state.password}
                name={'password'}
                onIconClick={viewPassword}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mt-6"
            />
            <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">Зарегистрироваться</Button>
            <div className="mt-20 text text_type_main-default footer-form">
                <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
            </div>
        </form>
    );
}

export default RegisterForm;