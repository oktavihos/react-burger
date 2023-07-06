import Loader from '../loader';
import loaderStyle from './style.module.sass';

const LoaderPage: React.FC = () => {
    return <div className={`${loaderStyle.burgerLoaderContainer} p-5`}>
        <Loader />
    </div>
};

export default LoaderPage;