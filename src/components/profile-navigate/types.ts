import { MouseEvent } from "react";

export type TProfileNavigateProps = {
    extraClass?: string,
    logoutHandler: (e: MouseEvent<HTMLAnchorElement>) => void
};