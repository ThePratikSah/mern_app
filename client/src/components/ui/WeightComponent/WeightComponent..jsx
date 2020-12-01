import React, {useState, useEffect} from "react";
import classes from "./WeightComponent.module.css";

function WeightComponent() {
  const baseUrl = "https://delivery-nodejs.herokuapp.com/";

  const [weight, setWeight] = useState(null);
  const [active, setActive] = useState("");
 
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

  let clicked = (id) => {
    setActive(id);
  }
  
  return (
    <div className={classes.WeightComponent}>
      {weight !== null ? weight.map(ele => <span onClick={() => clicked(ele._id)} className={active === ele._id ? classes.IsActive : "" } key={ele._id}>{ele.weight} kg</span>) : <span>loading weight...</span>}
    </div>
  )
}

export default WeightComponent;