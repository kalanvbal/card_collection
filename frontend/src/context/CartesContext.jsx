import { createContext, useReducer } from "react";

export const CartesContext = createContext();

export const CartesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARTE":
      return {
        cartes: action.payload,
      };
    case "CREATE_CARTE":
      return {
        cartes: [action.payload, ...state.cartes],
      };
    case "DELETE_CARTE":
      return {
        cartes: state.cartes.filter((c) => c._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CartesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartesReducer, {
    cartes: [],
  });

  return (
    <CartesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartesContext.Provider>
  );
};
