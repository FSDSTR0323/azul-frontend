import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { symbolImages } from "./symbolImages";

export const CardBox = () => {
  const [card, setCard] = useState(null);

  ////OBTENER INFO DE LA CARTA ACTUAL
  useEffect(() => {
    const url = window.location.href; // obtenemos la URL actual en la que estamos para posteriormente extraer el ID
    const cardId = url.substring(url.lastIndexOf("/") + 1); // con esto extraemos el ID
    // Realizamos una solicitud al backend para obtener los detalles de la carta
    fetch(`http://localhost:5000/cards/${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        setCard(data); // actualizamos el estado de la carta
        console.log('data es:', data);
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
  const symbolRegex = /\{0\}|\{1\}|\{2\}|\{3\}|\{4\}|\{5\}|\{6\}|\{7\}|\{8\}|\{9\}|\{10\}|\{11\}|\{12\}|\{13\}|\{14\}|\{15\}|\{16\}|\{17\}|\{18\}|\{19\}|\{20\}|\{U\}|\{T\}|\{B\}|\{UB\}|\{G\}/g;
  const parts = text.split(symbolRegex); // dividimos el texto en varias partes, separado por los simbolos
  const matches = text.match(symbolRegex); // se utiliza match, para obtener los simbolos que haya en el texto
  console.log ('parts es:' , parts)
  console.log ('matches es:',matches)
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


 

    return (
      <div className="card-detail-box">
        <img
          className="card-detail-image"
          src={card.image_uris.normal}
          alt={card.name}
    />
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
            Rarity: {card.rarity}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Colors: {card.colors.join(", ")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Type: {card.type_line}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Legalities: <br/>
              Standard: {card.legalities.standard}<br/>
              Pioneer: {card.legalities.pioneer}<br/>
              Modern: {card.legalities.modern}<br/>
              Legacy: {card.legalities.legacy}<br/>
              Pauper: {card.legalities.pauper}<br/>
              Vintage: {card.legalities.vintage}<br/>
              Commander: {card.legalities.commander}<br/>
              Brawl: {card.legalities.brawl}<br/>
          </Typography>
        </div>
      </div>
    );
  };



