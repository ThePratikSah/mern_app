import React, { useContext } from "react";
import classes from "./InputComponent.module.css";
import UserContext from "../../../context/UserContext";

function InputComponent({ name, labelText, type, value, placeholder }) {
  const { user, setUser } = useContext(UserContext);

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    switch (name) {
      case "sname":
        setUser({
          ...user,
          senderName: value,
        });
        break;
      case "sphone":
        setUser({
          ...user,
          senderPhone: Number.parseInt(value),
        });
        break;
      case "semail":
        setUser({
          ...user,
          senderEmail: value,
        });
        break;
      case "slocation":
        setUser({
          ...user,
          pickupLocation: value,
        });
        break;
      case "sstreet":
        setUser({
          ...user,
          pickupStreet: value,
        });
        break;
      case "sdate":
        setUser({
          ...user,
          pickupDate: value,
        });
        break;
      case "stime":
        setUser({
          ...user,
          pickupTime: value,
        });
        break;
      case "pname":
        setUser({
          ...user,
          receiverName: value,
        });
        break;
      case "pphone":
        setUser({
          ...user,
          receiverPhone: Number.parseInt(value),
        });
        break;
      case "pemail":
        setUser({
          ...user,
          receiverEmail: value,
        });
        break;
      case "plocation":
        setUser({
          ...user,
          dropLocation: value,
        });
        break;
      case "pstreet":
        setUser({
          ...user,
          dropStreet: value,
        });
        break;
      case "pdate":
        setUser({
          ...user,
          dropDate: value,
        });
        break;
      case "ptime":
        setUser({
          ...user,
          dropTime: value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.DeliveryFrom__inputGroup}>
      <label className={classes.DeliveryForm__label}>{labelText}</label>
      <input
        name={name}
        onChange={inputHandler}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classes.InputComponent}
      />
    </div>
  );
}

export default InputComponent;
