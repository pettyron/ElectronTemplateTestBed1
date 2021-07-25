import React from "react";

interface Props {
    title?: string;
}

export const MainView: React.FC<Props> = ({ title }) => {
    return (
        <div>
            {title ? <h1>{title}</h1> : null}
            <p>This is the Electron Template. Scaffold React Elements and Data to fill out the project.</p>
        </div>
    );
}
