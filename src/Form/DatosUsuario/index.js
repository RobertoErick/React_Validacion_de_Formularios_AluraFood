import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { validarEmail, validarPassword } from "./validaciones";
import Swal from "sweetalert2";

const DatosUsuario = ({ updateStep }) => {
  const [email, setEmail] = useState({
    value: localStorage.getItem('email') || "",
    valid: null,
  });
  const [password, setPassword] = useState({ 
    value: localStorage.getItem(`password`) || "", 
    valid: null 
  });

  useEffect(() => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      valid: validarEmail(prevEmail.value),
    }));
    setPassword((prevPassword) => ({
      ...prevPassword,
      valid: validarPassword(prevPassword.value),
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
        if (email.valid && password.valid) {
          console.log("Siguiente formulario");
          localStorage.setItem('email', email.value);
          localStorage.setItem('password', password.value);
          updateStep(1);
        } else {
          Swal.fire(
            'Falta información',
            'No ah rellenado correctamente los datos, favor de llenarlos',
            'info'
          )
        }
      }}
    >
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        margin="dense"
        type="email"
        error={email.valid === false}
        helperText={
          email.valid === false && "Ingresa un correo electrónico válido."
        }
        value={email.value}
        onChange={(input) => {
          const email = input.target.value;
          const valido = validarEmail(email);
          setEmail({ value: email, valid: valido });
        }}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        fullWidth
        margin="dense"
        type="password"
        error={password.valid === false}
        helperText={
          password.valid === false &&
          "Ingresa una contraseña válida, Al menos 8 caracteres y máximo 20."
        }
        value={password.value}
        onChange={(input) => {
          const password = input.target.value;
          setPassword({ value: password, valid: validarPassword(password) });
        }}
      />
      <Button variant="contained" type="submit">
        Siguiente
      </Button>
    </Box>
  );
};

export default DatosUsuario;
