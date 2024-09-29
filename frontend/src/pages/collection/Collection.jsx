import React, { useEffect, useState } from "react";
import "./Collection.css";
import DetailCarte from "../../components/detailCarte/DetailCarte";
import { useCartesContext } from "../../hooks/useCartesContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Collection = () => {
  const { cartes, dispatch } = useCartesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCartes = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "cartes",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CARTE", payload: json });
      }
    };
    if (user) {
      fetchCartes();
    }
  }, [dispatch, user]);

  return (
    <div className="CBL-collection-body">
      <div className="CBL-collection-container">
        <div className="CBL-collection-cartes">
          {cartes &&
            cartes.map((carte) => (
              <div key={carte._id} className="CBL-collection-carte">
                <DetailCarte
                  key={carte._id}
                  carte={carte}
                  showDeleteButton={true}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
