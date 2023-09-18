import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { validarInput } from "./validaciones";
import Swal from "sweetalert2";

const DatosEntrega = ({ updateStep }) => {
  const [address, setAddress] = useState({ 
    value: localStorage.getItem(`direccion`) || "", 
    valid: null 
  });
  const [city, setCity] = useState({ 
    value: localStorage.getItem(`ciudad`) || "", 
    valid: null 
  });
  const [province, setProvince] = useState({ 
    value: localStorage.getItem(`provincia`) || "", 
    valid: null 
  });

  useEffect(() => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      valid: validarInput(prevAddress.value),
    }));
    setCity((prevCity) => ({
      ...prevCity,
      valid: validarInput(prevCity.value),
    }));
    setProvince((prevProvince) => ({
      ...prevProvince,
      valid: validarInput(prevProvince.value),
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
        if(address.valid && city.valid && province.valid){
          localStorage.setItem(`direccion`, address.value);
          localStorage.setItem(`ciudad`, city.value);
          localStorage.setItem(`provincia`, province.value);
          updateStep(3);
          console.log(address, city, province);
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
        label="Dirección"
        variant="outlined"
        fullWidth
        margin="dense"
        type="text"
        value={address.value}
        onChange={(input) => {
          const value = input.target.value;
          const valid = validarInput(value);
          setAddress({ value, valid });
        }}
        error={address.valid === false}
        helperText={address.valid === false && "Ingresa al menos 4 caracteres."}
      />
      <TextField
        label="Ciudad"
        variant="outlined"
        fullWidth
        margin="dense"
        type="text"
        value={city.value}
        onChange={(input) => {
          const value = input.target.value;
          const valid = validarInput(value);
          setCity({ value, valid });
        }}
        error={city.valid === false}
        helperText={city.valid === false && "Ingresa al menos 4 caracteres."}
      />
      <TextField
        label="Estado/Provincia"
        variant="outlined"
        fullWidth
        margin="dense"
        type="text"
        value={province.value}
        onChange={(input) => {
          const value = input.target.value;
          const valid = validarInput(value);
          setProvince({ value, valid });
        }}
        error={province.valid === false}
        helperText={
          province.valid === false && "Ingresa al menos 4 caracteres."
        }
      />
      <div>
        <Button variant="contained" onClick={() => updateStep(1)}
          sx={{ marginRight: '8px', display: 'inline-flex' }}>
            Atras
        </Button>
        <Button variant="contained" type="submit" 
          sx={{display: 'inline-flex' }}>
            Crear Cuenta
        </Button>
      </div>
    </Box>
  );
};

export default DatosEntrega;
