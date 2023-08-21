import { MouseEvent, useCallback } from "react";
import ProfileNavigate from "../../components/profile-navigate";
import MainTemplate from "../../templates/main";
import pageStyle from './style.module.sass';
import { useAppDispatch, useAppSelector } from "../../services/store";
import Loader from "../../components/loader";
import { logoutFetch } from "../../services/auth/auth-slice";
import { reset } from "../../services/profile/profile-slice";
import { Outlet } from "react-router";

const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isFailed, isLoading, error } = useAppSelector(state => state.auth.logout);

    const logoutHandler = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutFetch()).then((action) => {
            if(action.meta.requestStatus === "fulfilled"){
                dispatch(reset());
            }
        });
    }, [dispatch]);

    return (
        <MainTemplate>
            <div className={`${pageStyle.container} loader-wrapper`}>
                {isFailed ? <div className="form-error mb-6">{error}</div> : ''}
                {isLoading ? <div className="loader-container"><Loader /></div> : ''}
                <div className={`${pageStyle.sidebar} mr-15 pt-20`}>
                    <ProfileNavigate logoutHandler={logoutHandler} />
                    <div className={`mt-20 text text_type_main-default ${pageStyle.description}`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </div>
                </div>
                <Outlet />
            </div>
        </MainTemplate>
    );
}

export default ProfilePage;