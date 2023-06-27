import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BsCart2 } from "react-icons/bs";
import { authorizationConfig } from '../../../../security';


const CartCount = async () => {
    try {
        const userDataRes = await axios.get("http://localhost:5000/profile", authorizationConfig)
        let count = userDataRes.data.on_cart
        console.log ("lacuenta es: ", count)
    }catch(error){
        console.log ("error")
    }  

      
  return (
    <BsCart2></BsCart2>
    )
}   
export default CartCount