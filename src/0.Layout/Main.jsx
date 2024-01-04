import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';

const Main = () => {

    const location = useLocation();
    console.log("location",location)

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('registration') 

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;