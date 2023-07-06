import React from 'react';
import { TIngredientsAction, TIngredientsState } from '../store/burger-ingredients/types';

export const BurgerIngredientsContext = React.createContext<
    Partial<{
        ingredientsState: TIngredientsState,
        ingredientsDispatch: React.Dispatch<TIngredientsAction>
    }>
>({});