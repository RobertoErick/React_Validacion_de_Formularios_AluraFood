import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { LogoSpace, FormSpace, Img } from "./styles";
import DatosUsuario from "./DatosUsuario";
import DatosPersonales from "./DatosPersonales";
import DatosEntrega from "./DatosEntrega";
import Complete from "./Complete";
import Stepper from "../Stepper";

const Form = () => {
  const initialStep = localStorage.getItem('step') ? parseInt(localStorage.getItem('step')) : 0;
  const [step, setStep] = useState(initialStep);

  const updateStep = (newStep) => {
    console.log("actualizar paso", newStep);
    setStep(newStep);
  };

  useEffect(() => {
    localStorage.setItem('step', step.toString());
  }, [step]);

  const steps = {
    0: <DatosUsuario updateStep={updateStep} />,
    1: <DatosPersonales updateStep={updateStep} />,
    2: <DatosEntrega updateStep={updateStep} />,
    3: <Complete updateStep={updateStep}/>,
  };

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flexbox",
        flexDirection: "column",
      }}
    >
      <LogoSpace>
        <Img src={"/favicon.png"} />
        <Typography variant="h3">AluraFood</Typography>
      </LogoSpace>
      <FormSpace>
        {step < 3 && <Stepper step={step} />}
        {steps[step]}
      </FormSpace>
    </Box>
  );
};

export default Form;
