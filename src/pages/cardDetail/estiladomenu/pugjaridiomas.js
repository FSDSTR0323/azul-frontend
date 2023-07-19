import {
    Box,
    InputLabel,
    FormControl,
    Select,
    TextField,
    MenuItem,
  } from "@mui/material";
  import { useState } from "react";
  
  export const PujarIdiomas = (props) => {
    const [country, setCountry] = useState("");
    console.log({ country });
    const handleChange = (event) => {
      setCountry(event.target.value);
    };
  
    return (

      
      <FormControl fullWidth   >
        <InputLabel id='demo-simple-select-label'>Idioma</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
         
          label='idioma '
          {...props.bidRegister("lang", { required: true })}
       >
          <MenuItem value="es">Español</MenuItem>
           <MenuItem value="en">English</MenuItem>
           <MenuItem value="fr">Francés</MenuItem>
           <MenuItem value="de">Alemán</MenuItem>
           <MenuItem value="it">Italiano</MenuItem>
           <MenuItem value="zh">Chino</MenuItem>
           <MenuItem value="ja">Japonés</MenuItem>
           <MenuItem value="pt">Portugués</MenuItem>
  
        </Select>
      </FormControl>
    );
  
    // return (
    //   <Box with="250px">
  
    //     <TextField label=" Idioma de cartas"  select value={country } onChange={handleChange} fullWidth>
  
    //       <MenuItem value="es">Español</MenuItem>
    //       <MenuItem value="en">English</MenuItem>
    //       <MenuItem value="fr">Francés</MenuItem>
    //       <MenuItem value="de">Alemán</MenuItem>
    //       <MenuItem value="it">Italiano</MenuItem>
    //       <MenuItem value="zh">Chino</MenuItem>
    //       <MenuItem value="ja">Japonés</MenuItem>
    //       <MenuItem value="pt">Portugués</MenuItem>
    //     </TextField>
    //   </Box>
    // );
  };
  
  // import * as React from 'react';
  // import Box from '@mui/material/Box';
  // import InputLabel from '@mui/material/InputLabel';
  // import MenuItem from '@mui/material/MenuItem';
  // import FormControl from '@mui/material/FormControl';
  // import Select from '@mui/material/Select';
  
  // export default function MuiIdiomas() {
  //   const [country, setCountry] = React.useState('');
  
  //   const handleChange = (event) => {
  //     setCountry(event.target.value);
  //   };
  
  //   return (
  //     <Box sx={{ minWidth: 120 }}>
  //       <FormControl fullWidth>
  //         <InputLabel id="demo-simple-select-label">Age</InputLabel>
  //         <Select
  //           labelId="demo-simple-select-label"
  //           id="demo-simple-select"
  //           value={country}
  //           label="pais"
  //           onChange={handleChange}
  //         >
  //          <MenuItem value="en">English</MenuItem>
  //           <MenuItem value="fr">Francés</MenuItem>
  //           <MenuItem value="de">Alemán</MenuItem>
  //           <MenuItem value="it">Italiano</MenuItem>
  //           <MenuItem value="zh">Chino</MenuItem>
  //           <MenuItem value="ja">Japonés</MenuItem>
  //           <MenuItem value="pt">Portugués</MenuItem>
  //         </Select>
  //       </FormControl>
  //     </Box>
  //   );
  // }
  