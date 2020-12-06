import React, {useState, useContext} from "react";
import classes from "./LocationPoint.module.css";
import deliverImg from "../../img/deliver.svg";
import DeliveryForm from "../deliveryForm/DeliveryForm";
import Button from "../../components/ui/button/Button";
import UserContext from "../../context/UserContext";

import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import InputPlacesComponent from "./InputPlacesComponent/InputPlacesComponent";

function LocationPoint() {
  
  //importing global state
  const {user, setUser} = useContext(UserContext);
  
  //states
  const [initialAddress, setInitialAddress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");
  const [distance, setDistance] = useState({text: "", value: 0});
  const [navigate, setNavigate] = useState(false);

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
        setDistance(json["rows"][0]["elements"][0]["distance"]);
        
        //setting required data in the global state
        setUser({
          ...user,
          senderAddress: initialAddress,
          receiverAddress: finalAddress,
          distance: json["rows"][0]["elements"][0]["distance"]["value"],
          senderCoordinates: [initialCoordinates.lat, initialCoordinates.lng],
          receiverCoordinates: [finalCoordinates.lat, finalCoordinates.lng]
        });
        setNavigate(true);
      } else {
        alert('Empty Field');
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  
  return (
    navigate ? <DeliveryForm />
    : <div className={classes.LocationPoint}>
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
