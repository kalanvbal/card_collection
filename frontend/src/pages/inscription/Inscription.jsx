import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInscription } from "../../hooks/useInscription";
import "./Inscription.css";

const Inscription = () => {
  return (
    <div className="CBL-inscription-body">
      <div className="CBL-inscription-container">
        <div className="CBL-inscription-intro">
          <MessageBienvenue />
          <Connexion />
        </div>
        <div className="CBL-inscription-form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const MessageBienvenue = () => {
  return <h4 className="CBL-inscription-bienvenue">Bienvenue!</h4>;
};

const Connexion = () => {
  return (
    <div>
      <p className="CBL-inscription-connexion">Vous avez déjà un compte?</p>
      <Link className="CBL-inscription-connexionLien" to="/">
        Connectez-vous ici
      </Link>
    </div>
  );
};
const LoginForm = () => {
  const [montrerMDP, setAffichageMDP] = useState(true);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");
  const [couleur, setCouleur] = useState("white");
  const [nbCartes, setNbCartes] = useState(0);

  const { inscription, error, isLoading } = useInscription();

  const affichageMDP = () => {
    setAffichageMDP((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await inscription(prenom, nom, courriel, password, couleur, nbCartes);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="CBL-inscription-titre">Inscription</h1>
      <div className="CBL-inscription-prenom">
        <input
          type="text"
          name="name"
          id="nom"
          className="CBL-inscription-textBox"
          placeholder="Entrez votre Prénom"
          onChange={(e) => setPrenom(e.target.value)}
          value={prenom}
        />
      </div>
      <div className="CBL-inscription-nom">
        <input
          type="text"
          name="familyname"
          id="nomDF"
          className="CBL-inscription-textBox"
          placeholder="Entrez votre Nom"
          onChange={(e) => setNom(e.target.value)}
          value={nom}
        />
      </div>
      <div className="CBL-inscription-email">
        <input
          type="email"
          name="email"
          id="email"
          className="CBL-inscription-textBox"
          placeholder="Entrez votre Courriel"
          onChange={(e) => setCourriel(e.target.value)}
          value={courriel}
        />
      </div>
      <div className="CBL-inscription-motPasse">
        <input
          type={montrerMDP ? "password" : "text"}
          name="password"
          id="password"
          className="CBL-inscription-textBox"
          placeholder="Entrez votre Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="CBL-inscription-cacher">
        <input
          type="checkbox"
          name="remember"
          id="remember"
          className="CBL-inscription-checkBox"
          checked={montrerMDP}
          onChange={affichageMDP}
        />
        <label htmlFor="remember">Cacher le mot de passe</label>
      </div>
      <div className="CBL-inscription-lien">
        <button className="CBL-inscription-button" disabled={isLoading}>
          S'inscrire
        </button>
        {error && <div className="CBL-inscription-error">{error}</div>}
      </div>
    </form>
  );
};

export default Inscription;
