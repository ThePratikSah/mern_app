import React, {useState, useEffect} from "react";
import classes from "./LocationPoint.module.css";
import deliverImg from "../../img/deliver.svg";
import Button from "../../components/ui/button/Button";

import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import InputPlacesComponent from "./InputPlacesComponent/InputPlacesComponent";
import PriceComponent from "../../components/ui/PriceComponent/PriceComponent.";

function LocationPoint() {
  //states
  const [initialAddress, setInitialAddress] = useState("");
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
    setInitialAddress(valueInitial);
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
    <div className={classes.LocationPoint}>
      <div className={classes.LocationPoint__imageDiv}>
        <img className={classes.LocationPoint__image} src={deliverImg} alt=""/>
      </div>
      <div className={classes.LocationPoint__formArea}>
        <div className={classes.LocationPoint__mainForm}>

          {/* initial point location pickup */}
          <InputPlacesComponent
            value={initialAddress}
            onChange={setInitialAddress}
            onSelect={initialHandleSelect}
            labelText={"Pickup Point"}
            inputId={"originId"}
          />

          {/* final point location drop */}
          <InputPlacesComponent
            value={finalAddress}
            onChange={setFinalAddress}
            onSelect={finalHandleSelect}
            labelText={"Dropping Point"}
            inputId={"destinationId"}
          />

          <div className={classes.LocationPoint__submitBtnGroup}>
            <Button onClick={fetchLocation} id={"distance"} text={`Book Now`}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationPoint;
