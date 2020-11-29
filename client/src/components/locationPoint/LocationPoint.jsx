import React, {useState} from "react";
import clsses from "./LocationPoint.module.css";

import PlacesAutoComplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

function App() {
    const [initialAddress, setInitialAddress] = useState("");
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
            if (initialAddress !== null && finalAddress !== null) {
                const res = await fetch('http://localhost:3300/map/fetch', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "origin": {
                            "lat": initialCoordinates.lat,
                            "lng": initialCoordinates.lng
                        },
                        "destination": {
                            "lat": finalCoordinates.lat,
                            "lng": finalCoordinates.lng
                        }
                    })
                });
                const json = await res.json();
                console.log(json);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <PlacesAutoComplete
                value={initialAddress}
                onChange={setInitialAddress}
                onSelect={initialHandleSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <input {...getInputProps({placeholder: "Enter location"})} />

                        <div>
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map((suggestion, index) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, {style})}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutoComplete>
            <p className="lat">Lat: {initialCoordinates.lat}</p>
            <p className="lat">Lng: {initialCoordinates.lng}</p>

            {/* final point location pickup */}
            <PlacesAutoComplete
                value={finalAddress}
                onChange={setFinalAddress}
                onSelect={finalHandleSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <input {...getInputProps({placeholder: "Enter location"})} />

                        <div>
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, {style})}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutoComplete>
            <p className="lat">Final Lat: {finalCoordinates.lat}</p>
            <p className="lat">Final Lng: {finalCoordinates.lng}</p>
            <button onClick={() => fetchLocation()}>Book Now</button>
        </div>
    );
}

export default App;
