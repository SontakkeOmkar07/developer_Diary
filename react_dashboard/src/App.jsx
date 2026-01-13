import React from "react";
import { DevDebug } from "./components/DevDebug";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguagePage } from "./pages/LanguagePage";
import { AppLayout } from "./Layout/AppLayout";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DevDebug />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/language/:language",
    element: <LanguagePage />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
