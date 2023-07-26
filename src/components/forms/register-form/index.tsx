import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { registerFetch, setFields } from "../../../services/register/register-slice";

const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const {isLoading, isFailed, error, data} = useAppSelector(state => state.register);
    const [viewPassword, setViewPassword] = useState(false);
    const location = useLocation();

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFields({key: e.target.name, value: e.target.value}));
    }

    const viewPasswordHandler = () => {
        setViewPassword(!viewPassword);
    }

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerFetch(data));
    }

    return (
        <form onSubmit={sendForm} className="text-center">
            <div className="text text_type_main-medium">Регистрация</div>
            <div className="loader-wrapper mt-6">
                {isLoading ? <div className="loader-container"><Loader /></div> : ''}
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={setValue}
                    autoComplete="off"
                    value={data.name ?? ''}
                    name={'name'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={setValue}
                    value={data.email}
                    name={'email'}
                    size={'default'}
                    autoComplete="off"
                    extraClass="mt-6"
                    required
                />
                <Input
                    type={viewPassword ? 'text' : 'password'}
                    placeholder={'Пароль'}
                    onChange={setValue}
                    icon={viewPassword ? 'HideIcon' : 'ShowIcon'}
                    value={data.password}
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
                <p>Уже зарегистрированы? <Link to="/login" state={location.state}>Войти</Link></p>
            </div>
        </form>
    );
}

export default RegisterForm;