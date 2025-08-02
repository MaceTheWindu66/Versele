import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ]


  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
