import IngredientsDetail from "../../components/burger-ingredients/components/ingredients-detail";
import MainTemplate from "../../templates/main";
import pageStyle from './style.module.sass';

const IngredientPage: React.FC = () => {
    return (
        <MainTemplate>
            <div className={`${pageStyle.container} mt-30`}>
                <IngredientsDetail />
            </div>
        </MainTemplate>
    );
}

export default IngredientPage;