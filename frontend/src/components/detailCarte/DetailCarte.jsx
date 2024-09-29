import React, { useEffect, useState } from "react";
import "./DetailCarte.css";
import listePokemon from "../ListePokemon";
import listeElement from "../ListeElement";
import { useCartesContext } from "../../hooks/useCartesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const DetailCarte = ({ carte, showDeleteButton }) => {
  const { dispatch } = useCartesContext();
  const { user } = useAuthContext();
  const imagePokemon = listePokemon[carte.nom.toLowerCase()];
  const [backgroundImage, setBackgroundImage] = useState("");
  const [textCouleur, setTextCouleur] = useState("black");

  const supprimerCarte = async () => {
    if (!user) {
      return;
    }
    const reponse = await fetch(
      process.env.REACT_APP_BACKEND_URL + "cartes/" + carte._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await reponse.json();

    if (reponse.ok) {
      dispatch({ type: "DELETE_CARTE", payload: json });
    }
  };

  useEffect(() => {
    const imageCarte = listeElement[carte.element];
    setBackgroundImage(`url(${imageCarte})`);
  }, [carte.element]);

  useEffect(() => {
    if (carte.element === "dark") {
      setTextCouleur("white");
    } else {
      setTextCouleur("black");
    }
  }, [carte.element]);

  const nomEnMinuscules = carte.nom.toLowerCase();
  const nomPokemon =
    nomEnMinuscules.charAt(0).toUpperCase() + nomEnMinuscules.slice(1);

  return (
    <div
      className="CBL-detailCarte-container"
      style={{ backgroundImage: backgroundImage, color: textCouleur }}
    >
      <div className="CBL-detailCarte-titre">
        <p className="CBL-detailCarte-nom">{nomPokemon}</p>
        <p className="CBL-detailCarte-vie">{carte.vie}</p>
      </div>
      <div className="CBL-detailCarte-image">
        {imagePokemon && <img src={imagePokemon} alt={carte.nom} />}
      </div>
      <div className="CBL-detailCarte-degats">
        <p>{carte.type_attack.attack}</p>
      </div>
      <div className="CBL-detailCarte-description">
        <p>{carte.type_attack.description}</p>
      </div>
      <div className="CBL-detailCarte-degats">
        <p>{carte.type_attack2.attack}</p>
      </div>
      <div className="CBL-detailCarte-description">
        <p>{carte.type_attack2.description}</p>
      </div>
      {showDeleteButton && (
        <span
          className="CBL-detailCarte-supprimer"
          onClick={supprimerCarte}
        ></span>
      )}
    </div>
  );
};

export default DetailCarte;
