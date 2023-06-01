import React from "react";

const RandomCards = ({ cards }) => {
    console.log ('estas son las cartas:', cards);
  return (
    <div className="randomcard-section-wrapper">
      <div className="randomcard-section-main">
        {cards.map((data) => (
          <div className="randomcard-section-info" key={data.name}>
            <div className="info-boxes-img-container">
            <img className="card-image" src={data.normalImageUrl} alt="" />
            </div>
            <h2>{data.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomCards;