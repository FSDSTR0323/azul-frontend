import React, { useState } from "react";
import sellimage from "../../../assets/sell.png";
import bidimage from "../../../assets/bid.png";
import Menu from "@mui/material/Menu";
import axios from 'axios';
import { useForm } from "react-hook-form"
import { CardBox } from "./CardBox";


export default function SellMenu() {
  
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

  const { register, handleSubmit, formState: { isValid } } = useForm();

  const onSubmit = async (formData) =>  {  
    console.log('Estoy en el onSubmit') 
    console.log('CardBox es: ', CardBox)

    try {
      console.log('formdata es:',formData)
      await axios.post('http://localhost:5000/cards/sellcard', formData)
    }catch{
      console.log('Estoy en el catch de OnSubmit')
  }
    
        
  }

return (
<div className="sell-buttons-container">
  <div>      
      <button className="sell-button" onClick={handleClickSell}>
          Vender <img className="card-detail-symbol-image" src={sellimage} alt="Vender" />
      </button>
      <button className="sell-button" onClick={handleClickBid}>
          Subastar <img className="card-detail-symbol-image" src={bidimage} alt="Subastar" />
      </button>
  </div>
    <Menu onSubmit={handleSubmit(onSubmit)}
      id="selform"
      className="sell-form-box"
      component="form"
      noValidate
      autoComplete="off"
      anchorEl={anchorElSell}
      open={Boolean(anchorElSell)}
      onClose={handleCloseSell}>
            
      <label>Foil: </label>
      <input 
          type="checkbox" 
          id="foil"
          {...register("foil", {required: false})}
      />
      <br/>
      <label>Idioma de la carta: </label>
       <select 
       id="lang" 
       {...register("lang", {required: true})}
       >
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
          <option value="fr">Alemán</option>
          <option value="fr">Italiano</option>
          <option value="fr">Chino</option>
          <option value="fr">Japonés</option>
          <option value="fr">Portugués</option>
        </select>

       <br/>
      <label>Estado: </label>
       <select 
       id="status" 
       {...register("status", {required: true})}
       >
          <option value="new">Nueva</option>
          <option value="almost_new">Casi Nueva</option>
          <option value="excellent">Excelente</option>
          <option value="good">Buena</option>
          <option value="lightly_played">Ligeramente Jugada</option>
          <option value="played">Jugada</option>
          <option value="poor">Pobre</option>
        </select>

        <br/>
        <label>Precio: </label>
        <input 
          type="text" 
          id="price" 
          {...register("price", {required: true})}
          />
        <br/>
        <button id='sellcard' type="submit" disabled={!isValid}>Poner en Venta</button>
    </Menu>

    <Menu onSubmit={handleSubmit(onSubmit)}
      id="bidform"
      className="bid-form-box"
      component="form"
      noValidate
      autoComplete="off"
      anchorEl={anchorElBid}
      open={Boolean(anchorElBid)}
      onClose={handleCloseBid}>
      
      <label>Foil: </label>
      <input 
          type="checkbox" 
          id="foil"
          {...register("foil", {required: false})}
      />
      <br/>
      <label>Idioma de la carta: </label>
       <select 
       id="lang" 
       {...register("lang", {required: true})}
       >
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
          <option value="fr">Alemán</option>
          <option value="fr">Italiano</option>
          <option value="fr">Chino</option>
          <option value="fr">Japonés</option>
          <option value="fr">Portugués</option>
        </select>

       <br/>
      <label>Estado: </label>
       <select 
       id="status" 
       {...register("status", {required: true})}
       >
          <option value="new">Nueva</option>
          <option value="almost_new">Casi Nueva</option>
          <option value="excellent">Excelente</option>
          <option value="good">Buena</option>
          <option value="lightly_played">Ligeramente Jugada</option>
          <option value="played">Jugada</option>
          <option value="poor">Pobre</option>
        </select>

        <br/>
        <label>Precio inicial: </label>
        <input 
          type="text" 
          id="price" 
          {...register("price", {required: true})}  
          />
        <br/>
        <label>Fecha Fin de puja: </label>
        <input 
          type="text" 
          id="end_of_bid" 
          {...register("end_of_bid", {required: true})}
          />
        <br/>
        <button id='bidcard' type="submit" disabled={!isValid}>Poner en Subasta</button>
    </Menu>
</div>
);
};