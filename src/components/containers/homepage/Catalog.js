import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Catalog = () => {
  const [cards, setCards] = useState([]);

  const getRandomCards = async () => {
    try {
        const response = await axios.get('http://localhost:5000/cards/random', {
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
  }, []);

  return (
    <div className="randomcard-section-wrapper">
      <div className="randomcard-section-main">
        {cards.map((data) => (
          <div className="randomcard-section-info" key={data.name}>
            <div className="info-boxes-img-container">
              <a href={`http://localhost:3000/carddetail/${data._id}`}>
                <img className="card-image" src={data.normalImageUrl} alt="" />
              </a>  
            </div>
            <h2>{data.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}