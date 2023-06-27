import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export function ColorToggleButton({ filters, setFilters, dummyReset }) {
  const [alignment, setAlignment] = React.useState();

  React.useEffect(() => {
    setAlignment()
  }, [dummyReset])

  const handleChange = (event, newAlignment) => {
    console.log("la nueva variable del toogle es", newAlignment)
    if (newAlignment == null) {
      setAlignment("")
      setFilters({...filters, type: ""})
      console.log("llegamos aquí al deseleccionar")
    } else {
      console.log("Llegamos aquí al seleccionar una opción")
      setAlignment(newAlignment);
      setFilters({...filters, type: newAlignment})
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      style={{margin:"0 auto"}}
    >
      <ToggleButton value="Venta">Venta</ToggleButton>
      <ToggleButton value="Subasta">Subasta</ToggleButton>
    </ToggleButtonGroup>
  );
}