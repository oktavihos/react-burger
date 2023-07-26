import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import Loader from "../../loader";
import { resetUpdateUser, setFields, updateUser } from "../../../services/profile/profile-slice";
import formStyle from './style.module.sass';

const ProfileForm: React.FC = () => {

    const user = useAppSelector(state => state.profile.user);
    const {isLoading, isFailed, error, data} = useAppSelector(state => state.profile.requests.updateUser);
    const dispatch = useAppDispatch();

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFields({key: e.target.name, value: e.target.value}));
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(data) dispatch(updateUser(data));
    }

    const resetHandler = () => {
        dispatch(resetUpdateUser());
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="loader-wrapper">
                {isLoading && <div className="loader-container"><Loader /></div>}
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={setValue}
                    icon={"EditIcon"}
                    value={data?.name || user?.name || ''}
                    name={'name'}
                    autoComplete="off"
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={setValue}
                    icon={"EditIcon"}
                    value={data?.email || user?.email || ''}
                    autoComplete="off"
                    name={'email'}
                    size={'default'}
                    extraClass="mt-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    autoComplete="off"
                    onChange={setValue}
                    icon={'EditIcon'}
                    value={data?.password || ''}
                    name={'password'}
                    size={'default'}
                    extraClass="mt-6"
                />
                {isFailed ? <div className="form-error mt-6">{error}</div> : ''}
                <div className={`mt-6 ${formStyle.buttons}`}>
                    <Button extraClass={formStyle.cancelButton} onClick={resetHandler} htmlType="button">Отменить</Button>
                    <Button disabled={!data} extraClass="ml-6" htmlType="submit">Сохранить</Button>
                </div>
            </div>
        </form>
    );
}

export default ProfileForm;