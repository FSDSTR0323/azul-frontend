import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Filter } from './filter'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { CardOnSell } from "./CardOnSell";

const CardsOnSell = ({ card }) => {

  
  const [keyUpdate, setKeyUpdate] = useState(0);

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
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cards/searchSelled/?name=${card}`);
        console.log("Las cartas a la venta son", response.data)
        setCardsOnSell(response.data);

      } catch (error) {
        console.error('Error al obtener las cartas en venta:', error);
      }
    }

    fetchCardsOnSell()
  }, [card, keyUpdate] ); 

  useEffect(() => {

    let filteredCards = cardsOnSell
        
    if(filters.collection.length === 1 && filters.collection[0] === "Todas") {
    } else if (filters.collection !== undefined) {
      console.log("Las colecciones a filtrar son", filters.collection)
      filteredCards = filteredCards.filter(card => {
        return filters.collection.includes(card.set_name)
      })
    }

    if(filters.language.length === 1 && filters.language[0] === "Todos") {
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
          {/* <div className="grid-header">Venta / Subasta</div> */}
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
          <div className="grid-header"></div>
          <div className="grid-header"></div>
          {/* <div className="grid-header">Pujar</div> */}

  
          {filteredCardsOnSell.map((card) => {
            console.log("CARTAA", card)
            return (
            <CardOnSell key={card._id} card={card} setKeyUpdate={setKeyUpdate} keyUpdate={keyUpdate} />
            )})
          }
        </div>
      </div>
    </div>
  ); 
};

export default CardsOnSell;

