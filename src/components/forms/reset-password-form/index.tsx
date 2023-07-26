import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { resetPasswordFetch, setFields } from "../../../services/reset-password/reset-password-slice";

const ResetPasswordForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const {isLoading, isFailed, error, data} = useAppSelector(state => state.resetPassword);
    const isForgotSuccess = useAppSelector(state => state.forgotPassword.isSuccess);
    const location = useLocation();
    const navigate = useNavigate();

    if(!isForgotSuccess) return <Navigate to={'/forgot-password'} state={location.state} />

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFields({key: e.target.name, value: e.target.value}));
    }

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPasswordFetch(data)).then((action) => {
            if(action.meta.requestStatus === 'fulfilled'){
                navigate('/login', {state: location.state});
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
                    onChange={setValue}
                    value={data.password}
                    autoComplete="off"
                    name={'password'}
                    size={'default'}
                    required
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={setValue}
                    value={data.token}
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
                <p>Вспомнили пароль? <Link to="/login" state={location.state}>Войти</Link></p>
            </div>
        </form>
    );
}

export default ResetPasswordForm;