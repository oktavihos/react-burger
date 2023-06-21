import { useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerConstructorProps, TCategoriesData } from './types';
import BurgerCategory from './components/burger-category';
import BurgerElement from './components/burger-element';

const BurgerConstructor = ({data = [], categories = []}: TBurgerConstructorProps) => {

    const [current, setCurrent] = useState<string>(categories[0].type);

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
    }, [data, categories])

    return (
        <>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div style={{ display: 'flex' }} className='mb-10'>
                {categories.map(category => {
                    return (
                        <Tab key={category.type} value={category.type} active={current === category.type} onClick={setCurrent}>
                            {category.title}
                        </Tab>
                    );
                })}
            </div>
            <div className="scroll mb-10">
                {categoriesData.map(categoryData => {
                    return (
                        <BurgerCategory key={categoryData.type} title={categoryData.title} type={categoryData.type}>
                            {categoryData.items.map(item => <BurgerElement key={item._id} data={item} />)}
                        </BurgerCategory>
                    );
                })}
            </div>
        </>
    );
}

export default BurgerConstructor;