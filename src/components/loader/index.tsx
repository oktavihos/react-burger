import styleLoader from './style.module.sass';

const Loader: React.FC = () => <svg className={styleLoader.svg} width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" id="c1" />
    <circle cx="60" cy="15" r="15" id="c2" />
    <circle cx="105" cy="15" r="15"  id="c3" />
</svg>

export default Loader;