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
import buyimage from "../../../assets/buy.png";
import moment from 'moment';
import { authorizationConfig } from "../../../security";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'



const CardsOnSell = ({ card }) => {
  const navigate = useNavigate()
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

  const getBidDate = (date) => {
    if (date) {
     const formatedDate = moment(date).format('DD/MM/YYYY HH:mm')
     return (formatedDate)
    }else{
      return ('-')
    }
  }

  const onClickBuy = async (card) => {
    try {
      const userDataRes = await axios.get("http://localhost:5000/profile", authorizationConfig)
      console.log('estoy en el try de onclickbuy')
      let cardBuyedData = {
        _id: card._id,
        buyer: userDataRes.data._id,
      };
      console.log('cardBuyedData es:', cardBuyedData)
      await axios.post("http://localhost:5000/cards/buycard", cardBuyedData, authorizationConfig)
      
        console.log('Carta comprada:', cardBuyedData)
      
    } catch (error){
      console.log('Error al comprar la carta en la base de datos', error);
      toast.warning("Para poder comprar cartas necesitas estar conectado, redirigiendo al login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        navigate("/login")
    }

  }
  

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
            <th>Usuario</th>
            <th>Comprar</th>
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
              <td>{getBidDate(card.end_of_bid)}</td>
              <td>{card.user.username}</td>
              <td>
                <button className="sell-button">
                <img
                  className="card-detail-symbol-image"
                  onClick={() => onClickBuy(card)}
                  src={buyimage}
                  alt="Comprar"
                />
                </button>
              </td>



            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardsOnSell;
