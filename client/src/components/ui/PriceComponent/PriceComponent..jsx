import React from "react";
import classes from "./PriceComponent.module.css";

function PriceComponent({value}) {
  return (
    <div className={classes.LocationPoint__fetchPrice}>
      <span>Total: {value}/-</span>
    </div>
  );
}

export default PriceComponent;