import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout/RootLayout';
import Home from '../pages/Home/Home/Home';

export const Router = createBrowserRouter ([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            }
        ]

    },
    {

    }
])  


