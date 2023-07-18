import MainTemplate from "../../templates/main";
import notFoundStyle from "./style.module.sass";

const NotFoundPage: React.FC = () => {
    return (
        <MainTemplate>
            <div className={`text text_type_main-large mt-8 ${notFoundStyle.container}`}>
                <span className="text text_type_digits-medium mr-6">404</span> Page Not Found
            </div>
        </MainTemplate>
    );
}

export default NotFoundPage;