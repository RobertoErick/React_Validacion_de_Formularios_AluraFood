import React from "react";
import styled from "styled-components";
import { Box,Button, Typography } from "@mui/material";

const Img = styled.img`
  width: 70%;
`;

const Complete = ({ updateStep }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">!Gracias por tu registro¡</Typography>
      <Img src="/complete.png" />
      <div>
      <Button variant="contained" onClick={() => updateStep(0)}
          sx={{ marginRight: '8px', display: 'inline-flex' }}>
            Regresar
      </Button>
      </div>
    </Box>
  );
};

export default Complete;
