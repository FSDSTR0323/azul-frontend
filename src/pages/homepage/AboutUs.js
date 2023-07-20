import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { getFlag } from '../../utils/languageToFlag'
import { Link } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';



export const AboutUs = ({setRenderCatalog, renderCatalog}) => {
    const [lastFiveCards, setLastFiveCards] = useState([]);
    const [buttonClickCount, setButtonClickCount] = useState(0);

    useEffect(() => {
      const fetchLastFiveCards = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cards/getAllOnSell`);
          const sortedByCreatedAt = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const lastFive = sortedByCreatedAt.slice(0, 6);
          setLastFiveCards(lastFive);
          console.log("lastFive es:", lastFive[0])
        } catch (error) {
          console.error('Error al obtener las últimas cartas en venta:', error);
        }
      }
  
      fetchLastFiveCards();
    }, []);
    const handleButtonClick = () => {
        setButtonClickCount(prevCount => prevCount + 1);
        setRenderCatalog(!renderCatalog)
    }

    return (
    <div className="home-banner-container">
        {/* <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
        </div> */}
        <div className="home-text-section">
            <h1 className="primary-heading">
                El mejor marketplace en  Freakyworld
            </h1>
            <p className="small-text">
            <InfoIcon/><br/>
            Usa el buscador para comprar o vender la carta que quieres, <br/> 
                haz click en una de las últimas cartas a la venta<br/>
                o usa nuestro Shuffler para descubrir nuevas cartas!
            </p>
            {/* <a href="/register" style={{textDecoration:"none"}}> */}
            <div className="force-flex"><button className="secondary-button" href="/register">
                Únete <FiArrowRight />
            </button>
            {/* </a> */}
            <button className="secondary-button" onClick={handleButtonClick}>
                Shuffle! <FiArrowDown />
            </button>
            </div>
            
        </div>
        <div className="home-image-section">
        <p className="primary-text">
            Últimas cartas a la venta!</p>
            <div className="card-grid-home">
          <div className="grid-header">Carta</div>
          <div className="grid-header">Colección</div>
          <div className="grid-header">Idioma</div>
          <div className="grid-header">Precio</div>
          
          {lastFiveCards.map((card) => (
            <React.Fragment key={card._id}>
                <div className="grid-content">
                    <Link href={`/carddetail/${card.id_card}`} color="inherit" underline="none">
                        {card.name}
                    </Link>
                </div>
                <div className="grid-content">{card.set_name}</div>
                <div className="grid-content">{getFlag(card.lang)}</div>
                <div className="grid-content">{card.price}€</div>

            </React.Fragment>
          ))}
          </div> 
        {/* <img src={} alt="" /> */}
        </div>
    </div>
    )
}