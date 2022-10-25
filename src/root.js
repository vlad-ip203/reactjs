import React from 'react';
import {Outlet} from "react-router-dom";

import MainMenu from "./component/nav/MainMenu";


const Root = () => {
    return (
        <>
            <header>
                <MainMenu/>
            </header>

            <Outlet/>

            <footer className='fixed-bottom'>
                <i>It's a footer</i>
            </footer>
        </>
    );
};

export default Root;