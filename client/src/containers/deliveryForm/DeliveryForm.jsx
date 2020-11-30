import React from "react";
import {connect} from "react-redux";

import classes from "./DeliveryForm.module.css";
import InputComponent from "../../components/ui/InputComponent/InputComponent.";
import Button from "../../components/ui/button/Button";
import WeightComponent from "../../components/ui/WeightComponent/WeightComponent.";

function DeliveryForm() {


  return (
    <div className={classes.DeliveryForm}>
      <h1 className={classes.DeliveryForm__header}>Make Delivery Request</h1>
      <span className={classes.DeliveryForm__headerSpan}>
        Our delivery agent will go through the below location and pickup the
        product
      </span>

      <WeightComponent/>

      <div className={classes.form__group}>
        <div className={classes.form}>
          {/* name of sender */}
          <InputComponent labelText={"Your Name"} type={"text"} placeholder={"Mr/Miss"}/>
          {/* from location */}
          <InputComponent labelText={"Pickup Location"} type={"text"} placeholder={"Street or Locality"}/>
          {/* contact of sender */}
          <InputComponent labelText={"Your Contact"} type={"tel"} placeholder={"9876543210"}/>
          {/* email */}
          <InputComponent labelText={"Email"} type={"email"} placeholder={"your_email@mail.com"}/>
        </div>
        <div className={classes.form}>
          {/* from location */}
          <InputComponent labelText={"Drop Location"} type={"text"} placeholder={"Street or Locality"}/>
          {/* contact of sender */}
          <InputComponent labelText={"Receiver's Contact"} type={"tel"} placeholder={"9876543210"}/>
          {/* name of sender */}
          <InputComponent labelText={"Receiver's Name"} type={"text"} placeholder={"Mr/Miss"}/>
        </div>
      </div>
      <div className={classes.DeliveryForm__submit}>
        <Button id={"btn"} text={"Review Order"} onClick={() => {
        }}/>
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
