import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import classes from "./DeliveryForm.module.css";
import InputComponent
  from "../../components/ui/InputComponent/InputComponent.";
import Button from "../../components/ui/button/Button";
import WeightComponent
  from "../../components/ui/WeightComponent/WeightComponent.";
import PriceComponent
  from "../../components/ui/PriceComponent/PriceComponent.";
import Spinner from "../../components/ui/Spinner/Spinner";

import UserContext from "../../context/UserContext";

function DeliveryForm() {
  const {user, setUser} = useContext(UserContext);
  const [loading, isLoading] = useState(false);
  
  useEffect(() => {
    const amount = user.distance > 4000 ? Math.floor(((user.distance - 4000) / 1000)) * 20 : 0;
    setUser({
      ...user,
      distancePrice: amount
    });
  }, []);
  
  // handle your form here
  const formSubmitHandler = async () => {
    isLoading(true);
    // join date and time into one
    const pickupDate = new Date(
      `${user.pickupDate} ${user.pickupTime}`
    ).toISOString();
    const dropDate = new Date(
      `${user.dropDate} ${user.dropTime}`
    ).toISOString();
    
    // formulate the data object which has to be passed in the axios
    const data = {
      sender: {
        name: user.senderName,
        email: user.senderEmail,
        phone: user.senderPhone,
        address: `${user.pickupLocation}, ${user.pickupStreet}, ${user.senderAddress}`,
        time: pickupDate,
        location: {
          type: "Point",
          coordinates: user.senderCoordinates,
        },
      },
      receiver: {
        name: user.receiverName,
        email: user.receiverEmail,
        phone: user.receiverPhone,
        address: `${user.dropLocation}, ${user.dropStreet}, ${user.receiverAddress}`,
        time: dropDate,
        location: {
          type: "Point",
          coordinates: user.receiverCoordinates,
        },
      },
      paymentId: "paymentId12345",
      amount: user.amount ? user.amount : 50,
      weight: user.weight,
      distance: user.distance,
    };
    
    // now we have the data
    // we can make axios req
    const url = `https://delivery-nodejs.herokuapp.com/user/create/order`;
    
    const result = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (result.status === 201) {
      isLoading(false);
      alert("Order placed sucessfully");
      setUser(null);
    }
    
    alert(result);
  };
  
  return (
    <div className={classes.DeliveryForm}>
      <h1 className={classes.DeliveryForm__header}>Make Delivery
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
        {loading ? <Spinner/> :
          <Button id={"btn"} onClick={formSubmitHandler}
                  text={"Review Order"}/>}
      </div>
      <PriceComponent
        value={user.amount + user.weightPrice + user.distancePrice + user.stimePrice + user.ptimePrice}/>
    </div>
  );
}

export default DeliveryForm;
