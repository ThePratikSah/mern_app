import React, { useState } from "react";
import classes from "./BuyForMe.module.css";
import Button from "../../components/ui/button/Button";
import InputComponent from "../../components/ui/InputComponent/InputComponent.";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import InputPlacesComponent from "../locationPoint/InputPlacesComponent/InputPlacesComponent";
import WeightComponent from "../../components/ui/WeightComponent/WeightComponent.";
import PriceComponent from "../../components/ui/PriceComponent/PriceComponent.";

function BuyForMe() {
  //states
  const [shopAddress, setShopAddress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");

  const [initialCoordinates, setInitialCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const [finalCoordinates, setFinalCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const initialHandleSelect = async (valueInitial) => {
    const resInitial = await geocodeByAddress(valueInitial);
    let latLngInitial = await getLatLng(resInitial[0]);
    setShopAddress(valueInitial);
    setInitialCoordinates(latLngInitial);
  };

  const finalHandleSelect = async (valueFinal) => {
    const resFinal = await geocodeByAddress(valueFinal);
    let latLngFinal = await getLatLng(resFinal[0]);
    setFinalAddress(valueFinal);
    setFinalCoordinates(latLngFinal);
    console.log(latLngFinal);
  };
  const fetchLocation = async () => {
    try {
      const inputFieldOrigin = document.querySelector("#originId").value;
      const inputFieldDestination = document.querySelector("#destinationId")
        .value;
      if (
        inputFieldOrigin !== null &&
        inputFieldOrigin !== "" &&
        inputFieldDestination !== null &&
        inputFieldDestination !== ""
      ) {
        // alert("Thanks");
        const res = await fetch(
          "https://delivery-nodejs.herokuapp.com/map/fetch",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              origin: {
                lat: initialCoordinates.lat,
                lng: initialCoordinates.lng,
              },
              destination: {
                lat: finalCoordinates.lat,
                lng: finalCoordinates.lng,
              },
            }),
          }
        );
        const json = await res.json();
        console.log(json["rows"][0]["elements"][0]["distance"]);
      } else {
        alert("Empty Field");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={classes.BuyForMe}>
      <h1 className={classes.BuyForMe__header}>Buy For Me</h1>
      <span className={classes.BuyForMe__headerSpan}>
        Our delivery agent will go through the store and buy the product
      </span>
      <WeightComponent />
      <div className={classes.form__group}>
        {/* from where to buy */}
        <div className={classes.BuyForMe__inputGroup}>
          <InputPlacesComponent
            labelText={"Pickup point landmark (Choose from Google Map)"}
            inputId={"originId"}
            onSelect={initialHandleSelect}
            onChange={setShopAddress}
            value={shopAddress}
          />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* delivery location */}
          <InputPlacesComponent
            labelText={"Drop Point landmark (Choose from Google Map)"}
            inputId={"destinationId"}
            onChange={setFinalAddress}
            onSelect={finalHandleSelect}
            value={finalAddress}
          />
        </div>

        {/* button for fetching the distance */}
        <Button onClick={fetchLocation} text={"Calculate Amount"} id={"btn"} />

        <div className={classes.BuyForMe__inputGroup}>
          {/* what to buy */}
          <InputComponent
            labelText={"What to buy"}
            placeholder={"Enter the list of items seperated by comma"}
          />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* From any specific shop */}
          <InputComponent
            labelText={"From any specific shop"}
            placeholder={"Enter shop name (optional)"}
          />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* address */}
          <InputComponent labelText={"Address"} placeholder={"Address"} />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* Area */}
          <InputComponent labelText={"Area"} placeholder={"Area"} />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* Street */}
          <InputComponent labelText={"Street"} placeholder={"Street"} />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* Landmark */}
          <InputComponent labelText={"Landmark"} placeholder={"Landmark"} />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          <InputComponent
            type={"number"}
            labelText={"Approximate cost"}
            placeholder={"₹"}
          />
        </div>
        <strong>Where to deliver the items</strong>
        <div className={classes.BuyForMe__inputGroup}>
          {/* contact number */}
          <InputComponent
            labelText={"Full Name"}
            type={"text"}
            placeholder={"Full Name"}
          />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* contact number */}
          <InputComponent
            labelText={"Delivery Address"}
            type={"text"}
            placeholder={"House No. & Street Name"}
          />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* contact number */}
          <InputComponent
            labelText={"Street No"}
            type={"text"}
            placeholder={"Street Number"}
          />
        </div>
        <div className={classes.BuyForMe__inputGroup}>
          {/* contact number */}
          <InputComponent
            labelText={"Landmark"}
            type={"text"}
            placeholder={"Landmark"}
          />
        </div>
        <InputComponent
          labelText={"10 digit mobile no."}
          type={"text"}
          placeholder={"987-654-3210"}
        />
        <InputComponent
          labelText={"Delivery Date"}
          type={"date"}
          placeholder={"987-654-3210"}
        />
        <InputComponent
          labelText={"Delivery Time"}
          type={"time"}
          placeholder={"987-654-3210"}
        />
        <InputComponent
          labelText={"Any delivery note"}
          type={"text"}
          placeholder={"Any instructions for" + " delivery partner"}
        />
        <InputComponent
          labelText={"Do you have a list of items to" + " orders"}
          type={"file"}
          placeholder={"987-654-3210"}
        />
      </div>
      <div className={classes.BuyForMe__submit}>
        <Button onClick={fetchLocation} text={"Proceed to pay"} id={"btn"} />
      </div>
      <PriceComponent value={"40"} />
    </div>
  );
}

export default BuyForMe;
