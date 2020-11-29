import React from "react";
import { connect } from "react-redux";

import classes from "./DeliveryForm.module.css";

function DeliveryForm() {
  return (
    <div className={classes.DeliveryForm}>
      <h1 className={classes.DeliveryForm__header}>Make Delivery Request</h1>
      <span className={classes.DeliveryForm__headerSpan}>
        Our delivery agent will go through the below location and pickup the
        product
      </span>
      <form>
        <div className={classes.form__group}>
          <div className={classes.form}>
            {/* from location */}
            <div className={classes.DeliveryFrom__inputGroup}>
              <label className={classes.DeliveryForm__label}>
                Pickup Location
              </label>
              <input
                type="text"
                placeholder="Street or Locality"
                className={classes.DeliveryForm__input}
              />
            </div>
            {/* contact of sender */}
            <div className={classes.DeliveryFrom__inputGroup}>
              <label className={classes.DeliveryForm__label}>
                Your Contact
              </label>
              <input
                type="tel"
                placeholder="9191919191"
                className={classes.DeliveryForm__input}
              />
            </div>
            {/* name of sender */}
            <div className={classes.DeliveryFrom__inputGroup}>
              <label className={classes.DeliveryForm__label}>Your Name</label>
              <input
                type="text"
                placeholder="Mr."
                className={classes.DeliveryForm__input}
              />
            </div>
          </div>
          <div className={classes.form}>
            {/* to location */}
            <div className={classes.DeliveryFrom__inputGroup}>
              <label className={classes.DeliveryForm__label}>
                Drop Location
              </label>
              <input
                type="text"
                placeholder="Street or Locality"
                className={classes.DeliveryForm__input}
              />
            </div>
            {/* contact of receiver */}
            <div className={classes.DeliveryFrom__inputGroup}>
              <label className={classes.DeliveryForm__label}>
                Receiver's Contact
              </label>
              <input
                type="tel"
                placeholder="9191919191"
                className={classes.DeliveryForm__input}
              />
            </div>
            {/* name of receiver */}
            <div className={classes.DeliveryFrom__inputGroup}>
              <label className={classes.DeliveryForm__label}>
                Receiver's Name
              </label>
              <input
                type="text"
                placeholder="Mr."
                className={classes.DeliveryForm__input}
              />
            </div>
          </div>
        </div>
        <div className={classes.DeliveryForm__submit}>
          <input
            type="submit"
            value="Review Order"
            className={classes.DeliveryForm__submitBtn}
          />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(DeliveryForm);
