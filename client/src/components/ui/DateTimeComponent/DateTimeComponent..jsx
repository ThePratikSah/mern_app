import React, {useState} from "react";
import DateTimePicker from 'react-datetime-picker';

import classes
  from "./DateTimeComponent.module.css";

function DateTimeComponent({value, onChange, label}) {
  
  return (
    <div>
      <label className={classes.DateTime__customCssLabel}>{label}</label>
      <DateTimePicker
        className={classes.DateTime__customCss}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default DateTimeComponent;