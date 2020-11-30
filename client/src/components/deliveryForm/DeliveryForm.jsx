import React from "react";
import {connect} from "react-redux";

import classes from "./DeliveryForm.module.css";
import InputComponent from "../ui/InputComponent/InputComponent.";
import Button from "../ui/button/Button";

function DeliveryForm() {
  return (
    <div className={classes.DeliveryForm}>
      <h1 className={classes.DeliveryForm__header}>Make Delivery Request</h1>
      <span className={classes.DeliveryForm__headerSpan}>
        Our delivery agent will go through the below location and pickup the
        product
      </span>
        <div className={classes.form__group}>
          <div className={classes.form}>
            {/* from location */}
            <InputComponent labelText={"Pickup Location"} type={"text"} placeholder={"Street or Locality"}/>
            {/* contact of sender */}
            <InputComponent labelText={"Your Contact"} type={"tel"} placeholder={"9876543210"}/>
            {/* name of sender */}
            <InputComponent labelText={"Your Name"} type={"text"} placeholder={"Mr."}/>
          </div>
          <div className={classes.form}>
            {/* from location */}
            <InputComponent labelText={"Drop Location"} type={"text"} placeholder={"Street or Locality"}/>
            {/* contact of sender */}
            <InputComponent labelText={"Receiver's Contact"} type={"tel"} placeholder={"9876543210"}/>
            {/* name of sender */}
            <InputComponent labelText={"Receiver's Name"} type={"text"} placeholder={"Mr."}/>
          </div>
        </div>
        <div className={classes.DeliveryForm__submit}>
          <Button id={"btn"} text={"Review Order"} onClick={() => {}} />
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(DeliveryForm);
