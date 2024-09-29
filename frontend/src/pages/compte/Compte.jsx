import React, { useState, useEffect } from "react";
import "./Compte.css";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Compte = () => {
  const [formData, setFormData] = useState({});
  const { user } = useAuthContext();
  const { fetchUser, updateUser, isLoading, error } = useUserContext();
  const [matchedUser, setMatchedUser] = useState(null); // Define matchedUser state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUser();
        const currentUserEmail = user.courriel;
        const matchedUser = userData.find(
          (user) => user.courriel === currentUserEmail
        );

        if (matchedUser) {
          setMatchedUser(matchedUser); // Set matchedUser state
          setFormData({
            prenom: matchedUser.prenom || "",
            nom: matchedUser.nom || "",

            couleur: matchedUser.couleur || "",
          });
        } else {
          console.error("User avec ce courriel non trouve:", currentUserEmail);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (userId) => {
    try {
      await updateUser(userId, formData);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="CBL-compte-body">
      <div className="CBL-compte-container">
        <div className="user-details">
          <h1 className="CBL-compte-titre">Vos données</h1>
          <FormField
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
          <FormField
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />

          <div className="CBL-compte-detail">
            <label>Couleur:</label>
            <select
              className="input-select"
              name="couleur"
              value={formData.couleur}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="white">Blanc</option>
              <option value="blue">Bleu</option>
              <option value="red">Rouge</option>
              <option value="yellow">Jaune</option>
              <option value="green">Vert</option>
              <option value="purple">Mauve</option>
            </select>
          </div>
          <div>
            <button onClick={() => handleSubmit(matchedUser._id)}>
              Confirmer
            </button>
          </div>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type = "text", value, onChange }) => (
  <div className="CBL-compte-detail">
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={onChange} />
  </div>
);

export default Compte;
