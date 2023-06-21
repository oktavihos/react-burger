import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingridients";
import appStyle from './style.module.sass';
import burgerData from '../../utils/data.json';

const App = () => {
    return (
        <>
            <AppHeader />
            <main className={`${appStyle.main} ml-5 mr-5`}>
                <BurgerConstructor data={burgerData} />
                <BurgerIngridients />
            </main>
        </>
    );
}

export default App;