import React, {useState, useContext} from "react";

import UserContext from "../../context/UserContext";

import classes from "./DeliveryForm.module.css";
import InputComponent
  from "../../components/ui/InputComponent/InputComponent.";
import Button from "../../components/ui/button/Button";
import WeightComponent
  from "../../components/ui/WeightComponent/WeightComponent.";
import DateTimeComponent
  from "../../components/ui/DateTimeComponent/DateTimeComponent.";
import PriceComponent
  from "../../components/ui/PriceComponent/PriceComponent.";

function DeliveryForm() {
  
  const [value, setValue] = useState(new Date());
  const {user, setUser} = useContext(UserContext);
  
  const submitForm = () => {
    let sname = document.getElementById("sname").value;
    let sphone = document.getElementById("sphone").value;
    let semail = document.getElementById("semail").value;
    let slocation = document.getElementById("slocation").value;
    let sstreet = document.getElementById("sstreet").value;

    let pname = document.getElementById("pname").value;
    let pphone = document.getElementById("pphone").value;
    let pemail = document.getElementById("pemail").value;
    let plocation = document.getElementById("plocation").value;
    let pstreet = document.getElementById("pstreet").value;

    
  //  checking if not null or empty
    if (
      !sname || !sphone || !semail || !slocation || !sstreet ||
      !pname || !pphone || !pemail || !plocation || !pstreet
    ) {
      return;
    }
    
    let saddress = `${slocation}, ${sstreet}, ${user.senderAddress}`;
    let paddress = `${plocation}, ${pstreet}, ${user.receiverAddress}`;
    
  //  now the values are not empty, we can save them in the global state
    setUser({
      ...user,
      senderName: sname,
      senderEmail: semail,
      senderPhone: sphone,
      senderAddress: saddress,
      receiverName: pname,
      receiverEmail: pemail,
      receiverPhone: pphone,
      receiverAddress: paddress,
    });
  }
  
  return (
    <div className={classes.DeliveryForm}>
      <h1 className={classes.DeliveryForm__header}>
        Make Delivery
        Request</h1>
      <span className={classes.DeliveryForm__headerSpan}>
        Our delivery agent will go through the below location and pickup the
        product
      </span>
      
      {/* fetching weight list from backend */}
      <WeightComponent/>
      
      <div className={classes.form__group}>
        <div className={classes.form}>
          {/* name of sender */}
          <InputComponent id={"sname"} labelText={"Your Name"} type={"text"}
                          placeholder={"Mr/Miss"}/>
          {/* contact of sender */}
          <InputComponent id={"sphone"} labelText={"Your Contact"}
                          type={"tel"}
                          placeholder={"9876543210"}/>
          {/* email */}
          <InputComponent id={"semail"} labelText={"Your Email"}
                          type={"email"}
                          placeholder={"email@mail.com"}/>
          {/* from location */}
          <InputComponent id={"slocation"} labelText={"Pickup Location"}
                          type={"text"}
                          placeholder={"House No/Flat No"}/>
          {/* from location */}
          <InputComponent id={"sstreet"} labelText={"Street Name"}
                          type={"text"}
                          placeholder={"Street name/Locality name and Landmark"}/>
          <DateTimeComponent id={"stime"} value={value} onChange={setValue}
                             label={"Pick up date and time"}/>
        </div>
        <div className={classes.form}>
          {/* name of receiver */}
          <InputComponent id={"pname"} labelText={"Receiver Name"} type={"text"}
                          placeholder={"Mr/Miss"}/>
          {/* contact of Receiver */}
          <InputComponent id={"pphone"} labelText={"Receiver Contact"}
                          type={"tel"}
                          placeholder={"9876543210"}/>
          {/* email */}
          <InputComponent id={"pemail"} labelText={"Receiver Email"}
                          type={"email"}
                          placeholder={"email@mail.com"}/>
          {/* drop location */}
          <InputComponent id={"plocation"} labelText={"Drop Location"}
                          type={"text"}
                          placeholder={"House No/Flat No"}/>
          {/* drop street/locality */}
          <InputComponent id={"pstreet"} labelText={"Street Name"}
                          type={"text"}
                          placeholder={"Street name/Locality name and Landmark"}/>
          <DateTimeComponent id={"ptime"} value={value} onChange={setValue}
                             label={"Drop date and time"}/>
        </div>
      </div>
      <div className={classes.DeliveryForm__submit}>
        <Button id={"btn"} text={"Review Order"}
                onClick={submitForm}/>
      </div>
      <PriceComponent value={"₹40"} />
    </div>
  );
}

export default DeliveryForm;
