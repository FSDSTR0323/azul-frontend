import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


export const Catalog = ({renderCatalog}) => {
  const [cards, setCards] = useState([]);

  const getRandomCards = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cards/random`, {
            params: {
              count: 5
            }
          });
          setCards(response.data);   
    } catch (error) {
      console.error("Error fetching random cards:", error);
    }
}

  useEffect(() => {
    getRandomCards();
  }, [renderCatalog]);

  return (
    <div className="randomcard-section-wrapper">
      <div className="randomcard-section-main">
        {cards.map((data) => (
          <div className="randomcard-section-info" key={data.name}>
            <div className="info-boxes-img-container">
              <Link to={`/carddetail/${data._id}`}>
                <img className="card-image" src={data.normalImageUrl} alt="" />
              </Link>  
            </div>
            <h2>{data.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}