import React from "react";
import { Typography } from "@mui/material";

export const CardBox = () => {
  const card = {
    name: "Magic Card Name",
    text: "Magic Card Text",
    collections: ["Collection 1", "Collection 2"],
    rarity: "Rare",
    colors: ["Red", "Blue"],
    type: "Creature",
    legality: "Legal",
  };

  return (
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
};


