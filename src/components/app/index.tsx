import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgotPasswordPage, HomePage, IngredientPage, LoginPage, NotFoundPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';

const App: React.FC = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={
                    <HomePage />
                } />
                <Route path="/login" element={
                    <LoginPage />
                } />
                <Route path="/register" element={
                    <RegisterPage />
                } />
                <Route path="/forgot-password" element={
                    <ForgotPasswordPage />
                } />
                <Route path="/reset-password" element={
                    <ResetPasswordPage />
                } />
                <Route path="/profile" element={
                    <ProfilePage />
                } />
                <Route path="/ingredients/:id" element={
                    <IngredientPage />
                } />
                <Route path="*" element={
                    <NotFoundPage />
                } />
            </Routes>
        </Router>
    );
}

export default App;