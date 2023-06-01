import React, { useState, useEffect } from "react";
import axios from 'axios';
import RandomCards from './Components/RandomCards';

export const Catalog = () => {
  const [cards, setCards] = useState([]);

  const getRandomCards = async () => {
    try {
        const response = await axios.get('http://localhost:5000/cards/random', {
            params: {
              count: 5
            }
          });
          console.log("Response data: ", response.data);
          setCards(response.data);   
    } catch (error) {
      console.error("Error fetching random cards:", error);
    }
}

  useEffect(() => {
    getRandomCards();
  }, []);

  return (
    <div>
      <RandomCards cards={cards} />
    </div>
  );
}