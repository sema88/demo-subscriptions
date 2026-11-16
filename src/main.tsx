import React from 'react';
import{createRoot}from'react-dom/client';
import Storefront from './storefront';
import './globals.css';
createRoot(document.getElementById('root')!).render(<Storefront/>);