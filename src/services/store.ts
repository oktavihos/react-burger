import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { feedSlice } from './feed/feed-slice';
import { socketMiddleware } from "../middleware/socket-middleware";
import { ordersSlice } from "./orders/orders-slice";

export const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
        .concat(socketMiddleware(feedSlice.actions))
        .concat(socketMiddleware(ordersSlice.actions))
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TAppActions = typeof feedSlice.actions.onClose.name;