<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
=======
import React, {useState, useEffect, useContext} from "react";
import UserContext from "../../../context/UserContext";
>>>>>>> shashank
import classes from "./WeightComponent.module.css";
import UserContext from "../../../context/UserContext";

function WeightComponent() {
  const baseUrl = "https://delivery-nodejs.herokuapp.com/";
  
  const [weight, setWeight] = useState(null);
  const [active, setActive] = useState("");
<<<<<<< HEAD

  const { user, setUser } = useContext(UserContext);

=======
  const {user, setUser} = useContext(UserContext);
  
  
>>>>>>> shashank
  useEffect(() => {
    async function fetchWeight() {
      try {
        const res = await fetch(baseUrl + "user/fetch/price-weights");
        const jsonData = await res.json();
        setWeight(jsonData["result"]);
        console.log(jsonData["result"]);
      } catch (e) {
        alert("Failed to fetch weight.");
      }
    }
    
    fetchWeight();
  }, []);
<<<<<<< HEAD

  let clicked = (id, weight) => {
=======
  
  let clicked = (id, weight) => {
    setUser({
      ...user,
      weight: weight
    });
>>>>>>> shashank
    setActive(id);
    setUser({
      ...user,
      weight: weight,
    });
  };

  return (
    <div className={classes.WeightComponent}>
<<<<<<< HEAD
      {weight !== null ? (
        weight.map((ele) => (
          <span
            onClick={() => clicked(ele._id, ele.weight)}
            className={active === ele._id ? classes.IsActive : ""}
            key={ele._id}
          >
            {ele.weight} kg
          </span>
        ))
      ) : (
        <span>loading weight...</span>
      )}
=======
      {weight !== null ? weight.map(ele => <span onClick={() => clicked(ele._id, ele.weight)}
                                                 className={active === ele._id ? classes.IsActive : ""}
                                                 key={ele._id}>{ele.weight} kg</span>) : <span>loading weight...</span>}
>>>>>>> shashank
    </div>
  );
}

export default WeightComponent;
