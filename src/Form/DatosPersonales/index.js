import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import {
  validarNombre,
  validarApellidos,
  validarTelefono,
} from "./validaciones";
import Swal from 'sweetalert2'

const DatosPersonales = ({ updateStep }) => {
  const [name, setName] = useState({ 
    value: localStorage.getItem(`nombre`) || "", 
    valid: null 
  });
  const [lastName, setLastName] = useState({
    value: localStorage.getItem(`apellido`) || "", 
    valid: null 
  });
  const [phone, setPhone] = useState({ 
    value: localStorage.getItem(`telefono`) || "", 
    valid: null 
  });

  useEffect(() => {
    setName((prevName) => ({
      ...prevName,
      valid: validarNombre(prevName.value),
    }));
    setLastName((prevLastName) => ({
      ...prevLastName,
      valid: validarApellidos(prevLastName.value),
    }));
    setPhone((prevPhone) => ({
      ...prevPhone,
      valid: validarTelefono(prevPhone.value),
    }));
  }, []);

  return (
    <Box
      component="form"
      autocomplete="off"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if(name.valid && lastName.valid && phone.valid){
          localStorage.setItem(`nombre`, name.value);
          localStorage.setItem(`apellido`, lastName.value);
          localStorage.setItem(`telefono`, phone.value);
          updateStep(2);
        } else {
          Swal.fire(
            'Falta información',
            'No has rellenado correctamente los datos, por favor llénalos.',
            'info'
          )
        }
      }}
    >
      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        margin="dense"
        type="text"
        value={name.value}
        onChange={(input) => {
          const value = input.target.value;
          const valid = validarNombre(value);
          setName({ value, valid });
          console.log(value, valid);
        }}
        error={name.valid === false}
        helperText={
          name.valid === false &&
          "Ingresa al menos 2 caracteres y máximo 30 caracteres."
        }
      />
      <TextField
        label="Apellidos"
        variant="outlined"
        fullWidth
        margin="dense"
        type="text"
        value={lastName.value}
        onChange={(input) => {
          const value = input.target.value;
          const valid = validarApellidos(value);
          setLastName({ value, valid });
          console.log(value, valid);
        }}
        error={lastName.valid === false}
        helperText={
          lastName.valid === false &&
          "Ingresa al menos 2 caracteres y máximo 50 caracteres."
        }
      />
      <TextField
        label="Número telefónico"
        variant="outlined"
        fullWidth
        margin="dense"
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={phone.value}
        onChange={(input) => {
          const value = input.target.value;
          const valid = validarTelefono(value);
          setPhone({ value, valid });
          console.log(value, valid);
        }}
        error={phone.valid === false}
        helperText={
          phone.valid === false &&
          "Ingresa al menos 8 digitos y máximo 14 digitos."
        }
      />
      <div>
        <Button variant="contained" onClick={() => updateStep(0)}
          sx={{ marginRight: '8px', display: 'inline-flex' }}>
            Atras
        </Button>
        <Button variant="contained" type="submit" 
          sx={{display: 'inline-flex' }}>
            Siguiente
        </Button>
      </div>
    </Box>
  );
};

export default DatosPersonales;
