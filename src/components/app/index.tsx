import { useEffect } from "react";
import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingredients";
import appStyle from './style.module.sass';
import LoaderPage from "../loader-page";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/ingredients-slice";
import { RootState, useAppDispatch } from "../../services/store";



const App: React.FC = () => {

    const dispatch = useAppDispatch();
    const { isFailed, isLoading } = useSelector<RootState>(state => state.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return(
        <>
            <AppHeader />
            <main className={`${appStyle.main} pl-5 pr-5`}>
                {isLoading ? <LoaderPage /> : (errors.length > 0 ? <div className="pt-15 text text_type_main-default">
                    {errors.map(error => {
                        return <div>{error}</div>
                    })}
                </div> :
                    <DndProvider backend={HTML5Backend}>
                        <section className={`${appStyle.section} pr-5`}>
                            <BurgerIngridients />
                        </section>
                        <section className={`${appStyle.section} pl-5 pt-25 pb-10`}>
                            <BurgerConstructor />
                        </section>
                    </DndProvider>
                )}
            </main>
        </>
    );
}

export default App;