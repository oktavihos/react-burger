import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { loginFetch } from "../../../services/auth/auth-slice";
import RoutesList from "../../../services/routes";
import { TUserData } from "../../../services/auth/auth-slice/types";
import { useForm } from "../../../hooks";

const initialStateLogin: TUserData = {email: '', password: ''};

const LoginForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const {isLoading, isFailed, error} = useAppSelector(state => state.auth.login);
    const [viewPassword, setViewPassword] = useState(false);
    const { values, handleChange } = useForm<TUserData>(initialStateLogin);

    const viewPasswordHandler = () => {
        setViewPassword(!viewPassword);
    }

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginFetch(values));
    }

    return (
        <form onSubmit={sendForm} className="text-center">
            <div className="text text_type_main-medium">Вход</div>
            <div className="loader-wrapper mt-6">
                {isLoading && <div className="loader-container"><Loader /></div>}
                <Input
                    value={values.email}
                    type={'email'}
                    name={'email'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    size={'default'}
                    autoComplete="off"
                    required
                />
                <Input
                    value={values.password}
                    type={viewPassword ? 'text' : 'password'}
                    name={'password'}
                    placeholder={'Пароль'}
                    icon={viewPassword ? 'HideIcon' : 'ShowIcon'}
                    onIconClick={viewPasswordHandler}
                    onChange={handleChange}
                    size={'default'}
                    extraClass="mt-6"
                    autoComplete="off"
                    required
                />
                {isFailed ? <div className="form-error mt-6">{error}</div> : ''}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Войти</Button>
            </div>
            <div className="mt-20 text text_type_main-default footer-form">
                <p>Вы — новый пользователь? <Link to={RoutesList.REGISTER} state={location.state}>Зарегистрироваться</Link></p>
                <p>Забыли пароль? <Link to={RoutesList.FORGOT_PASSWORD} state={location.state}>Восстановить пароль</Link></p>
            </div>
        </form>
    );
}

export default LoginForm;