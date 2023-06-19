import React, { useEffect, useState } from "react";
import axios from 'axios';
import spanish from "../../../assets/symbols/spain.png";
import english from "../../../assets/symbols/uk.png";
import german from "../../../assets/symbols/germany.png";
import french from "../../../assets/symbols/france.png";
import italian from "../../../assets/symbols/italy.png";
import chinese from "../../../assets/symbols/china.png";
import japanese from "../../../assets/symbols/japan.png";
import portuguese from "../../../assets/symbols/portugal.png";
import sellimage from "../../../assets/sell.png";
import bidimage from "../../../assets/bid.png";


const CardsOnSell = ({ card }) => {
  const [cardsOnSell, setCardsOnSell] = useState([]);

  useEffect(() => {
    const fetchCardsOnSell = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cards/searchSelled/?name=${card}`);
        setCardsOnSell(response.data);
      } catch (error) {
        console.error('Error al obtener las cartas en venta:', error);
      }
    };
    fetchCardsOnSell();
  }, [card]
  );

  const getTypeSell = (typesell) => {
    if (typesell === "Venta") {
      return ( <img className= "card-detail-symbol-image" src={sellimage} alt="venta" /> );
    } else {
      return ( <img className= "card-detail-symbol-image" src={bidimage} alt="subasta" /> )
    }
  };

  const getFlag = (lang) => {
    switch (lang) {
        case "es" :
            return <img className= "card-detail-symbol-image" src={spanish} alt="español" />;
        case "en" :
            return <img className= "card-detail-symbol-image" src={english} alt="inglés" />;
        case "fr" :
            return <img className= "card-detail-symbol-image" src={french} alt="francés" />;
        case "de" :
            return <img className= "card-detail-symbol-image" src={german} alt="alemán" />;
        case "it" :
            return <img className= "card-detail-symbol-image" src={italian} alt="italiano" />;
        case "zh" :
            return <img className= "card-detail-symbol-image" src={chinese} alt="chino" />;
        case "ja" :
            return <img className= "card-detail-symbol-image" src={japanese} alt="japonés" />;
        case "pt" :
            return <img className= "card-detail-symbol-image" src={portuguese} alt="portugués" />;
        default:
            return null;
    }
  };

  const getStatus = (status) => {
    switch (status) {
        case "new" :
            return <span span className="status-new">Nueva</span>;
        case "almost_new" :
            return <span span className="status-almost_new">Casi nueva</span>;
        case "excellent" :
            return <span span className="status-excellent">Excelente</span>;
        case "good" :
            return <span span className="status-good">Buena</span>;
        case "lightly_played" :
            return <span span className="status-lightly_played">Ligeramente jugada</span>;
        case "played" :
            return <span span className="status-played">Jugada</span>;
        case "poor" :
            return <span span className="status-poor">Pobre</span>;
       default:
            return null;
    }
  };

  return (
    <div>
      <h2>Cartas en Venta</h2>
      <table className="card-table">
        <thead>
          <tr>
            <th>Colección</th>
            <th>Idioma</th>
            <th>Foil</th>
            <th>Estado</th>
            <th>Venta / Subasta</th>
            <th>Precio</th>
            <th>Fin de la Subasta</th>
          </tr>
        </thead>
        <tbody>
          {cardsOnSell.map((card) => (
            <tr key={card._id}>
              <td>{card.set_name}</td>
              <td>{getFlag(card.lang)}</td>
              <td>{card.foil ? "Sí" : "No"}</td>
              <td>{getStatus(card.status)}</td>
              <td>{getTypeSell(card.type_sell)}</td>
              <td>{card.price} €</td>
              <td>{card.end_of_bid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardsOnSell;
