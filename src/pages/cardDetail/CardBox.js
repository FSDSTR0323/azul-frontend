import React, { useEffect, useState, useContext } from "react";
import { Typography } from "@mui/material";
import { symbolImages } from "./symbolImages";
import  SellMenu  from "./SellMenu"
import { CardContext } from '../../contexts/CardContext';




export const CardBox = () => {
  const [card, setCard] = useState(null);  // carta actual
  const [allCards, setAllCards] = useState(null); // todas las cartas con el mismo nombre
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const { cardIdChangeDummy, setCardIdChangeDummy } = useContext(CardContext)
  //const [selectedCard, setSelectedCard]  = useState(null);
  ////OBTENER INFO DE LA CARTA ACTUAL
  useEffect(() => {
    const url = window.location.href; // obtenemos la URL actual en la que estamos para posteriormente extraer el ID
    const cardId = url.substring(url.lastIndexOf("/") + 1); // con esto extraemos el ID
    console.log(cardId)

    // Realizamos una solicitud al backend para obtener los detalles de la carta
    fetch(`${process.env.REACT_APP_BASE_URL}/cards/${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        setCard(data.selectedCardBack); // carta actual
        setAllCards(data.sameCardsBack) // todas las cartas con ese nombre
      })
            .catch((error) => {
        console.error("Error al obtener los detalles de la carta:", error);
      });     
    
  }, [cardIdChangeDummy]);

  if (!card) {
    return <div>Cargando...</div>; // mostrara este mensaje mientras esperamos respuesta del backend
  }

//console.log('Esta es la carta actual:', card.name, card.set_name)
//console.log('Esta es otra carta con el mismo nombre:', allCards[0].name, allCards[0].set_name)
//console.log('tamaño de allcards:', allCards.length)

//Funcion para ver las cartas siguiente y anterior en diferente colecciones
const cardInCollec = (allCards)=>{
  if (allCards.length >= 2) {
    const handleNextCard = () => {
      const nextIndex = (currentIndex + 1) % allCards.length;
      const prevIndex = (currentIndex - 1 + allCards.length) % allCards.length;
      setCurrentIndex(nextIndex);
      setPreviousIndex(prevIndex);
    };
    const handlePreviousCard = () => {
      const prevIndex = (currentIndex - 1 + allCards.length) % allCards.length;
      setCurrentIndex(prevIndex);
    };    
    const nextCard = allCards[currentIndex];
    return (
      <div>
      <button className="sell-button" onClick={handlePreviousCard}>←</button>
      <img className="card-detail-image" src={nextCard.image_uris.normal} alt={nextCard.name} />
      <button className="sell-button" onClick={handleNextCard}>→</button> 
      <div className="card-detail-counter">{`${currentIndex + 1}/${allCards.length}`}</div>
           
    </div>
    );
  }else{
    return (
            <div>
      <img className="card-detail-image" src={card.image_uris.normal} alt={card.name} />
    </div>
    );
  };

};

//Funcion para reemplazar los símbolos de texto por su correspondiente imagen
  const replaceSymbols = (text) => {
  const symbolRegex = /\{[^{}]+\}/g;
  const parts = text.split(symbolRegex); // dividimos el texto en varias partes, separado por los simbolos
  const matches = text.match(symbolRegex); // se utiliza match, para obtener los simbolos que haya en el texto
  //con reduce, construye un nuevo array con todas las nuevas partes
  return parts.reduce((acc, part, index) => { //acc: acumulador , part: parte actual, index: indice
    acc.push(<React.Fragment key={index}>{part}</React.Fragment>); //agrega la primera parte
    if (matches && matches[index]) { // verifica si la parte actual es un simbolo
      const match = matches[index];
      if (symbolImages.hasOwnProperty(match)) {
        acc.push(<img className= "card-detail-symbol-image" key={`${index}-image`} src={symbolImages[match]} alt={match} />);
      } else {
        acc.push(match);
      }
    }
    return acc;
  }, []);
  };


  // Función para determinar el color de fondo de la celda según la legalidad
  const getLegalitiesCellStyle = (legalities) => {
    if (legalities === "legal") {
      return { backgroundColor: "green" };
    } else {
      return { backgroundColor: "gray" };
    }
  };

    // Función para poner el símbolo según rareza
  const getRarityColor = (rarity) => {
      switch (rarity) {
        case "common":
          return <span className="rarity-common">Common</span>;
        case "uncommon":
          return <span className="rarity-uncommon">Uncommon</span>;
        case "rare":
          return <span className="rarity-rare">Rare</span>;
        case "mythic":
          return <span className="rarity-mythic">Mythic</span>;
        default:
          return null;
      }
  };

//Función para obtener los colores de la carta
  const renderColorSymbols = (colors) => {
      return colors.map((color, index) => (
        <img
          className="card-detail-symbol-image"
          key={index}
          src={symbolImages[`{${color}}`]}
          alt={color}
        />
      ));
  };
         

  return (
    <div className="card-detail-box">
      <div className="card-detail-and-image">
      <div className="card-detail-image-container">
      {cardInCollec(allCards)}
      </div>  
      <div className="card-detail-content">
        <Typography variant="h5" component="h2" gutterBottom>
          {card.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {replaceSymbols(card.oracle_text)}
        </Typography>
        <Typography variant="body2" gutterBottom>
        Collection: {allCards[currentIndex].set_name} {/* Mostrar el set_name de la carta actual */}
        </Typography>
        <Typography variant="body2" gutterBottom>
            Rarity: {getRarityColor(card.rarity)}
        </Typography>
        <Typography variant="body2" gutterBottom>
            Colors: {renderColorSymbols(card.colors)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Type: {card.type_line}
        </Typography>
        <Typography variant="body2" gutterBottom>
        Legalities:
        <table>
          <tbody>
            <tr>
              <td style={getLegalitiesCellStyle(card.legalities.standard)}>Standard</td>
              <td style={getLegalitiesCellStyle(card.legalities.pioneer)}>Pioneer</td>
            </tr>
            <tr>
              <td style={getLegalitiesCellStyle(card.legalities.modern)}>Modern</td>
              <td style={getLegalitiesCellStyle(card.legalities.legacy)}>Legacy</td>
            </tr>
            <tr>
              <td style={getLegalitiesCellStyle(card.legalities.pauper)}>Pauper</td>
              <td style={getLegalitiesCellStyle(card.legalities.vintage)}>Vintage</td>
            </tr>
            <tr>
              <td style={getLegalitiesCellStyle(card.legalities.commander)}>Commander</td>
              <td style={getLegalitiesCellStyle(card.legalities.brawl)}>Brawl</td>
            </tr>
          </tbody>
        </table>
        
        </Typography>
      </div>
      </div>
      <div>
      <SellMenu card={allCards[currentIndex]}/>
      {/*<CardsOnSell card={card.name}/>*/}
      </div>
      
  </div>
  );
  };



