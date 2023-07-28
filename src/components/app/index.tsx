import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { 
    ForgotPasswordPage, 
    HomePage, 
    IngredientPage, 
    LoginPage, 
    NotFoundPage, 
    ProfilePage, 
    RegisterPage, 
    ResetPasswordPage 
} from '../../pages';
import ProtectedRoute from '../../services/protected-route';
import { useAppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/ingredients-slice';
import { getUser } from '../../services/profile/profile-slice';
import Modal from '../modal';
import IngredientsDetail from '../burger-ingredients/components/ingredients-detail';
import { ProfileForm } from '../forms';
import RoutesList from '../../services/routes';

const App: React.FC = () => {

    const dispatch = useAppDispatch();
    const  location = useLocation();
    const state = location.state as { backgroundLocation?: Location };
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
    }, [dispatch]);

    return(
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<HomePage />} />
                <Route path={RoutesList.LOGIN} element={
                    <ProtectedRoute onlyUnAuth>
                        <LoginPage />
                    </ProtectedRoute>
                } />
                <Route path={RoutesList.REGISTER} element={
                    <ProtectedRoute onlyUnAuth>
                        <RegisterPage />
                    </ProtectedRoute>
                } />
                <Route path={RoutesList.FORGOT_PASSWORD} element={
                    <ProtectedRoute onlyUnAuth>
                        <ForgotPasswordPage />
                    </ProtectedRoute>
                } />
                <Route path={RoutesList.RESET_PASSWORD} element={
                    <ProtectedRoute onlyUnAuth>
                        <ResetPasswordPage />
                    </ProtectedRoute>
                } />
                <Route path={RoutesList.PROFILE} element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }>
                    <Route path={RoutesList.PROFILE_ORDERS} element={
                        <div className='text text_type_main-default'>Здесь будет история заказов</div>
                    } />
                    <Route path={RoutesList.PROFILE} element={<ProfileForm />} />
                </Route>
                <Route path={RoutesList.INGREDIENT_DETAIL} element={<IngredientPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path={RoutesList.INGREDIENT_DETAIL} element={
                        <Modal title="Детали ингредиента" closeModalHandle={() => navigate(-1)}>
                            <IngredientsDetail />
                        </Modal>
                    } />
                </Routes>
            )}
        </>
    );
}

export default App;
