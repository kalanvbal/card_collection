import React, { useState, useEffect } from "react";
import "./AjoutCarte.css";
import ListePokemon from "../../components/ListePokemon";
import ListeElement from "../../components/ListeElement";
import { useCartesContext } from "../../hooks/useCartesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const AjoutCarte = () => {
  const { dispatch } = useCartesContext();
  const { user } = useAuthContext();
  const [nom, setNom] = useState("");
  const [vie, setVie] = useState("");
  const [element, setElement] = useState("");
  const [descriptionAttaque1, setDescriptionAttaque1] = useState("");
  const [dommage1, setDommage1] = useState("");
  const [descriptionAttaque2, setDescriptionAttaque2] = useState("");
  const [dommage2, setDommage2] = useState("");
  const [erreur, setErreur] = useState(null);

  const actionAjouter = async (e) => {
    e.preventDefault();
    if (!user) {
      setErreur("Vous devez vous connectez");
      return;
    }
    const elementNeutre = Object.keys(ListeElement)[0];
    const imageNeutre = ListeElement[elementNeutre];

    const carte = {
      nom,
      vie: parseInt(vie),
      element: element || elementNeutre,
      type_attack: {
        description: descriptionAttaque1,
        attack: parseInt(dommage1),
      },
      type_attack2: {
        description: descriptionAttaque2,
        attack: parseInt(dommage2),
      },
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "cartes",
        {
          method: "POST",
          body: JSON.stringify(carte),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setErreur(json.erreur);
      } else {
        setNom("");
        setVie("");
        setElement(elementNeutre);
        setDescriptionAttaque1("");
        setDommage1("");
        setDescriptionAttaque2("");
        setDommage2("");
        setErreur(null);
        const container = document.querySelector(".CBL-ajoutCarte-container");
        if (container) {
          container.style.backgroundImage = `url(${imageNeutre})`;
        }
        console.log("carte ajoute", json);
        dispatch({ type: "CREATE_CARTE", payload: json });
      }
    } catch (erreur) {
      console.error("Error while adding card:", erreur);
    }
  };

  return (
    <div className="CBL-ajoutCarte-container">
      <div className="CBL-ajoutCarte-titre">
        <Nom nom={nom} setNom={setNom} />
        <Vie vie={vie} setVie={setVie} />
        <Element
          ListeElement={ListeElement}
          element={element}
          setElement={setElement}
        />
      </div>
      <div className="CBL-ajoutCarte-image">
        <ImagePokemon text={nom} />
      </div>
      <div className="CBL-ajoutCarte-degats">
        <Degats1 dommage1={dommage1} setDommage1={setDommage1} />
      </div>
      <div className="CBL-ajoutCarte-attaque">
        <DescriptionAttaque1
          description1={descriptionAttaque1}
          setDescription1={setDescriptionAttaque1}
        />
      </div>
      <div className="CBL-ajoutCarte-degats">
        <Degats2 dommage2={dommage2} setDommage2={setDommage2} />
      </div>
      <div className="CBL-ajoutCarte-attaque">
        <DescriptionAttaque2
          description2={descriptionAttaque2}
          setDescription2={setDescriptionAttaque2}
        />
      </div>
      <div className="CBL-ajoutCarte-ajouter">
        <Ajouter boutonAjouter={actionAjouter} />
      </div>
      {erreur && <div>{erreur}</div>}
    </div>
  );
};

const Nom = ({ nom, setNom }) => {
  const handleChange = (e) => {
    setNom(e.target.value.slice(0, 11).replace(/[^a-zA-Z\s]/g, ""));
  };

  return (
    <div>
      <input
        className="CBL-ajoutCarte-nom"
        placeholder="Nom"
        value={nom}
        onChange={handleChange}
      />
    </div>
  );
};

const Vie = ({ vie, setVie }) => {
  const handleChange = (e) => {
    setVie(e.target.value.slice(0, 3).replace(/\D/g, ""));
  };

  return (
    <input
      className="CBL-ajoutCarte-vie"
      type="text"
      placeholder="Vie"
      value={vie}
      onChange={handleChange}
    />
  );
};

const Element = ({ ListeElement, element, setElement }) => {
  const elementNeutre = Object.keys(ListeElement)[0];
  const [selectedOptionElement, setOptionElement] = useState(elementNeutre);

  const handleChangementElement = (event) => {
    const selectedElement = event.target.value;
    setOptionElement(selectedElement);
    setElement(selectedElement);
  };

  useEffect(() => {
    const container = document.querySelector(".CBL-ajoutCarte-container");
    if (container) {
      container.style.backgroundImage = selectedOptionElement
        ? `url(${ListeElement[selectedOptionElement]})`
        : "none";
    }
  }, [selectedOptionElement, ListeElement]);

  const optionElements = Object.keys(ListeElement).map((key) => (
    <option key={key} value={key}>
      {"\u00A0\u00A0\u00A0\u00A0\u00A0" + key}
    </option>
  ));

  return (
    <div>
      <select
        className="CBL-ajoutCarte-element"
        value={selectedOptionElement}
        onChange={handleChangementElement}
      >
        {optionElements}
      </select>
    </div>
  );
};

const ImagePokemon = ({ text }) => {
  return (
    <div>
      {text && ListePokemon[text.toLowerCase()] && (
        <img
          src={ListePokemon[text.toLowerCase()]}
          alt={`${text} Image`}
          className="image-holder"
        />
      )}
    </div>
  );
};

const DescriptionAttaque1 = ({ description1, setDescription1 }) => {
  const placeholder = "Entrez une description de la premier attaque";

  const handleChange = (e) => {
    setDescription1(e.target.value);
  };

  return (
    <textarea
      className="CBL-ajoutCarte-descriptionAttaque"
      maxLength={135}
      value={description1}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

const Degats1 = ({ dommage1, setDommage1 }) => {
  const placeholder = "DM";

  const handleChange = (e) => {
    setDommage1(e.target.value.slice(0, 3).replace(/\D/g, ""));
  };

  return (
    <input
      className="CBL-ajoutCarte-domageDegats"
      type="text"
      placeholder={placeholder}
      value={dommage1}
      onChange={handleChange}
    />
  );
};

const DescriptionAttaque2 = ({ description2, setDescription2 }) => {
  const placeholder = "Entrez une description de la deuxieme attaque";

  const handleChange = (e) => {
    setDescription2(e.target.value);
  };

  return (
    <textarea
      className="CBL-ajoutCarte-descriptionAttaque"
      maxLength={135}
      value={description2}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

const Degats2 = ({ dommage2, setDommage2 }) => {
  const placeholder = "DM";

  const handleChange = (e) => {
    setDommage2(e.target.value.slice(0, 3).replace(/\D/g, ""));
  };

  return (
    <input
      className="CBL-ajoutCarte-domageDegats"
      type="text"
      placeholder={placeholder}
      value={dommage2}
      onChange={handleChange}
    />
  );
};

const Ajouter = ({ boutonAjouter }) => {
  return (
    <button className="CBL-ajoutCarte-boutonAjouter" onClick={boutonAjouter}>
      Ajouter
    </button>
  );
};

export default AjoutCarte;
