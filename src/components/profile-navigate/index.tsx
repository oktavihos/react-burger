import { NavLink, useLocation } from "react-router-dom";
import { TProfileNavigateProps } from "./types";
import navStyle from './style.module.sass';
import RoutesList from "../../services/routes";

const ProfileNavigate: React.FC<TProfileNavigateProps> = ({extraClass, logoutHandler}) => {

    const { pathname } = useLocation();

    return (
        <nav className={`${extraClass ?? ''} ${navStyle.navBlock} text text_type_main-medium`}>
            <NavLink className={() => pathname === RoutesList.PROFILE ? 'active' : ''} to={RoutesList.PROFILE}>Профиль</NavLink>
            <NavLink to={RoutesList.PROFILE_ORDERS}>История заказов</NavLink>
            <a href="/" onClick={logoutHandler}>Выход</a>
        </nav>
    );
}

export default ProfileNavigate;