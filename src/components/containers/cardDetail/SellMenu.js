import React, { useState } from "react";
import sellimage from "../../../assets/sell.png";
import bidimage from "../../../assets/bid.png";
import MenuSell from "@mui/material/Menu";
import MenuBid from "@mui/material/Menu";


export const SellMenu = () => {
const [anchorElSell, setAnchorElSell] = useState(null);
const handleClickSell = (event) => {
    setAnchorElSell(event.currentTarget);
  };  
  const handleCloseSell = () => {
    setAnchorElSell(null);
  };
  
const [anchorElBid, setAnchorElBid] = useState(null);
const handleClickBid = (event) => {
      setAnchorElBid(event.currentTarget);
    };  
    const handleCloseBid = () => {
      setAnchorElBid(null);
    };


return (

<div className="sell-buttons-container">
    
    <button className="sell-button" onClick={handleClickSell}>
         Vender <img className="card-detail-symbol-image" src={sellimage} alt="Vender" />
    </button>
    <button className="sell-button" onClick={handleClickBid}>
         Subastar <img className="card-detail-symbol-image" src={bidimage} alt="Subastar" />
    </button>
    <MenuSell
        id="sell-menu"
        anchorEl={anchorElSell}
        open={Boolean(anchorElSell)}
        onClose={handleCloseSell}
            >
        <div className="sell-menu-content">
            <form>
            <div className="form-field">
                <label>
                <input type="checkbox" name="foil" /> Foil
                </label>
            </div>

            <div className="form-field">
                <label>
                Idioma de la carta:
                <select>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="fr">Francés</option>
                    <option value="fr">Alemán</option>
                    <option value="fr">Italiano</option>
                    <option value="fr">Chino</option>
                    <option value="fr">Japonés</option>
                    <option value="fr">Portugués</option>

                    {/* Agrega más opciones de idioma según sea necesario */}
                </select>
                </label>
            </div>

            <div className="form-field">
                <label>
                Estado de la carta:
                <select>
                    <option value="new">Nueva</option>
                    <option value="almost_new">Casi Nueva</option>
                    <option value="excellent">Excelente</option>
                    <option value="good">Buena</option>
                    <option value="lightly_played">Ligeramente Jugada</option>
                    <option value="played">Jugada</option>
                    <option value="poor">Pobre</option>
                    {/* Agrega más opciones de estado según sea necesario */}
                </select>
                </label>
            </div>

            <div className="form-field">
                <label>
                Precio:
                <input type="text" name="price" />
                </label>
            </div>

            <button type="submit">Guardar</button>
            </form>
        </div>
</MenuSell>

<MenuBid
  id="sell-menu"
  anchorEl={anchorElBid}
  open={Boolean(anchorElBid)}
  onClose={handleCloseBid}
    >
  <div className="sell-menu-content">
    <form>
      <div className="form-field">
        <label>
          <input type="checkbox" name="foil" /> Foil
        </label>
      </div>

      <div className="form-field">
        <label>
          Idioma de la carta:
          <select>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="fr">Alemán</option>
            <option value="fr">Italiano</option>
            <option value="fr">Chino</option>
            <option value="fr">Japonés</option>
            <option value="fr">Portugués</option>
          </select>
        </label>
      </div>

      <div className="form-field">
        <label>
          Estado de la carta:
          <select>
            <option value="new">Nueva</option>
            <option value="almost_new">Casi Nueva</option>
            <option value="excellent">Excelente</option>
            <option value="good">Buena</option>
            <option value="lightly_played">Ligeramente Jugada</option>
            <option value="played">Jugada</option>
            <option value="poor">Pobre</option>
            {/* Agrega más opciones de estado según sea necesario */}
          </select>
        </label>
      </div>

      <div className="form-field">
        <label>
          Precio de salida:
          <input type="text" name="price" />
        </label>
      </div>
      <div className="form-field">
        <label>
          Fecha fin de puja:
          <input type="text" name="enddate" />
        </label>
      </div>

      <button type="submit">Guardar</button>
    </form>
  </div>
</MenuBid>

</div>
);
};