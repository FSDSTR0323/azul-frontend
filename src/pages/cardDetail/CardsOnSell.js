import React, { useEffect, useState } from "react";
import axios from 'axios';
import sellimage from "../../assets/sell.png";
import bidimage from "../../assets/bid.png";
import buynowimage from "../../assets/buynow.png";
import buyimage from "../../assets/buy.png";
import moment from 'moment';
import { authorizationConfig } from "../../security";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Filter } from './filter'
import { getFlag } from '../../utils/languageToFlag'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';





const CardsOnSell = ({ card }) => {

  const navigate = useNavigate()
  const [keyUpdate, setKeyUpdate] = useState(0);
  const [count, setCount] = useState(null);


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
    }

    fetchCardsOnSell()
  }, [card, keyUpdate] ); 

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
      const userDataRes = await axios.get("http://localhost:5000/profile", authorizationConfig.getHeaders())
      console.log('estoy en el try de onclickbuy')
      let cardBuyedData = {
        _id: card._id,
        buyer: userDataRes.data._id,
      };
      console.log('cardBuyedData es:', cardBuyedData)
      await axios.post("http://localhost:5000/cards/buycard", cardBuyedData, authorizationConfig.getHeaders())
      
        console.log('Carta comprada:', cardBuyedData)
        setKeyUpdate(keyUpdate + 1); 
              
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

  const onClickCart = async (card) => {
    try {
      console.log("llamamos al token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", authorizationConfig.getHeaders())
      const userDataRes = await axios.get("http://localhost:5000/profile", authorizationConfig.getHeaders())
      console.log('estoy en el try de onclickcart')
      let cardOnCartData = {
        _id: card._id,
        onCart: userDataRes.data._id,
      };
      console.log('cardOnCartData es:', cardOnCartData)
      const cardsOnCart = await axios.post("http://localhost:5000/cards/oncartcard", cardOnCartData, authorizationConfig.getHeaders())
      console.log("que devuleeeeeeeeeeeeeeeeeeee", cardsOnCart)
        console.log('Carta comprada:', cardOnCartData)
        setKeyUpdate(keyUpdate + 1); 
        
        try {
          const userDataRes = await axios.get('http://localhost:5000/profile', authorizationConfig.getHeaders());
          const count = userDataRes.data.on_cart.length;
          console.log("La cuenta es:", count);
          setCount(count);
          window.localStorage.setItem('carro', count.toString());
          window.dispatchEvent(new Event('carroChanged'));
          

        } catch (error) {
          console.log('Error:', error);
        }

      // window.localStorage.setItem("cardsOnCart", )
     
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
    console.log("el precio de la pimera carta es", filteredCardsOnSell[0].price)
    console.log("el precio de la última carta es", filteredCardsOnSell[filteredCardsOnSell.length -1].price)
    if(filteredCardsOnSell[0].price > filteredCardsOnSell[filteredCardsOnSell.length -1].price) {
      setFilteredCardsOnSell([...filteredCardsOnSell].sort((a, b) => a.price - b.price ))
      setSortedPrice("asc")
      console.log("Se ordena de forma ascendente")
    } else {
      setFilteredCardsOnSell([...filteredCardsOnSell].sort((a, b) =>  b.price - a.price))
      setSortedPrice("desc")
      console.log("Se ordena de forma descendente")
    }    
  }


  return (
    <div className="cards-list">
      <Filter cardsOnSell={cardsOnSell} filters={filters} setFilters={setFilters} />
      <div>
        <h2>Cartas en Venta</h2>
        <div className="card-grid">
          <div className="grid-header">Colección</div>
          <div className="grid-header">Idioma</div>
          <div className="grid-header">Foil</div>
          <div className="grid-header">Estado</div>
          <div className="grid-header">Venta / Subasta</div>
          <div className="grid-header">Precio
            {sortedPrice === "asc" ? (
              <ArrowDownwardIcon className="column-names-icon" cursor="pointer" onClick={() => handleSortList(filteredCardsOnSell)} />
            ) : sortedPrice === "desc" ? (
              <ArrowUpwardIcon className="column-names-icon" cursor="pointer" onClick={() => handleSortList(filteredCardsOnSell)} />
            ) : (
              <HorizontalRuleIcon className="column-names-icon" cursor="pointer" onClick={() => handleSortList(filteredCardsOnSell)} />
            )}
          </div>
          <div className="grid-header">Fin de la Subasta</div>
          <div className="grid-header">Usuario</div>
          <div className="grid-header">Comprar</div>
          <div className="grid-header">Añadir</div>
  
          {filteredCardsOnSell.map((card) => (
            <React.Fragment key={card._id}>
              <div className="grid-content-collection">{card.set_name}</div>
              <div className="grid-content">{getFlag(card.lang)}</div>
              <div className="grid-content">{card.foil ? "Sí" : "No"}</div>
              <div className="grid-content">{getStatus(card.status)}</div>
              <div className="grid-content">{getTypeSell(card.type_sell)}</div>
              <div className="grid-content">{card.price} €</div>
              <div className="grid-content">{getBidDate(card.end_of_bid)}</div>
              <div className="grid-content">{card.user.username}</div>
              <div className="grid-content">
                <button className="buynow-button">
                  <img
                    className="buynow-symbol-image"
                    onClick={() => onClickBuy(card)}
                    src={buynowimage}
                    alt="Comprar"
                  />
                </button>
              </div>
              <div className="grid-content">
                <button className="buy-button">
                  <img
                    className="card-detail-symbol-image"
                    onClick={() => onClickCart(card)}
                    src={buyimage}
                    alt="Añadir"
                  />
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default CardsOnSell;

