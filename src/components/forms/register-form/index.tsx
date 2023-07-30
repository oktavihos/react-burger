import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { registerFetch } from "../../../services/register/register-slice";
import RoutesList from "../../../services/routes";
import { useForm } from "../../../hooks";
import { TRegisterData } from "../../../services/register/register-slice/types";

const initialStateRegister: TRegisterData = {
    name: '', email: '', password: ''
};

const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const {isLoading, isFailed, error} = useAppSelector(state => state.register);
    const [viewPassword, setViewPassword] = useState(false);
    const location = useLocation();
    const { values, handleChange } = useForm<TRegisterData>(initialStateRegister);

    const viewPasswordHandler = () => {
        setViewPassword(!viewPassword);
    }

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerFetch(values));
    }

    return (
        <form onSubmit={sendForm} className="text-center">
            <div className="text text_type_main-medium">Регистрация</div>
            <div className="loader-wrapper mt-6">
                {isLoading ? <div className="loader-container"><Loader /></div> : ''}
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    autoComplete="off"
                    value={values.name ?? ''}
                    name={'name'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    size={'default'}
                    autoComplete="off"
                    extraClass="mt-6"
                    required
                />
                <Input
                    type={viewPassword ? 'text' : 'password'}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    icon={viewPassword ? 'HideIcon' : 'ShowIcon'}
                    value={values.password}
                    name={'password'}
                    onIconClick={viewPasswordHandler}
                    autoComplete="off"
                    size={'default'}
                    extraClass="mt-6"
                    required
                />
                {isFailed ? <div className="form-error mt-6">{error}</div> : ''}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Зарегистрироваться</Button>
            </div>
            <div className="mt-20 text text_type_main-default footer-form">
                <p>Уже зарегистрированы? <Link to={RoutesList.LOGIN} state={location.state}>Войти</Link></p>
            </div>
        </form>
    );
}

export default RegisterForm;