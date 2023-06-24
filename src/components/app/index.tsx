import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingredients";
import appStyle from './style.module.sass';
import burgerCart from '../../utils/cart.json';
import useRequest from "../../hooks/use-request";
import { TBurgerData } from "./types";
import { useEffect, useState } from "react";
import LoaderPage from "../loader-page";

const App: React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [state, setState] = useState<TBurgerData[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const getIngredients = useRequest('ingredients');

    useEffect(() => {
        setLoading(true);
        getIngredients().then(data => {
            setState(data); setLoading(false);
        }).catch(error => {
            setErrors([error.toString()]);
            setLoading(false);
        });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            <AppHeader />
            <main className={`${appStyle.main} pl-5 pr-5`}>
                {isLoading ? <LoaderPage /> : (errors.length > 0 ? <div className="pt-15 text text_type_main-default">
                    {errors.map(error => {
                        return <div>{error}</div>
                    })}
                </div> :
                    <>
                        <section className={`${appStyle.section} pr-5`}>
                            <BurgerIngridients data={state} />
                        </section>
                        <section className={`${appStyle.section} pl-5 pt-25 pb-10`}>
                            <BurgerConstructor data={burgerCart} />
                        </section>
                    </>
                )}
            </main>
        </>
    );
}

export default App;