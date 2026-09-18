import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
 <RouterProvider router={router}></RouterProvider>
    </BrowserRouter>
  </StrictMode>,
)
