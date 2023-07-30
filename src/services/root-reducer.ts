import { combineReducers } from "redux";
import constructorReducer from './constructor/constructor-slice';
import ingredientsReducer from './ingredients/ingredients-slice';
import profileReducer from './profile/profile-slice';
import authReducer from './auth/auth-slice';
import registerReducer from './register/register-slice';
import forgotPasswordReducer from './forgot-password/forgot-password-slice';
import resetPasswordReducer from './reset-password/reset-password-slice';

const rootReducer = combineReducers({
    burgerConstructor: constructorReducer, 
    ingredients: ingredientsReducer, 
    profile: profileReducer,
    auth: authReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer
});

export default rootReducer;