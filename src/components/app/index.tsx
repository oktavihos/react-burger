import { useEffect, useMemo, useReducer, useState } from "react";
import useRequest from "../../hooks/use-request";
import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingredients";
import appStyle from './style.module.sass';
import LoaderPage from "../loader-page";
import { BurgerIngredientsContext } from "../../services/burger-ingredients-context";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";
import { IngredientsActionTypes, TIngredientsReducer } from "../../store/burger-ingredients/types";
import { ingredientsInitialState, ingredientsReducer } from "../../store/burger-ingredients/reducer";
import { constructorInitialState, constructorReducer } from "../../store/burger-constructor/reducer";
import { TConstructorReducer } from "../../store/burger-constructor/types";



const App: React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const [ingredientsState, ingredientsDispatch] = useReducer<TIngredientsReducer>(ingredientsReducer, ingredientsInitialState, undefined);
    const [constructorState, constructorDispatch] = useReducer<TConstructorReducer>(constructorReducer, constructorInitialState, undefined);

    const getIngredients = useRequest('ingredients');

    useEffect(() => {
        setLoading(true);
        getIngredients().then(result => {
            ingredientsDispatch({type: IngredientsActionTypes.LOAD_INGREDIENTS, payload: result.data});
            setLoading(false);
        }).catch(error => {
            setErrors([error.toString()]);
            setLoading(false);
        });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const dataIngredientsProvider = useMemo(() => {
        return {ingredientsState, ingredientsDispatch};
    }, [JSON.stringify(ingredientsState), ingredientsDispatch]);  //eslint-disable-line react-hooks/exhaustive-deps

    const dataConstructorProvider = useMemo(() => {
        return {constructorState, constructorDispatch};
    }, [JSON.stringify(constructorState), constructorDispatch]);  //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <BurgerIngredientsContext.Provider value={dataIngredientsProvider}>
            <BurgerConstructorContext.Provider value={dataConstructorProvider}>
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
            </BurgerConstructorContext.Provider>
        </BurgerIngredientsContext.Provider>
    );
}

export default App;