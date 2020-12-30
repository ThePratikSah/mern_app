import React from "react";
import classes from "./Features.module.css";

function Features() {
  return (
    <div className={classes.Parent}>
      <div className={classes.Features}>
        <div className={classes.Features__group}>
          <div className={classes.Features__groupChild}>
            <h2 className={classes.Features__groupChildHeader}>
              Within 90 min
            </h2>
            <span className={classes.Features__groupChildSpan}>
              We provide the fastest delivery option while maintaining the
              safety of the driver
            </span>
          </div>
          <div className={classes.Features__groupChild}>
            <h2 className={classes.Features__groupChildHeader}>
              ₹39<sup>*</sup>
            </h2>
            <span className={classes.Features__groupChildSpan}>
              Fare staring as low as ₹10/km after first 5km within Delhi/NCR
            </span>
          </div>
          <div className={classes.Features__groupChild}>
            <h2 className={classes.Features__groupChildHeader}>Hygiene</h2>
            <span className={classes.Features__groupChildSpan}>
              Proper hygiene is maintained while delivering product.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
