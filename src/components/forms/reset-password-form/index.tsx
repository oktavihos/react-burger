import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { resetPasswordFetch } from "../../../services/reset-password/reset-password-slice";
import RoutesList from "../../../services/routes";
import { TResetPasswordData } from "../../../services/reset-password/reset-password-slice/types";
import { useForm } from "../../../hooks";

const initialStateResetPassword: TResetPasswordData = {
    password: '', token: ''
};

const ResetPasswordForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const {isLoading, isFailed, error} = useAppSelector(state => state.resetPassword);
    const isForgotSuccess = useAppSelector(state => state.forgotPassword.isSuccess);
    const location = useLocation();
    const navigate = useNavigate();
    const { values, handleChange } = useForm<TResetPasswordData>(initialStateResetPassword);

    if(!isForgotSuccess) return <Navigate to={RoutesList.FORGOT_PASSWORD} state={location.state} />

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPasswordFetch(values)).then((action) => {
            if(action.meta.requestStatus === 'fulfilled'){
                navigate(RoutesList.LOGIN, {state: location.state});
            }
        })
    }

    return (
        <form onSubmit={sendForm} className="text-center">
            <div className="text text_type_main-medium">Восстановление пароля</div>
            <div className="loader-wrapper mt-6">
                {isLoading ? <div className="loader-container"><Loader /></div> : ''}
                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    onChange={handleChange}
                    value={values.password}
                    autoComplete="off"
                    name={'password'}
                    size={'default'}
                    required
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.token}
                    name={'token'}
                    autoComplete="off"
                    size={'default'}
                    extraClass="mt-6"
                    required
                />
                {isFailed ? <div className="form-error mt-6">{error}</div> : ''}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Восстановить</Button>
            </div>
            <div className="mt-20 text text_type_main-default footer-form">
                <p>Вспомнили пароль? <Link to={RoutesList.LOGIN} state={location.state}>Войти</Link></p>
            </div>
        </form>
    );
}

export default ResetPasswordForm;