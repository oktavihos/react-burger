import React from "react";
import { useAppSelector } from "./store";
import { Navigate, useLocation } from "react-router";
import LoaderPage from "../components/loader-page";
import RoutesList from "./routes";

const ProtectedRoute: React.FC<{children: React.ReactElement, onlyUnAuth?: boolean}> = ({children, onlyUnAuth = false}) => {

    const { isLoading } = useAppSelector(state => state.profile.requests.getUser);
    const isAuth = useAppSelector(state => state.profile.isAuth);
    const location = useLocation();

    if(onlyUnAuth && isAuth){
        const { from } = location.state || {from : {pathname: '/'}};
        return <Navigate to={from} />
    }

    if(!onlyUnAuth && !isAuth){
        return <Navigate to={RoutesList.LOGIN} replace state={{from: location}} />
    }

    return isLoading ? <LoaderPage /> : children;
}

export default ProtectedRoute;