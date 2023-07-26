import { ForgotPasswordForm } from "../../components/forms";
import MainTemplate from "../../templates/main";

const ForgotPasswordPage: React.FC = () => {
    return (
        <MainTemplate>
            <section className="center-container">
                <ForgotPasswordForm />
            </section>
        </MainTemplate>
    );
}

export default ForgotPasswordPage;