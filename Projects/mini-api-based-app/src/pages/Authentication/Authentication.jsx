import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Detail from '../../pages/Detail/Detail';
import ROUTES from '../../consts/Routes';

// Component voor authenticatie
const Authentication = () => {
    return (
        <Routes>
            {/* Route voor de Home pagina */}
            <Route path={ROUTES.home} element={<Home />} />
            
            {/* Route voor de Detail pagina */}
            <Route path={ROUTES.detail.path} element={<Detail />} />
            
            {/* Route voor elke andere URL, navigeert naar de notFound pagina */}
            <Route path="*" element={<Navigate to={ROUTES.notFound} />} />
        </Routes>
    );
};

export default Authentication;
