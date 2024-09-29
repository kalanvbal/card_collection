import { CartesContext } from "../context/CartesContext";
import { useContext } from "react";

export const useCartesContext = () => {
  const context = useContext(CartesContext);

  if (!context) {
    throw Error(
      "useCartesContext doit etre utilise dans un CartesContextProvider"
    );
  }

  return context;
};
