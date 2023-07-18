import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './style.module.sass';
import { NavLink } from 'react-router-dom';

const AppHeader: React.FC = () => (
    <header className={`${headerStyle.header} pt-4 pb-4`}>
        <div className={headerStyle.headerWrapper}>
            <div className={headerStyle.headerLeft}>
                <NavLink to="/" className={`btn_icon btn_icon_primary mr-2 pl-5 pr-5 pt-4 pb-4`}>
                    <BurgerIcon type="secondary" />
                    <span className='ml-2'>Конструктор</span>
                </NavLink>
                <NavLink to="/feeds" className={`btn_icon btn_icon_primary pl-5 pr-5 pt-4 pb-4`}>
                    <ListIcon type="secondary" />
                    <span className='ml-2'>Лента заказов</span>
                </NavLink>
            </div>
            <div className={headerStyle.logo}>
                <Logo />
            </div>
            <div className={headerStyle.headerRight}>
                <NavLink to="/profile" className={`btn_icon btn_icon_primary pl-5 pr-5 pt-4 pb-4`}>
                    <ProfileIcon type="secondary" />
                    <span className='ml-2'>Личный кабинет</span>
                </NavLink>
            </div>
        </div>
    </header>
);

export default AppHeader;