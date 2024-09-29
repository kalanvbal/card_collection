import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useConnexion = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const connexion = async (courriel, password) => {
    setIsLoading(true);
    setError(null);

    const reponse = await fetch(
      process.env.REACT_APP_BACKEND_URL + "users/connexion",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courriel, password }),
      }
    );
    const json = await reponse.json();
    console.log(json);
    if (!reponse.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (reponse.ok) {
      const userData = { ...json, email: courriel };
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch({ type: "CONNEXION", payload: userData });
      setIsLoading(false);
    }
  };
  return { connexion, isLoading, error };
};
