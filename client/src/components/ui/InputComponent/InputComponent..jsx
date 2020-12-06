import React from "react";
import classes from "./InputComponent.module.css";

function InputComponent({id, labelText, type, placeholder}) {
  return (
    <div className={classes.DeliveryFrom__inputGroup}>
      <label className={classes.DeliveryForm__label}>{labelText}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={classes.InputComponent}
      />
    </div>
  );
}

export default InputComponent;
