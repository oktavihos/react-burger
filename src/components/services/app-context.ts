import React from 'react';
import { TBurgerReducerAction, TBurgerReducerState } from '../app/types';

export const BurgerContext = React.createContext<
    Partial<{
        burgerState: TBurgerReducerState,
        burgerDispatch: React.Dispatch<TBurgerReducerAction>
    }>
>({});