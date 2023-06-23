import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingredients";
import appStyle from './style.module.sass';
import burgerCategories from '../../utils/categories.json';
import burgerCart from '../../utils/cart.json';
import useRequest from "../../hooks/use-request";
import { TBurgerData } from "./types";
import { useEffect, useState } from "react";
import LoaderPage from "../loader-page";

const App: React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const getIngredients = useRequest<TBurgerData[]>('ingredients', setLoading);
    const [state, setState] = useState<TBurgerData[]>([]);

    useEffect(() => {
        const sendRequest = getIngredients();
        sendRequest().then(data => setState(data));
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            <AppHeader />
            <main className={`${appStyle.main} pl-5 pr-5`}>
                {isLoading ? <LoaderPage /> :
                    <>
                        <section className={`${appStyle.section} pr-5`}>
                            <BurgerIngridients data={state} categories={burgerCategories} />
                        </section>
                        <section className={`${appStyle.section} pl-5 pt-25 pb-10`}>
                            <BurgerConstructor data={burgerCart} />
                        </section>
                    </>
                }
            </main>
        </>
    );
}

export default App;