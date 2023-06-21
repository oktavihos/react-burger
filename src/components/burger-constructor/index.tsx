import { useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerConstructorProps } from './types';
import { TObjectKey } from '../../global-types';

const BurgerConstructor = ({data = []}: TBurgerConstructorProps) => {

    const [current, setCurrent] = useState<string>('bun');
    const dataSort = useMemo(() => data.sort((a, b) => a.type.localeCompare(b.type)), [data]);
    const categories: TObjectKey<string> = {bun: 'Булки', sauce: 'Соусы', main: 'Начинки'};

    return (
        <section className='ml-4 mr-4'>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div style={{ display: 'flex' }} className='mb-10'>
                {Object.keys(categories).map(categoryKey => {
                    let title = categories[categoryKey];
                    return (
                        <Tab value={categoryKey} active={current === categoryKey} onClick={setCurrent}>
                            {title}
                        </Tab>
                    );
                })}
            </div>
            {dataSort.map(item => {
                return (
                    item.calories
                );
            })}
        </section>
    );
}

export default BurgerConstructor;