import { useState, useMemo, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerIngridientsProps, TCategoriesData } from './types';
import BurgerCategory from './components/burger-category';
import BurgerElement from './components/burger-element';
import ingridientsStyle from './style.module.sass';

const BurgerIngredients: React.FC<TBurgerIngridientsProps> = ({data = [], categories = []}) => {

    const [current, setCurrent] = useState<string>(categories[0].type);
    const observer = useRef<IntersectionObserver | null>(null);
    const titleRef = useRef<(HTMLHeadingElement | null)[]>([])

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

    const categoriesData: TCategoriesData[] = useMemo(() => {
        let result: TCategoriesData[] = [];
        categories.forEach(category => {
            result.push({
                title: category.title,
                type: category.type,
                items: data.filter(item => item.type === category.type)
            });
        });
        return result;
    }, [data, categories]);

    

    const setRefs = (ref: HTMLHeadingElement | null, index: number) => {
        titleRef.current[index] = ref;
    }

    const handleScroll = (index: number) => {
        titleRef.current[index]?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div className={`${ingridientsStyle.tabIngridients} mb-10`}>
                {categories.map((category, index) => {
                    return (
                        <Tab key={category.type} value={category.type} active={current === category.type} onClick={() => handleScroll(index)}>
                            {category.title}
                        </Tab>
                    );
                })}
            </div>
            <div id="scroll-sections" className="scroll mb-10">
                {categoriesData.map((categoryData, index) => {
                    return (
                        <BurgerCategory titleRef={(ref) => setRefs(ref, index)} key={categoryData.type} title={categoryData.title} type={categoryData.type}>
                            {categoryData.items.map(item => <BurgerElement key={item._id} data={item} />)}
                        </BurgerCategory>
                    );
                })}
            </div>
        </>
    );
}

export default BurgerIngredients;