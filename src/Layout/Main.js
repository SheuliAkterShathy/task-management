import React from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from '../Componets/Footer';
import Navbar from '../Componets/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Main;