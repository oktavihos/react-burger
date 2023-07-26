import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { loginFetch, setFields } from "../../../services/auth/auth-slice";

const LoginForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const {isLoading, isFailed, error, data} = useAppSelector(state => state.auth.login);
    const [viewPassword, setViewPassword] = useState(false);

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFields({key: e.target.name, value: e.target.value}));
    }

    const viewPasswordHandler = () => {
        setViewPassword(!viewPassword);
    }

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginFetch(data));
    }

    return (
        <form onSubmit={sendForm} className="text-center">
            <div className="text text_type_main-medium">Вход</div>
            <div className="loader-wrapper mt-6">
                {isLoading && <div className="loader-container"><Loader /></div>}
                <Input
                    value={data.email}
                    type={'email'}
                    name={'email'}
                    placeholder={'E-mail'}
                    onChange={setValue}
                    size={'default'}
                    autoComplete="off"
                    required
                />
                <Input
                    value={data.password}
                    type={viewPassword ? 'text' : 'password'}
                    name={'password'}
                    placeholder={'Пароль'}
                    icon={viewPassword ? 'HideIcon' : 'ShowIcon'}
                    onIconClick={viewPasswordHandler}
                    onChange={setValue}
                    size={'default'}
                    extraClass="mt-6"
                    autoComplete="off"
                    required
                />
                {isFailed ? <div className="form-error mt-6">{error}</div> : ''}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Войти</Button>
            </div>
            <div className="mt-20 text text_type_main-default footer-form">
                <p>Вы — новый пользователь? <Link to="/register" state={location.state}>Зарегистрироваться</Link></p>
                <p>Забыли пароль? <Link to="/forgot-password" state={location.state}>Восстановить пароль</Link></p>
            </div>
        </form>
    );
}

export default LoginForm;