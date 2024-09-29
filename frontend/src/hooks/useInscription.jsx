import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useInscription = () => {
  const [error, setErreur] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const inscription = async (
    prenom,
    nom,
    courriel,
    password,
    couleur,
    nbCartes
  ) => {
    setIsLoading(true);
    setErreur(null);

    const reponse = await fetch(
      process.env.REACT_APP_BACKEND_URL + "users/inscription",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom,
          nom,
          courriel,
          password,
          couleur,
          nbCartes,
        }),
      }
    );
    const json = await reponse.json();

    if (!reponse.ok) {
      setIsLoading(false);
      setErreur(json.error);
    }
    if (reponse.ok) {
      //sauvegarder user
      localStorage.setItem("user", JSON.stringify(json));
      //updateAuth
      dispatch({ type: "CONNEXION", payload: json });
      setIsLoading(false);
    }
  };
  return { inscription, isLoading, error };
};
