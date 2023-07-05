import React from 'react';
import { TConstructorAction, TConstructorState } from '../store/burger-constructor/types';

export const BurgerConstructorContext = React.createContext<
    Partial<{
        constructorState: TConstructorState,
        constructorDispatch: React.Dispatch<TConstructorAction>
    }>
>({});