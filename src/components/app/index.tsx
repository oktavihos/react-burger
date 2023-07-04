import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingredients";
import appStyle from './style.module.sass';
import useRequest from "../../hooks/use-request";
import { TBurgerReducer, TBurgerReducerState, BurgerActionTypes } from "./types";
import { useEffect, useMemo, useReducer, useState } from "react";
import LoaderPage from "../loader-page";
import burgerReducer from "./reducer";
import { BurgerContext } from "../services/app-context";

const burgerInitialState: TBurgerReducerState = {ingredients: [], constructor: []};

const App: React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [burgerState, burgerDispatch] = useReducer<TBurgerReducer>(burgerReducer, burgerInitialState, undefined);

    const getIngredients = useRequest('ingredients');

    useEffect(() => {
        setLoading(true);
        getIngredients().then(data => {
            burgerDispatch({type: BurgerActionTypes.LOAD_INGREDIENTS, payload: data});
            setLoading(false);
        }).catch(error => {
            setErrors([error.toString()]);
            setLoading(false);
        });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const dataProvider = useMemo(() => {
        return {burgerState, burgerDispatch};
    }, [JSON.stringify(burgerState), burgerDispatch]);  //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <BurgerContext.Provider value={dataProvider}>
            <AppHeader />
            <main className={`${appStyle.main} pl-5 pr-5`}>
                {isLoading ? <LoaderPage /> : (errors.length > 0 ? <div className="pt-15 text text_type_main-default">
                    {errors.map(error => {
                        return <div>{error}</div>
                    })}
                </div> :
                    <>
                        <section className={`${appStyle.section} pr-5`}>
                            <BurgerIngridients />
                        </section>
                        <section className={`${appStyle.section} pl-5 pt-25 pb-10`}>
                            <BurgerConstructor />
                        </section>
                    </>
                )}
            </main>
        </BurgerContext.Provider>
    );
}

export default App;