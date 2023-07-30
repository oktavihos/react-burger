import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { updateUser } from "../../../services/profile/profile-slice";
import formStyle from './style.module.sass';
import { TUserUpdate } from "../../../services/profile/profile-slice/types";
import { useForm } from "../../../hooks";

const ProfileForm: React.FC = () => {

    const user = useAppSelector(state => state.profile.user);
    const {isLoading, isFailed, error} = useAppSelector(state => state.profile.requests.updateUser);
    const dispatch = useAppDispatch();
    const { values, handleChange, setValues } = useForm<TUserUpdate|undefined>(user);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(values) dispatch(updateUser(values));
    }

    const isDisabled = useMemo(() => {
        return values?.name === user?.name
            && values?.email === user?.email
            && !values?.password
    }, [values, user])

    const resetHandler = () => {
        setValues(user);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="loader-wrapper">
                {isLoading && <div className="loader-container"><Loader /></div>}
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    icon={"EditIcon"}
                    value={values?.name || ''}
                    name={'name'}
                    autoComplete="off"
                    size={'default'}
                    required
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={handleChange}
                    icon={"EditIcon"}
                    value={values?.email || ''}
                    autoComplete="off"
                    name={'email'}
                    size={'default'}
                    extraClass="mt-6"
                    required
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    autoComplete="off"
                    onChange={handleChange}
                    icon={'EditIcon'}
                    value={values?.password || ''}
                    name={'password'}
                    size={'default'}
                    extraClass="mt-6"
                />
                {isFailed ? <div className="form-error mt-6">{error}</div> : ''}
                <div className={`mt-6 ${formStyle.buttons}`}>
                    <Button disabled={isDisabled} extraClass={formStyle.cancelButton} onClick={resetHandler} htmlType="button">Отменить</Button>
                    <Button disabled={isDisabled} extraClass="ml-6" htmlType="submit">Сохранить</Button>
                </div>
            </div>
        </form>
    );
}

export default ProfileForm;