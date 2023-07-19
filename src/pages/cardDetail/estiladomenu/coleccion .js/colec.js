import {
    Box,
    InputLabel,
    FormControl,
    Select,
    TextField,
    MenuItem,
  } from "@mui/material";
  import { useState } from "react";
  
  export const Coleccion = (props) => {
    const [country, setCountry] = useState("");
    console.log({ country });
    const handleChange = (event) => {
      setCountry(event.target.value);
    };
  
    return (
      <FormControl  fullWidth >
        <InputLabel id='demo-simple-select-label'>Colleccion</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
         
          label='Estado '
            {...props.sellRegister("set_name", { required: true })} 
       >
           
             <MenuItem value=""></MenuItem>
             <MenuItem value=""> </MenuItem>
             <MenuItem value=""></MenuItem>
             <MenuItem value=""></MenuItem>
             <MenuItem value=""> </MenuItem>
             <MenuItem value=""></MenuItem>
             <MenuItem value=""></MenuItem>
            
  
        </Select>
      </FormControl>
    );
};