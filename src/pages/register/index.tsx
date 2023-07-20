import { RegisterForm } from "../../components/forms";
import MainTemplate from "../../templates/main";

const RegisterPage: React.FC = () => {
    return (
        <MainTemplate>
            <section className="center-container">
                <RegisterForm />
            </section>
        </MainTemplate>
    );
}

export default RegisterPage;