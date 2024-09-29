import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CartePrimeur.css";
import DetailCarte from "../../components/detailCarte/DetailCarte";
import cartesData from "../../data/cartesListe";

const Collection = () => {
  const [cartes, setCartes] = useState(null);

  useEffect(() => {
    setCartes(cartesData);
  }, []);

  return (
    <div className="CBL-cartePrimeur-container">
      <Link className="CBL-cartePrimeur-retour" to="/">
        Retour
      </Link>
      <div className="CBL-cartePrimeur-cartes">
        {cartes &&
          cartes.map((carte) => (
            <div key={carte._id} className="CBL-cartePrimeur-carte">
              <DetailCarte carte={carte} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Collection;
