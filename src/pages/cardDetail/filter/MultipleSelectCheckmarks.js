import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { getFlag } from '../../../utils/languageToFlag'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultipleSelectCheckmarks = ({ name, filterProp, list, defaultVal, filters, setFilters, dummyReset}) => {
  const [collection, setcollection] = React.useState([defaultVal]);

  React.useEffect(() => {
    setcollection([defaultVal])
  }, [dummyReset])

  const handleChange = (event) => {
    console.log("El evento on change es", event)

    if(event.target.value.length > 1 && event.target.value[0] === defaultVal) {
      event.target.value.splice(0, 1)
      console.log("Se elimina Todas y el nuevo array es", event.target.value)
    }  

    if(event.target.value.length > 1 && event.target.value[event.target.value.length -1] === defaultVal) {
      event.target.value.splice(0, event.target.value.length -1)
      console.log("Se eliminan todos y se deja Todas", event.target.value)
    }  

    if(event.target.value.length === 0) {
      event.target.value.unshift(defaultVal)
    }

    const {
      target: { value },
    } = event;
    setcollection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setFilters({...filters, [filterProp]: event.target.value})
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">{name}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          href={`href-${filterProp}`}
          value={collection}
          onChange={handleChange}
          input={<OutlinedInput label={name} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {filterProp === "language" ? 
          list.map((element) => (
            <MenuItem key={element} value={element}>
              <Checkbox checked={collection.indexOf(element) > -1} />
              <ListItemText primary={getFlag(element) || defaultVal} />
            </MenuItem>
          ))
          
          : list.map((element) => (
            <MenuItem key={element} value={element}>
              <Checkbox checked={collection.indexOf(element) > -1} />
              <ListItemText primary={element} />
            </MenuItem>
          ))
          }
        </Select>
      </FormControl>
    </div>
  );
}
