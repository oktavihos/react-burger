import { ResetPasswordForm } from "../../components/forms";
import MainTemplate from "../../templates/main";

const ResetPasswordPage: React.FC = () => {
    return (
        <MainTemplate>
            <section className="center-container">
                <ResetPasswordForm />
            </section>
        </MainTemplate>
    );
}

export default ResetPasswordPage;