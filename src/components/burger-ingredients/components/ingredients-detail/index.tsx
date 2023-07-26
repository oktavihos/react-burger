import ingredientsStyle from './style.module.sass'; 
import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../../services/store";

const IngredientsDetail: React.FC = () => {

    const { id } = useParams();
    const data = useAppSelector(state => state.ingredients.data.find(item => item._id === id));

    return (
        <>
            <div className={ingredientsStyle.image}>
                <img src={data?.image_large} alt={data?.name} />
            </div>
            <div className={`${ingredientsStyle.name} text text_type_main-medium pt-4 pb-8`}>{data?.name}</div>
            <div className={`${ingredientsStyle.substances} text text_type_main-default`}>
                <div className="pr-5">
                    Калории,ккал
                    <span className="text text_type_digits-default">{data?.calories}</span>
                </div>
                <div className="pr-5">
                    Белки, г
                    <span className="text text_type_digits-default">{data?.proteins}</span>
                </div>
                <div className="pr-5">
                    Жиры, г
                    <span className="text text_type_digits-default">{data?.fat}</span>
                </div>
                <div>
                    Углеводы, г
                    <span className="text text_type_digits-default">{data?.carbohydrates}</span>
                </div>
            </div>
        </>
    );
};

export default IngredientsDetail;