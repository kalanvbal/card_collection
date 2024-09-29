import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useConnexion } from "../../hooks/useConnexion";
import "./Connexion.css";
import "../../index.css";

const Connexion = () => {
  return (
    <div className="CBL-connexion-body">
      <div className="CBL-connexion-container">
        <div className="CBL-connexion-intro">
          <MessageRetour />
          <CartePrimeur />
          <Inscription />
        </div>
        <div className="CBL-connexion-form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const MessageRetour = () => {
  return (
    <h4 className="CBL-connexion-messageRetour">Content de vous revoir!</h4>
  );
};

const CartePrimeur = () => {
  return (
    <div className="CBL-connexion-cartePrimeur">
      <Link className="CBL-connexion-cartePrimeurLien" to="/cartePrimeur">
        Nos cartes à la une
      </Link>
    </div>
  );
};

const Inscription = () => {
  return (
    <div>
      <p className="CBL-connexion-inscription">
        Vous n'avez pas encore de compte?
      </p>
      <Link className="CBL-connexion-inscriptionLien" to="/inscription">
        Cliquez ici pour vous inscrire
      </Link>
    </div>
  );
};

const LoginForm = () => {
  const [montrerMDP, setAffichageMDP] = useState(true);
  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");
  const { connexion, error, isLoading } = useConnexion();

  const affichageMDP = () => {
    setAffichageMDP((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await connexion(courriel, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="CBL-connexion-titre">CONNEXION</h1>
      <div className="CBL-connexion-email">
        <input
          type="text"
          name="email"
          id="email"
          className="CBL-connexion-textBox"
          placeholder="Entrez votre Courriel"
          onChange={(e) => setCourriel(e.target.value)}
          value={courriel}
        />
      </div>
      <div className="CBL-connexion-motPasse">
        <input
          type={montrerMDP ? "password" : "text"}
          name="password"
          id="password"
          className="CBL-connexion-textBox"
          placeholder="Entrez votre Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="CBL-connexion-cacher">
        <input
          type="checkbox"
          name="remember"
          id="remember"
          checked={montrerMDP}
          onChange={affichageMDP}
        />
        <label htmlFor="remember">Cacher le mot de passe</label>
      </div>
      <div className="CBL-connexion-lien">
        <button
          type="submit"
          disabled={isLoading}
          className="CBL-connexion-button"
        >
          Connexion
        </button>
        {error && <div>{error}</div>}
      </div>
    </form>
  );
};

export default Connexion;
