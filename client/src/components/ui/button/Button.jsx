import React from "react";
import classes from "./Button.module.css";

function Button({onClick, id, text}) {
  return(
    <button
      onClick={onClick}
      id={id}
      className={classes.Button}
    >
      {text}
    </button>
  );
}

export default Button;