import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ResetPasswordForm: React.FC = () => {

    const [state, setState] = useState({email: ''});

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    return (
        <form className="text-center">
            <div className="text text_type_main-medium">Восстановление пароля</div>
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
            <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">Восстановить</Button>
            <div className="mt-20 text text_type_main-default footer-form">
                <p>Вспомнили пароль? <NavLink to="/login">Войти</NavLink></p>
            </div>
        </form>
    );
}

export default ResetPasswordForm;