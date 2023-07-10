import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerCategory from './components/burger-category';
import BurgerElement from './components/burger-element';
import ingridientsStyle from './style.module.sass';
import { locCategories } from './locale';
import { BurgerTypes, TBurgerData } from '../app/types';
import IngredientsDetail from './components/ingredients-detail';

const BurgerIngredients: React.FC = () => {

    const [current, setCurrent] = useState<string>(BurgerTypes.BUN);
    const observer = useRef<IntersectionObserver | null>(null);
    const titleRef = useRef<(HTMLHeadingElement | null)[]>([]);

    const { ingredientsState, ingredientsDispatch } = useContext(BurgerIngredientsContext);

    useEffect(() => {
        const root = document.getElementById('scroll-sections');

        observer.current = new IntersectionObserver(entries => {
            const visibleSection = entries.find(entry => entry.isIntersecting)?.target;
            if(visibleSection) setCurrent(visibleSection.id);
        }, {root: root, rootMargin: '0px 0px -90% 0px', threshold: 0});

        const sections = root?.querySelectorAll('h2');
        if(sections) sections.forEach(section => observer.current?.observe(section));

        return () => {
            if(sections) sections.forEach((section) => {
              observer.current?.unobserve(section);
            });
        };

    }, []);

    const closeModalHandle = useCallback(() => {
        if(ingredientsDispatch) ingredientsDispatch({type: IngredientsActionTypes.UNSELECT});
    }, [ingredientsDispatch]);

    const openModalHandle = useCallback((data: TBurgerData) => {
        if(ingredientsDispatch) ingredientsDispatch({type: IngredientsActionTypes.SELECT, payload: data});
    }, [ingredientsDispatch]);

    const categoriesData: TCategoriesData[] = useMemo(() => {
        let result: TCategoriesData[] = [];
        Object.keys(locCategories).forEach(type => {
            let categoryTitle = locCategories[type];
            result.push({
                title: categoryTitle,
                type: type,
                items: ingredientsState?.ingredients ? ingredientsState?.ingredients.filter(item => item.type === type) : []
            });
        });
        return result;
    }, [ingredientsState]); //eslint-disable-line react-hooks/exhaustive-deps

    

    const setRefs = (ref: HTMLHeadingElement | null, index: number) => {
        titleRef.current[index] = ref;
    }

    const handleScroll = (index: number) => {
        titleRef.current[index]?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <>
            {ingredientsState?.selectIngredients && <IngredientsDetail data={ingredientsState.selectIngredients} closeModalHandle={closeModalHandle} />}
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div className={`${ingridientsStyle.tabIngridients} mb-10`}>
                {Object.keys(locCategories).map((type, index) => {
                    return (
                        <Tab key={type} value={type} active={current === type} onClick={() => handleScroll(index)}>
                            {locCategories[type]}
                        </Tab>
                    );
                })}
            </div>
            <div id="scroll-sections" className="scroll mb-10">
                {categoriesData.map((categoryData, index) => {
                    return (
                        <BurgerCategory titleRef={(ref) => setRefs(ref, index)} key={categoryData.type} title={categoryData.title} type={categoryData.type}>
                            {categoryData.items.map(item => <BurgerElement selectHandle={openModalHandle} key={item._id} data={item} />)}
                        </BurgerCategory>
                    );
                })}
            </div>
        </>
    );
}

export default BurgerIngredients;