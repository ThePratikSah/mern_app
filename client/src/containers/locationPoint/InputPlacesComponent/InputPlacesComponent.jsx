import React from "react"
import classes from "../LocationPoint.module.css";
import PlacesAutoComplete from "react-places-autocomplete";

function InputPlacesComponent({value, onChange, onSelect, labelText, inputId}) {
  return(
    <PlacesAutoComplete
      value={value}
      onChange={onChange}
      onSelect={onSelect}
    >
      {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }) => (
        <div className={classes.LocationPoint__inputGroup}>
          <label className={classes.LocationPoint__label}>
            {labelText}
          </label>
          <input id={inputId}
                 className={classes.LocationPoint__input}
                 {...getInputProps({placeholder: "Choose location"})}
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
  );
}

export default InputPlacesComponent;