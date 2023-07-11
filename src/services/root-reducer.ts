import { combineReducers } from "redux";
import constructorReducer from './constructor/constructor-slice';
import ingredientsReducer from './ingredients/ingredients-slice';

const rootReducer = combineReducers({burgerConstructor: constructorReducer, ingredients: ingredientsReducer});

export default rootReducer;