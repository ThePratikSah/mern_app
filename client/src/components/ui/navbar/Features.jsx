import React from "react";
import classes from "./Features.module.css";

function Features() {
  return (
    <div className={classes.Parent}>
      <div className={classes.Features}>
        <div className={classes.Features__group}>
          <div className={classes.Features__groupChild}>
            <h2 className={classes.Features__groupChildHeader}>90 min max</h2>
            <span className={classes.Features__groupChildSpan}>
              We provide the fastest delivery option while maintaining the
              safety of the driver
            </span>
          </div>
          <div className={classes.Features__groupChild}>
            <h2 className={classes.Features__groupChildHeader}>₹40</h2>
            <span className={classes.Features__groupChildSpan}>
              Price staring as low as ₹8/km in Delhi/NCR
            </span>
          </div>
          <div className={classes.Features__groupChild}>
            <h2 className={classes.Features__groupChildHeader}>Hygene</h2>
            <span className={classes.Features__groupChildSpan}>
              Proper hygene is maintained while delivering product.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
