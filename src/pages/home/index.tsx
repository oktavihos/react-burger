import { DndProvider } from "react-dnd";
import MainTemplate from "../../templates/main";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoaderPage from "../../components/loader-page";
import homeStyle from "./style.module.sass";
import { useAppSelector } from "../../services/store";
import BurgerIngridients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";

const HomePage: React.FC = () => {

    const { isFailed, isLoading } = useAppSelector(state => state.ingredients);
    
    return (
        <MainTemplate>
            {isLoading ? <LoaderPage /> : (isFailed ? <div className="pt-15 text text_type_main-default">
                Произошла ошибка при отправке данных
            </div> :
                <DndProvider backend={HTML5Backend}>
                    <section className={`${homeStyle.section} pr-5`}>
                        <BurgerIngridients />
                    </section>
                    <section className={`${homeStyle.section} pl-5 pt-15 pb-10`}>
                        <BurgerConstructor />
                    </section>
                </DndProvider>
            )}
        </MainTemplate>
    );
}

export default HomePage;