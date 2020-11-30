import React from "react";
import classes from "./BuyForMe.module.css";
import Button from "../ui/button/Button";

function BuyForMe() {
  return (
    <div className={classes.BuyForMe}>
      <h1 className={classes.BuyForMe__header}>Buy For Me</h1>
      <span className={classes.BuyForMe__headerSpan}>
        Our delivery agent will go through the store and buy the product
      </span>
      <form>
        <div className={classes.form__group}>
          {/* from where to buy */}
          <div className={classes.BuyForMe__inputGroup}>
            <label className={classes.BuyForMeForm__label}>
              Store Location
            </label>
            <input
              type="text"
              placeholder="Shop Address"
              className={classes.BuyForMe__input}
            />
            {/* shop name */}
            <input
              type="text"
              placeholder="Shop Name"
              className={classes.BuyForMe__input}
            />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            {/* what to buy */}
            <label className={classes.BuyForMeForm__label}>What to buy</label>
            <input
              type="text"
              placeholder="Enter the list of items seperated by comma"
              className={classes.BuyForMe__input}
            />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            <label className={classes.BuyForMeForm__label}>
              Approximate Cost
            </label>
            <input
              type="number"
              placeholder="₹"
              className={classes.BuyForMe__input}
            />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            {/* delivery location */} {/* name */}
            <label className={classes.BuyForMeForm__label}>
              Delivery Location
            </label>
            <input
              type="text"
              placeholder="Your complete location"
              className={classes.BuyForMe__input}
            />
          </div>
          <div className={classes.BuyForMe__inputGroup}>
            {/* contact number */}
            <label className={classes.BuyForMeForm__label}>Phone Number</label>
            <input
              type="tel"
              placeholder="Your contact number"
              className={classes.BuyForMe__input}
            />
          </div>
        </div>
        <div className={classes.BuyForMe__submit}>
          <Button onClick={() => {}} text={"Proceed to pay"} id={"btn"}/>
        </div>
      </form>
    </div>
  );
}

export default BuyForMe;
