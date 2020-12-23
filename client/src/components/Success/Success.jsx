import React from "react";
import classes from "./Success.module.css";

import successIcon from "../../img/success.svg";

function Success() {
  
  return (
    <div className={classes.cardParent}>
      <div className={classes.card}>
        <img className={classes.icon} src={successIcon} alt="Success"/>
        <p>Yay🎉,</p>
        <h2>Your order is confirmed!</h2>
        <span>We'll send you a shipping confirmation on your 📱 & 💌.</span>
        <button>CHECK STATUS</button>
      </div>
    </div>
  );
}

export default Success;