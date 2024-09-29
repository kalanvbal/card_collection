import React, { useEffect, useState } from "react";
import "./DetailUser.css";

const DetailUser = ({ user }) => {
  const [couleurIcon, setCouleurIcon] = useState("white");

  var prenomInitial = user.prenom.charAt(0).toUpperCase();
  var nomInitial = user.nom.charAt(0).toUpperCase();

  useEffect(() => {
    if (user.couleur) {
      setCouleurIcon(user.couleur);
    } else {
      setCouleurIcon("white");
    }
  }, [user.couleur]);

  return (
    <div className="CBL-detailUser-container">
      <div className="CBL-detailUser-icon">
        <p
          className="CBL-detailUser-initial"
          style={{ backgroundColor: couleurIcon }}
        >
          {prenomInitial}
          {nomInitial}
        </p>
      </div>
      <div className="CBL-detailUser-id">
        <p className="CBL-detailUser-user">Nombre de carte: {user.nbCartes}</p>
        <p className="CBL-detailUser-user">
          {user.prenom} {user.nom}
        </p>
      </div>
    </div>
  );
};

export default DetailUser;
