import React, { useEffect, useState } from "react";
import axios from 'axios';
import sellimage from "../../../assets/sell.png";
import bidimage from "../../../assets/bid.png";
import buyimage from "../../../assets/buy.png";
import moment from 'moment';
import { authorizationConfig } from "../../../security";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Filter } from './filter'
import { getFlag } from '../../../utils/languageToFlag'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';




const CardsOnSell = ({ card }) => {

  const navigate = useNavigate()

  const [cardsOnSell, setCardsOnSell] = useState([]);
  const [filters, setFilters] = useState({
    collection: ["Todas"],
    language: ["Todos"],
    type: "",
  })
  const [filteredCardsOnSell, setFilteredCardsOnSell] = useState([])

  useEffect(() => {

    const fetchCardsOnSell = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cards/searchSelled/?name=${card}`);
        setCardsOnSell(response.data);
      } catch (error) {
        console.error('Error al obtener las cartas en venta:', error);
      }
    };
    fetchCardsOnSell()
  }, [card] );

  useEffect(() => {

    let filteredCards = cardsOnSell

    console.log("variable de cartas a filtrar", filteredCards)

    console.log("los filtros son", filters)
        
    if(filters.collection.length === 1 && filters.collection[0] === "Todas") {
      console.log("Se deben mostrar todas las cartas")
    } else if (filters.collection !== undefined) {
      console.log("Las colecciones a filtrar son", filters.collection)
      filteredCards = filteredCards.filter(card => {
        return filters.collection.includes(card.set_name)
      })
    }

    if(filters.language.length === 1 && filters.language[0] === "Todos") {
      console.log("Se deben mostrar todas las cartas")
    } else if (filters.language !== undefined) {
      console.log("Las colecciones a filtrar son", filters.language)
      filteredCards = filteredCards.filter(card => {
        return filters.language.includes(card.lang)
      })
    }

    if(filters.type !== "" && filters.type !== null) {
      filteredCards = filteredCards.filter(card => {
        return card.type_sell === filters.type
      })
    }
    
    setFilteredCardsOnSell(filteredCards)

  }, [filters, cardsOnSell])

  const getTypeSell = (typesell) => {
    if (typesell === "Venta") {
      return ( <img className= "card-detail-symbol-image" src={sellimage} alt="venta" /> );
    } else {
      return ( <img className= "card-detail-symbol-image" src={bidimage} alt="subasta" /> )
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
  

  const [sortedPrice, setSortedPrice] = useState("-")

  const handleSortList = (filteredCardsOnSell) => {
    console.log("Las cartas sin ordenar son", filteredCardsOnSell)
    if(filteredCardsOnSell[0].price < filteredCardsOnSell[filteredCardsOnSell.length -1].price) {
      setFilteredCardsOnSell([...filteredCardsOnSell].sort((a, b) => a.price - b.price ))
      setSortedPrice("asc")
    } else {
      setFilteredCardsOnSell([...filteredCardsOnSell].sort((a, b) =>  b.price - a.price))
      setSortedPrice("desc")
    }    
  }


  return (

    <div className="cards-list">
      <Filter cardsOnSell={cardsOnSell} filters={filters} setFilters={setFilters}/>
      <div>
      <h2>Cartas en Venta</h2>
      <table className="card-table">
        <thead>
          <tr>
            <th className="column-names">Colección</th>
            <th className="column-names">Idioma</th>
            <th className="column-names">Foil</th>
            <th className="column-names">Estado</th>
            <th className="column-names">Venta / Subasta</th>
            <th className="column-names">
              Precio {
                sortedPrice === "asc" ? <ArrowDownwardIcon className="column-names-icon" cursor="pointer" onClick={() => handleSortList(filteredCardsOnSell)}/> : 
                sortedPrice === "desc" ? <ArrowUpwardIcon className="column-names-icon" cursor="pointer" onClick={() => handleSortList(filteredCardsOnSell)}/> : 
                <HorizontalRuleIcon className="column-names-icon" cursor="pointer" onClick={() => handleSortList(filteredCardsOnSell)}/>
              }
            </th>
            <th className="column-names">Fin de la Subasta</th>
            <th className="column-names">Usuario</th>
            <th className="column-names">Comprar</th>
          </tr>
        </thead>
        <tbody>
          {filteredCardsOnSell.map((card) => (
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
    </div>
  );
};

export default CardsOnSell;
