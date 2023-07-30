import { LoginForm } from "../../components/forms";
import MainTemplate from "../../templates/main";

const LoginPage: React.FC = () => {
    return (
        <MainTemplate>
            <section className="center-container">
                <LoginForm />
            </section>
        </MainTemplate>
    );
}

export default LoginPage;