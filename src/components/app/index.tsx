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
import FeedPage from '../../pages/feed';
import OrdersPage from '../../pages/orders';
import OrderInfo from '../order-info';
import OrderInfoPage from '../../pages/order-info';

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
                <Route path={RoutesList.FEED} element={
                    <FeedPage />
                } />
                <Route path={RoutesList.DETAIL_FEED} element={
                    <OrderInfoPage searchStore={'feed'} />
                } />
                <Route path={RoutesList.DETAIL_PROFILE_ORDERS} element={
                    <OrderInfoPage searchStore={'orders'} />
                } />
                <Route path={RoutesList.PROFILE} element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }>
                    <Route path={RoutesList.PROFILE_ORDERS} element={
                        <OrdersPage />
                    } />
                    <Route path={RoutesList.PROFILE} element={<ProfileForm />} />
                </Route>
                <Route path={RoutesList.INGREDIENT_DETAIL} element={<IngredientPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path={RoutesList.INGREDIENT_DETAIL} element={
                        <Modal closeModalHandle={() => navigate(-1)}>
                            <div className="text text_type_main-large">Детали ингредиента</div>
                            <IngredientsDetail />
                        </Modal>
                    } />
                    <Route path={RoutesList.DETAIL_FEED} element={
                        <Modal closeModalHandle={() => navigate(-1)}>
                            <OrderInfo searchStore={'feed'} />
                        </Modal>
                    } />
                    <Route path={RoutesList.DETAIL_PROFILE_ORDERS} element={
                        <Modal closeModalHandle={() => navigate(-1)}>
                            <OrderInfo searchStore={'orders'} />
                        </Modal>
                    } />
                </Routes>
            )}
        </>
    );
}

export default App;
