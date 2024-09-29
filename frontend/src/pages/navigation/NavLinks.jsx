import React, { useEffect } from "react";
import "./NavLinks.css";
import { NavLink, useLocation } from "react-router-dom";
import LogoDeconnexion from "../../assets/icon/deconnexion.png";
import LogoCollection from "../../assets/icon/collection.png";
import LogoCommunaute from "../../assets/icon/communaute.png";
import LogoAjout from "../../assets/icon/ajout.png";
import LogoCompte from "../../assets/icon/account.png";
import { useDeconnexion } from "../../hooks/useDeconnexion";

const NavLinks = ({ drawerIsOpen }) => {
  const { deconnexion } = useDeconnexion();

  const handleDeconnexion = () => {
    deconnexion();
  };

  useEffect(() => {
    return () => {
      document.body.style.background = "";
    };
  }, [location]);
  return (
    <ul className={`nav-links ${drawerIsOpen ? "drawer-open" : ""}`}>
      <li>
        <NavLink to="/" onClick={handleDeconnexion}>
          <img src={LogoDeconnexion} alt="Déconnexion" />
          {drawerIsOpen && "Déconnexion"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/communaute">
          <img src={LogoCommunaute} alt="Communaute" />
          {drawerIsOpen && "ㆍCommunauté"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/collection">
          <img src={LogoCollection} alt="Collection" />
          {drawerIsOpen && "ㆍCollection"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/ajoutCarte">
          <img src={LogoAjout} alt="AjoutCarte" />
          {drawerIsOpen && "ㆍAjout"}
        </NavLink>
      </li>
      <li>
        <NavLink to="/compte" className="bas">
          <img src={LogoCompte} alt="Data" />
          {drawerIsOpen && "ㆍMes Données"}
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
