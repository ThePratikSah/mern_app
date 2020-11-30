import React, {useEffect, useState} from "react";
import classes from "./BuyForMe.module.css";
import Button from "../../components/ui/button/Button";
import InputComponent from "../../components/ui/InputComponent/InputComponent.";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import InputPlacesComponent from "../locationPoint/InputPlacesComponent/InputPlacesComponent";

function BuyForMe() {

  //states
  const [shopAddress, setShopAddress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");
  const [distance, setDistance] = useState({text: "", value: 0});

  // useEffect(() => {
  //   document.querySelector("#distance").innerHTML = `Book Now @ ${
  //     distance["value"] <= 5000
  //       ? 40
  //       : 40 + ((distance["value"] - 5000) / 1000) * 10
  //   }₹`;
  // });

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
      const inputFieldOrigin = document.querySelector('#originId').value;
      const inputFieldDestination = document.querySelector('#destinationId').value;
      if ((inputFieldOrigin !== null && inputFieldOrigin !== "") && (inputFieldDestination !== null && inputFieldDestination !== "")) {
        // alert("Thanks");
        const res = await fetch("https://delivery-nodejs.herokuapp.com/map/fetch", {
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
        });
        const json = await res.json();
        console.log(json["rows"][0]["elements"][0]["distance"]);
        setDistance(json["rows"][0]["elements"][0]["distance"]);
      } else {
        alert('Empty Field');
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
        <div className={classes.form__group}>
          {/* from where to buy */}
          <div className={classes.BuyForMe__inputGroup}>
            <InputPlacesComponent labelText={"Choose store Location"} inputId={"originId"} onSelect={initialHandleSelect} onChange={setShopAddress} value={shopAddress} />
            {/* shop name */}
            <InputComponent type={"text"} labelText={""} placeholder={"Shop Name"} />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            {/* what to buy */}
            <InputComponent labelText={"What to buy"} placeholder={"Enter the list of items seperated by comma"} />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            <InputComponent type={"number"} labelText={"Approximate cost"} placeholder={"₹"} />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            {/* delivery location */} {/* name */}
            <InputPlacesComponent labelText={"Where to deliver the items"} inputId={"destinationId"} onChange={setFinalAddress} onSelect={finalHandleSelect} value={finalAddress} />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            {/* contact number */}
            <InputComponent labelText={"Delivery location"} type={"text"} placeholder={"House No. & Street Name"} />
          </div>
          <InputComponent labelText={"Landmark"} type={"text"} placeholder={"Landmark"} />
          <InputComponent labelText={"Contact No."} placeholder={"987-654-3210"} type={"tel"} />

        </div>
        <div className={classes.BuyForMe__submit}>
          <Button onClick={fetchLocation} text={"Proceed to pay"} id={"btn"}/>
        </div>
    </div>
  );
}

export default BuyForMe;
