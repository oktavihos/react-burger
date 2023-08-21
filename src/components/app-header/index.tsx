import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './style.module.sass';
import { NavLink } from 'react-router-dom';
import RoutesList from '../../services/routes';
import { useAppSelector } from '../../services/store';

const AppHeader: React.FC = () => {

    const user = useAppSelector(state => state.profile.user);

    return (
        <header className={`${headerStyle.header} pt-4 pb-4 mb-10`}>
            <div className={headerStyle.headerWrapper}>
                <div className={headerStyle.headerLeft}>
                    <NavLink to="/" className={`btn_icon btn_icon_primary mr-2 pl-5 pr-5 pt-4 pb-4`}>
                        <BurgerIcon type="secondary" />
                        <span className='ml-2'>Конструктор</span>
                    </NavLink>
                    <NavLink to={RoutesList.FEED} className={`btn_icon btn_icon_primary pl-5 pr-5 pt-4 pb-4`}>
                        <ListIcon type="secondary" />
                        <span className='ml-2'>Лента заказов</span>
                    </NavLink>
                </div>
                <div className={headerStyle.logo}>
                    <Logo />
                </div>
                <div className={headerStyle.headerRight}>
                    <NavLink to={RoutesList.PROFILE} className={`btn_icon btn_icon_primary pl-5 pr-5 pt-4 pb-4`}>
                        <ProfileIcon type="secondary" />
                        <span className='ml-2'>{user?.name ? user.name : <>Личный кабинет</>}</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;