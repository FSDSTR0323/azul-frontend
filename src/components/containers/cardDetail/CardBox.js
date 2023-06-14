import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { symbolImages } from "./symbolImages";
import axios from 'axios'

export const CardBox = () => {
  const [card, setCard] = useState(null);
  const [allCards, setAllCards] = useState(null);
  const [selectedCard, setSelectedCard]  = useState(null);
  ////OBTENER INFO DE LA CARTA ACTUAL
  useEffect(() => {
    const url = window.location.href; // obtenemos la URL actual en la que estamos para posteriormente extraer el ID
    const cardId = url.substring(url.lastIndexOf("/") + 1); // con esto extraemos el ID
    console.log(cardId)

    // Realizamos una solicitud al backend para obtener los detalles de la carta
    fetch(`http://localhost:5000/cards/${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("La data es :---------------", data)
        setCard(data.selectedCard); // actualizamos el estado de la carta
        setAllCards(data.sameCards)
        // (async() => {
        //   const allMatchedCards = await axios.get(`http://localhost:5000/cards/search?name=${data.name}`)
        //   console.log(allMatchedCards)
        //   setAllCards(allMatchedCards)
        //   })()
      })
            .catch((error) => {
        console.error("Error al obtener los detalles de la carta:", error);
      });     
    
  }, []);

  if (!card) {
    return <div>Cargando...</div>; // mostrara este mensaje mientras esperamos respuesta del backend
  }




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
        <div className="card-detail-image-container">
          <img
            className="card-detail-image"
            src={card.image_uris.normal}
            alt={card.name}
          />
        </div>  
        <div className="card-detail-content">
          <Typography variant="h5" component="h2" gutterBottom>
            {card.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {replaceSymbols(card.oracle_text)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Collection: {card.set_name}
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
                <td style={getLegalitiesCellStyle(card.legalities.brawl)}>Commander</td>
              </tr>
            </tbody>
          </table>
          </Typography>
        </div>
    </div>
    );
  };



