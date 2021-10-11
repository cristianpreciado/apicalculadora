import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const Input = ({ label, name, values, errores, handleChange }) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <TextField
        error={errores[name] ? true : false}
        id={`outlined-${name}`}
        type="number"
        label={label}
        defaultValue={values[name]}
        onChange={(e) => handleChange(e)}
        name={name}
        helperText={errores[name] ? errores[name] : ""}
      />
    </FormControl>
  );
};

export default Input;
