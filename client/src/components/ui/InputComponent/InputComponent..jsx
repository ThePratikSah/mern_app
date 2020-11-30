import React from "react";
import classes from "./InputComponent.module.css";

function InputComponent({labelText, type, placeholder}) {
  return (
    <div className={classes.DeliveryFrom__inputGroup}>
      <label className={classes.DeliveryForm__label}>{labelText}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={classes.InputComponent}
      />
    </div>
  );
}

export default InputComponent;
