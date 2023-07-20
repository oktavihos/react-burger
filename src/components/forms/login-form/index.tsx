import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {

    const [state, setState] = useState({email: '', password: ''});

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
            <div className="text text_type_main-medium">Вход</div>
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
            <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">Войти</Button>
            <div className="mt-20 text text_type_main-default footer-form">
                <p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
                <p>Забыли пароль? <Link to="/reset-password">Восстановить пароль</Link></p>
            </div>
        </form>
    );
}

export default LoginForm;