import React, {useEffect, useContext} from "react";
import classes from "./Success.module.css";

import successIcon from "../../img/success.svg";
import UserContext from "../../context/UserContext";

function Success(props) {
  
  const {setUser} = useContext(UserContext);
  
  useEffect(() => {
    setUser(null);
  });
  
  return (
    <div className={classes.cardParent}>
      <div className={classes.card}>
        <img className={classes.icon} src={successIcon} alt="Success"/>
        <p>Hi,</p>
        <h2>Your order is confirmed!</h2>
        <span>We'll send you a shipping confirmation email.</span>
        <button>CHECK STATUS</button>
      </div>
    </div>
  );
}

export default Success;