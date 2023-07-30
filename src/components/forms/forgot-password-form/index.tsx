import { FormEvent } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { forgotPasswordFetch } from "../../../services/forgot-password/forgot-password-slice";
import RoutesList from "../../../services/routes";
import { useForm } from "../../../hooks";
import { TForgotPasswordData } from "../../../services/forgot-password/forgot-password-slice/types";

const initialStateForgotPassword: TForgotPasswordData = {email: ''};

const ForgotPasswordPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const {isLoading, isFailed, error} = useAppSelector(state => state.forgotPassword);
    const { values, handleChange } = useForm<TForgotPasswordData>(initialStateForgotPassword);
    const location = useLocation();
    const navigate = useNavigate();

    const sendForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPasswordFetch(values)).then((action) => {
            if(action.meta.requestStatus === 'fulfilled'){
                navigate(RoutesList.RESET_PASSWORD, {state: location.state});
            }
        });
    }

    return (
        <form onSubmit={sendForm} className="text-center">
            <div className="text text_type_main-medium">Восстановление пароля</div>
            <div className="loader-wrapper mt-6">
                {isLoading && <div className="loader-container"><Loader /></div>}
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    size={'default'}
                    autoComplete="off"
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

export default ForgotPasswordPage;