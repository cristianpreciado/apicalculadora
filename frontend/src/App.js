import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "./components";

const App = () => {
  const [values, setValues] = useState({});
  const [errores, setErrores] = useState({});
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (values?.valorUno <= "0") {
      errors.valorUno = "El numero debe ser mayor a 0";
    }
    if (values?.valorDos <= "0") {
      errors.valorDos = "El numero debe ser mayor a 0";
    }
    if (Object.keys(errors).length === 0) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(values),
        redirect: "follow",
      };
      fetch("https://localhost:5001/api/logcalculo", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setOpen(true);
          setMensaje(
            `El resultado de su operacion es: ${
              result.resultado
            }, este resultado ${
              !result.validacion ? "no" : ""
            } pertenece a la serie fibonacci.`
          );
        })
        .catch((error) => console.log("error", error));
    }
    setErrores(errors);
  };
  return (
    <Box m={4} sx={{ flexGrow: 1, display: "flex", flexWrap: "wrap" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {mensaje}
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" component="div" align="center" gutterBottom>
            Bienvenido(a) a el Banco de los Geeks
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Numero Uno"
            name="valorUno"
            values={values}
            errores={errores}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Numero Dos"
            name="valorDos"
            values={values}
            errores={errores}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Button
              onClick={(e) => handleSubmit(e)}
              variant="contained"
              color="info"
            >
              Calcular
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
