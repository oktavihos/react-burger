import loaderStyle from './style.module.sass';

const LoaderPage: React.FC = () => {
    return <div className={`${loaderStyle.burgerLoaderContainer} p-5`}>
        <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#4c4cff">
            <circle className="point1" cx="15" cy="15" r="15" id="c1">
            </circle>
            <circle className="point2" cx="60" cy="15" r="15" id="c2">
            </circle>
            <circle className="point3" cx="105" cy="15" r="15"  id="c3">
            </circle>
        </svg>
    </div>
};

export default LoaderPage;