import React from "react";
import { hot } from "react-hot-loader/root";

interface Props {
    title?: string;
}

export const MainView: React.FC<Props> = () => {
    return (
        <div>
            <div>I am Main</div>
        </div>
    );
}

export const AppRoot = hot(MainView);
