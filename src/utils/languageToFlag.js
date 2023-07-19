import spanish from "../assets/symbols/spain.png";
import english from "../assets/symbols/uk.png";
import german from "../assets/symbols/germany.png";
import french from "../assets/symbols/france.png";
import italian from "../assets/symbols/italy.png";
import chinese from "../assets/symbols/china.png";
import japanese from "../assets/symbols/japan.png";
import portuguese from "../assets/symbols/portugal.png";

export const getFlag = (lang) => {
    switch (lang) {
        case "es" :
            return <img className= "card-detail-symbol-image" src={spanish} alt="español" />;
        case "en" :
            return <img className= "card-detail-symbol-image" src={english} alt="inglés" />;
        case "fr" :
            return <img className= "card-detail-symbol-image" src={french} alt="francés" />;
        case "de" :
            return <img className= "card-detail-symbol-image" src={german} alt="alemán" />;
        case "it" :
            return <img className= "card-detail-symbol-image" src={italian} alt="italiano" />;
        case "zh" :
            return <img className= "card-detail-symbol-image" src={chinese} alt="chino" />;
        case "ja" :
            return <img className= "card-detail-symbol-image" src={japanese} alt="japonés" />;
        case "pt" :
            return <img className= "card-detail-symbol-image" src={portuguese} alt="portugués" />;
        default:
            return null;
    }
};