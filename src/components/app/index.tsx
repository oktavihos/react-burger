import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingridients";
import appStyle from './style.module.sass';
import burgerData from '../../utils/data.json';
import burgerCategories from '../../utils/categories.json';

const App = () => {
    return (
        <>
            <AppHeader />
            <main className={`${appStyle.main} pl-5 pr-5`}>
                <section className={`${appStyle.section} pr-5`}>
                    <BurgerConstructor data={burgerData} categories={burgerCategories} />
                </section>
                <section className={`${appStyle.section} pl-5`}>
                    <BurgerIngridients />
                </section>
            </main>
        </>
    );
}

export default App;