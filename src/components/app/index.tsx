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
                <Route path="/login" element={
                    <ProtectedRoute onlyUnAuth>
                        <LoginPage />
                    </ProtectedRoute>
                } />
                <Route path="/register" element={
                    <ProtectedRoute onlyUnAuth>
                        <RegisterPage />
                    </ProtectedRoute>
                } />
                <Route path="/forgot-password" element={
                    <ProtectedRoute onlyUnAuth>
                        <ForgotPasswordPage />
                    </ProtectedRoute>
                } />
                <Route path="/reset-password" element={
                    <ProtectedRoute onlyUnAuth>
                        <ResetPasswordPage />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }>
                    <Route path='orders' element={
                        <div className='text text_type_main-default'>Здесь будет история заказов</div>
                    } />
                    <Route path='' element={<ProfileForm />} />
                </Route>
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/ingredients/:id" element={
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
