import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout/RootLayout';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:"login",
                element:< Login />
            },
            {
                path:"signup",
                element: < Signup />
            }
        ]

    },
    {

    }
])  


