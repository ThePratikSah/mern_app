import React, {useContext} from "react";
import classes
  from "./ItemDropDownComponent.module.css";

import UserContext from "../../../context/UserContext";

function ItemDropDownComponent() {
  
  const {user, setUser} = useContext(UserContext);
  
  const selectHandler = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      itemType: value,
    })
  }
  
  return (
    <select name="items" onChange={selectHandler}
            className={classes.DeliveryForm__selectItemType}>
      <option selected disabled>Choose one</option>
      <option value="Laundry/Clothes">Laundry/Clothes</option>
      <option value="Lunch box">Lunch box</option>
      <option value="Charger">Charger</option>
      <option value="Documents">Documents</option>
      <option value="Keys">Keys</option>
      <option value="Others">Others</option>
    </select>
  );
}

export default ItemDropDownComponent;