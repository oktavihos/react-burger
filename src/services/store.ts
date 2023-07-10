import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { useDispatch } from "react-redux";

export const store = configureStore({reducer: rootReducer});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()