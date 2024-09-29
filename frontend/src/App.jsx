import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Connexion from "./pages/connexion/Connexion";
import Inscription from "./pages/inscription/Inscription";
import RootLayout from "./containers/Roots";
import AjoutCarte from "./pages/ajoutCarte/AjoutCarte";
import Collection from "./pages/collection/Collection";
import Compte from "./pages/compte/Compte";
import Communaute from "./pages/communaute/Communaute";
import CartePrimeur from "./pages/cartePrimeur/CartePrimeur";

const App = () => {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: !user ? <Connexion /> : <Navigate to="/collection" />,
        },
        {
          path: "inscription",
          element: !user ? <Inscription /> : <Navigate to="/collection" />,
        },
        {
          path: "ajoutCarte",
          element: user ? <AjoutCarte /> : <Navigate to="/" />,
        },
        {
          path: "collection",
          element: user ? <Collection /> : <Navigate to="/" />,
        },
        {
          path: "compte",
          element: user ? <Compte /> : <Navigate to="/" />,
        },
        {
          path: "communaute",
          element: user ? <Communaute /> : <Navigate to="/" />,
        },
        {
          path: "cartePrimeur",
          element: !user ? <CartePrimeur /> : <Navigate to="/collection" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
