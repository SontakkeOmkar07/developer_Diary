import React from 'react'
import { DevDebug } from './components/DevDebug'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguagePage } from './pages/LanguagePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <DevDebug />,
  },


  {
    path: '/language/:language',
    element: <LanguagePage />


  }

]);


const App = () => {
  return (
    <>


      <RouterProvider router={router}></RouterProvider>




    </>
  )
}

export default App