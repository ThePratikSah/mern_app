import React, { useContext } from "react";

import classes from "./DeliveryForm.module.css";
import InputComponent from "../../components/ui/InputComponent/InputComponent.";
import Button from "../../components/ui/button/Button";
import WeightComponent from "../../components/ui/WeightComponent/WeightComponent.";
import PriceComponent from "../../components/ui/PriceComponent/PriceComponent.";

import UserContext from "../../context/UserContext";

function DeliveryForm() {
  const { user } = useContext(UserContext);

  return (
    <div className={classes.DeliveryForm}>
      <h1 className={classes.DeliveryForm__header}>Make Delivery Request</h1>
      <span className={classes.DeliveryForm__headerSpan}>
        Our delivery agent will go through the below location and pickup the
        product
      </span>

      {/* fetching weight list from backend */}
      <WeightComponent />
      <div className={classes.form__group}>
        <div className={classes.form}>
          {/* name of sender */}
          <InputComponent
            value={user.senderName}
            name={"sname"}
            labelText={"Your Name"}
            type={"text"}
            placeholder={"Mr/Miss"}
          />
          {/* contact of sender */}
          <InputComponent
            value={user.senderPhone}
            name={"sphone"}
            labelText={"Your Contact"}
            type={"tel"}
            placeholder={"9876543210"}
          />
          {/* email */}
          <InputComponent
            value={user.senderEmail}
            name={"semail"}
            labelText={"Your Email"}
            type={"email"}
            placeholder={"email@mail.com"}
          />
          {/* from location */}
          <InputComponent
            value={user.pickupLocation}
            name={"slocation"}
            labelText={"Pickup Location"}
            type={"text"}
            placeholder={"House No/Flat No"}
          />
          {/* from location */}
          <InputComponent
            value={user.pickupStreet}
            name={"sstreet"}
            labelText={"Street Name"}
            type={"text"}
            placeholder={"Street name/Locality name and Landmark"}
          />

          {/* Pickup Date */}
          <InputComponent
            value={user.pickupDate}
            name={"sdate"}
            labelText={"Date"}
            type={"date"}
          />

          {/* Pickup Time */}
          <InputComponent
            value={user.pickupTime}
            name={"stime"}
            labelText={"Time"}
            type={"time"}
          />
        </div>
        <div className={classes.form}>
          {/* name of receiver */}
          <InputComponent
            value={user.receiverName}
            name={"pname"}
            labelText={"Receiver Name"}
            type={"text"}
            placeholder={"Mr/Miss"}
          />
          {/* contact of Receiver */}
          <InputComponent
            value={user.receiverPhone}
            name={"pphone"}
            labelText={"Receiver Contact"}
            type={"tel"}
            placeholder={"9876543210"}
          />
          {/* email */}
          <InputComponent
            value={user.receiverEmail}
            name={"pemail"}
            labelText={"Receiver Email"}
            type={"email"}
            placeholder={"email@mail.com"}
          />
          {/* drop location */}
          <InputComponent
            value={user.dropLocation}
            name={"plocation"}
            labelText={"Drop Location"}
            type={"text"}
            placeholder={"House No/Flat No"}
          />
          {/* drop street/locality */}
          <InputComponent
            value={user.dropStreet}
            name={"pstreet"}
            labelText={"Street Name"}
            type={"text"}
            placeholder={"Street name/Locality name and Landmark"}
          />

          {/* Drop Date */}
          <InputComponent
            value={user.dropDate}
            name={"pdate"}
            labelText={"Date"}
            type={"date"}
          />

          {/* Drop Time */}
          <InputComponent
            value={user.dropTime}
            name={"ptime"}
            labelText={"Time"}
            type={"time"}
          />
        </div>
      </div>

      <div className={classes.DeliveryForm__submit}>
        <Button id={"btn"} text={"Review Order"} />
      </div>
      <PriceComponent value={"₹40"} />
    </div>
  );
}

export default DeliveryForm;
