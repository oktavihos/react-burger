import { NavLink, useLocation } from "react-router-dom";
import { TProfileNavigateProps } from "./types";
import navStyle from './style.module.sass';

const ProfileNavigate: React.FC<TProfileNavigateProps> = ({extraClass, logoutHandler}) => {

    const { pathname } = useLocation();

    return (
        <nav className={`${extraClass ?? ''} ${navStyle.navBlock} text text_type_main-medium loader-wrapper`}>
            <NavLink className={() => pathname === "/profile" ? 'active' : ''} to="/profile">Профиль</NavLink>
            <NavLink to="/profile/orders">История заказов</NavLink>
            <a href="/" onClick={logoutHandler}>Выход</a>
        </nav>
    );
}

export default ProfileNavigate;