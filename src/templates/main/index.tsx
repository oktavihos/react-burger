import AppHeader from "../../components/app-header";
import mainStyle from "./style.module.sass";
import { TMainTemplateProps } from "./types";

const MainTemplate: React.FC<TMainTemplateProps> = ({children}) => {
    return(
        <>
            <AppHeader />
            <main className={`${mainStyle.main} pl-5 pr-5`}>
                {children}
            </main>
        </>
    );
}

export default MainTemplate;