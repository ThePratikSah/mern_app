import React, {useState, useEffect} from "react";
import classes from "./LocationPoint.module.css";
import deliverImg from "../../img/deliver.svg";
import Button from "../ui/button/Button";

import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function LocationPoint() {
  //states
  const [initialAddress, setInitialAddress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");
  const [distance, setDistance] = useState({text: "", value: 0});

  useEffect(() => {
    document.querySelector("#distance").innerHTML = `Book Now @ ${
      distance["value"] <= 5000
        ? 40
        : 40 + ((distance["value"] - 5000) / 1000) * 10
    }₹`;
  });

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
          <PlacesAutoComplete
            value={initialAddress}
            onChange={setInitialAddress}
            onSelect={initialHandleSelect}
          >
            {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
              <div className={classes.LocationPoint__inputGroup}>
                <label className={classes.LocationPoint__label}>
                  Pickup Point
                </label>
                <input id="originId"
                       className={classes.LocationPoint__input}
                       {...getInputProps({placeholder: "Enter location"})}
                />

                <div className={classes.LocationPoint__suggestionList}>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#7a29e4" : "#fff",
                      color: suggestion.active ? "#fff" : "#1e1e1e",
                      cursor: "pointer",
                      padding: "10px"
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, {style})}>
                        {suggestion.description.length > 60 ? suggestion.description.substring(0, 61) + "..." : suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutoComplete>

          {/* final point location pickup */}
          <PlacesAutoComplete
            value={finalAddress}
            onChange={setFinalAddress}
            onSelect={finalHandleSelect}
          >
            {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
              <div className={classes.LocationPoint__inputGroup}>
                <label className={classes.LocationPoint__label}>
                  Dropping Point
                </label>
                <input id="destinationId"
                       className={classes.LocationPoint__input}
                       {...getInputProps({placeholder: "Enter location"})}
                />
                <div className={classes.LocationPoint__suggestionList}>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#7a29e4" : "#fff",
                      color: suggestion.active ? "#fff" : "#1e1e1e",
                      cursor: "pointer",
                      padding: "10px"
                    };
                    return (
                      <div {...getSuggestionItemProps(suggestion, {style})}>
                        {suggestion.description.length > 60 ? suggestion.description.substring(0, 61) + "..." : suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutoComplete>
          <div className={classes.LocationPoint__submitBtnGroup}>
            <Button onClick={fetchLocation} id={"distance"} text={`Book Now ${distance['text']}`}/>
          </div>
        </div>
      </div>
      <div className={classes.LocationPoint__fetchPrice}>
        <span>Distance {distance["text"]}</span>
      </div>
    </div>
  );
}

export default LocationPoint;
