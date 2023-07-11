import AppHeader from "../app-header";
import BurgerConstructor from "../burger-constructor";
import BurgerIngridients from "../burger-ingredients";
import appStyle from './style.module.sass';
import LoaderPage from "../loader-page";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useEffect } from "react";
import { getIngredients } from "../../services/ingredients/ingredients-slice";



const App: React.FC = () => {

    const { isFailed, isLoading } = useAppSelector(state => state.ingredients);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return(
        <>
            <AppHeader />
            <main className={`${appStyle.main} pl-5 pr-5`}>
                {isLoading ? <LoaderPage /> : (isFailed ? <div className="pt-15 text text_type_main-default">
                    Произошла ошибка при отправке данных
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