import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export const CardBox = () => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const url = window.location.href; // obtenemos la URL actual del frontend
    const cardId = url.substring(url.lastIndexOf("/") + 1); // con esto extraemos el ID
    console.log(cardId)

    // Realizamos una solicitud al backend para obtener los detalles de la carta
    fetch(`http://localhost:5000/cards/${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        setCard(data); // actualizamos el estado de la carta
      })
      
      .catch((error) => {
        console.error("Error al obtener los detalles de la carta:", error);
      });
  }, []);

  if (!card) {
    return <div>Cargando...</div>; // mostrara este mensaje mientras esperamos respuesta del backend
  }

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
          {card.oracle_text}
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
        </Typography>
      </div>
    </div>
  );
};




/*export const CardBox = () => {
  const card = {
    name: "Magic Card Name",
    text: "Magic Card Text",
    collections: ["Collection 1", "Collection 2"],
    rarity: "Rare",
    colors: ["Red", "Blue"],
    type: "Creature",
    legality: "Legal",
  };*/

  /*return (
    <div className="card-detail-box">
      <img className="card-detail-image" src="https://cards.scryfall.io/large/front/2/4/24c0d87b-0049-4beb-b9cb-6f813b7aa7dc.jpg?1685368758" alt="{card.name}" />
      <div className="card-detail-content">
        <Typography variant="h5" component="h2" gutterBottom>
          {card.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {card.text}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Collections: {card.collections.join(", ")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Rarity: {card.rarity}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Colors: {card.colors.join(", ")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Type: {card.type}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Legality: {card.legality}
        </Typography>
      </div>
    </div>
  );
};*/




