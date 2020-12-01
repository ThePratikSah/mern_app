import React, {useState} from "react";
import {connect} from "react-redux";

import classes from "./DeliveryForm.module.css";
import InputComponent
  from "../../components/ui/InputComponent/InputComponent.";
import Button from "../../components/ui/button/Button";
import WeightComponent
  from "../../components/ui/WeightComponent/WeightComponent.";
import DateTimeComponent
  from "../../components/ui/DateTimeComponent/DateTimeComponent.";
import PriceComponent
  from "../../components/ui/PriceComponent/PriceComponent.";

function DeliveryForm() {
  
  const [value, setValue] = useState(new Date());
  
  return (
    <div className={classes.DeliveryForm}>
      <h1 className={classes.DeliveryForm__header}>
        Make Delivery
        Request</h1>
      <span className={classes.DeliveryForm__headerSpan}>
        Our delivery agent will go through the below location and pickup the
        product
      </span>
      
      {/* fetching weight list from backend */}
      <WeightComponent/>
      
      <div className={classes.form__group}>
        <div className={classes.form}>
          {/* name of sender */}
          <InputComponent labelText={"Your Name"} type={"text"}
                          placeholder={"Mr/Miss"}/>
          {/* contact of sender */}
          <InputComponent labelText={"Your Contact"}
                          type={"tel"}
                          placeholder={"9876543210"}/>
          {/* email */}
          <InputComponent labelText={"Your Email"}
                          type={"email"}
                          placeholder={"email@mail.com"}/>
          {/* from location */}
          <InputComponent labelText={"Pickup Location"}
                          type={"text"}
                          placeholder={"House No/Flat No"}/>
          {/* from location */}
          <InputComponent labelText={"Street Name"}
                          type={"text"}
                          placeholder={"Street name/Locality name and Landmark"}/>
          <DateTimeComponent value={value} onChange={setValue}
                             label={"Pick up date and time"}/>
        </div>
        <div className={classes.form}>
          {/* name of receiver */}
          <InputComponent labelText={"Receiver Name"} type={"text"}
                          placeholder={"Mr/Miss"}/>
          {/* contact of Receiver */}
          <InputComponent labelText={"Receiver Contact"}
                          type={"tel"}
                          placeholder={"9876543210"}/>
          {/* email */}
          <InputComponent labelText={"Receiver Email"}
                          type={"email"}
                          placeholder={"email@mail.com"}/>
          {/* drop location */}
          <InputComponent labelText={"Drop Location"}
                          type={"text"}
                          placeholder={"House No/Flat No"}/>
          {/* drop street/locality */}
          <InputComponent labelText={"Street Name"}
                          type={"text"}
                          placeholder={"Street name/Locality name and Landmark"}/>
          <DateTimeComponent value={value} onChange={setValue}
                             label={"Drop date and time"}/>
        </div>
      </div>
      <div className={classes.DeliveryForm__submit}>
        <Button id={"btn"} text={"Review Order"}
                onClick={() => {
                }}/>
      </div>
      <PriceComponent value={"₹40"} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(DeliveryForm);
