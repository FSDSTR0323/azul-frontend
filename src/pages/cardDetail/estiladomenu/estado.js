import {
  Box,
  InputLabel,
  FormControl,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export const Estado = (props) => {
  const [country, setCountry] = useState("");
  console.log({ country });
  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <FormControl  fullWidth sx={{ minWidth: 120 }} >
      <InputLabel id='demo-simple-select-label'>Estado</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
       
        label='Estado '
          {...props.sellRegister("status", { required: true })}
          
     >
         
           <MenuItem value="new">Nueva</MenuItem>
           <MenuItem value="almost_new">Casi Nueva</MenuItem>
           <MenuItem value="excellent">Excelente</MenuItem>
           <MenuItem value="good">Buena</MenuItem>
           <MenuItem value="lightly_played">Ligeramente Jugada</MenuItem>
           <MenuItem value="played">Jugada</MenuItem>
           <MenuItem value="poor">Pobre</MenuItem>
          

      </Select>
    </FormControl>
  );


};
// import { Box, TextField, MenuItem } from "@mui/material";
// import { useState } from "react";


// export const Estado = () => {
//     const [country, setCountry] = useState("");
//     console.log({country})
//     const handleChange = (event) => {
//         setCountry(event.target.value);
//       };
    
//     return (
//       <Box with="250px">
        
//         <TextField label=" Estado"  select value={country } onChange={handleChange} fullWidth>
            
//           <MenuItem value="new">Nueva</MenuItem>
//           <MenuItem value="almost_new">Casi Nueva</MenuItem>
//           <MenuItem value="excellent">Excelente</MenuItem>
//           <MenuItem value="good">Buena</MenuItem>
//           <MenuItem value="lightly_played">Ligeramente Jugada</MenuItem>
//           <MenuItem value="played">Jugada</MenuItem>
//           <MenuItem value="poor">Pobre</MenuItem>
          
//         </TextField>
//       </Box>
//     );
//   };
  


// <label>Estado: </label>
//           <select id="status" {...sellRegister("status", { required: true })}>
//             <option value="new">Nueva</option>
//             <option value="almost_new">Casi Nueva</option>
//             <option value="excellent">Excelente</option>
//             <option value="good">Buena</option>
//             <option value="lightly_played">Ligeramente Jugada</option>
//             <option value="played">Jugada</option>
//             <option value="poor">Pobre</option>
//           </select>