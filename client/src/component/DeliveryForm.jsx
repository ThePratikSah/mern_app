import React from "react";
import "./DeliveryForm.css";

function DeliveryForm() {
  return (
    <div className="DeliveryForm">
      <h1 className="DeliveryForm__header">Make Delivery Request</h1>
      <form>
        <div className="form-group">
          <div className="form">
            {/* from location */}
            <div className="DeliveryFrom__inputGroup">
              <label className="DeliveryForm__label">Pickup Location</label>
              <input
                type="text"
                placeholder="Street or Locality"
                className="DeliveryForm__input"
              />
            </div>
            {/* contact of sender */}
            <div className="DeliveryFrom__inputGroup">
              <label className="DeliveryForm__label">Your Contact</label>
              <input
                type="tel"
                placeholder="9191919191"
                className="DeliveryForm__input"
              />
            </div>
            {/* name of sender */}
            <div className="DeliveryFrom__inputGroup">
              <label className="DeliveryForm__label">Your Name</label>
              <input
                type="text"
                placeholder="Mr."
                className="DeliveryForm__input"
              />
            </div>
          </div>
          <div className="form">
            {/* to location */}
            <div className="DeliveryFrom__inputGroup">
              <label className="DeliveryForm__label">Drop Location</label>
              <input
                type="text"
                placeholder="Street or Locality"
                className="DeliveryForm__input"
              />
            </div>
            {/* contact of receiver */}
            <div className="DeliveryFrom__inputGroup">
              <label className="DeliveryForm__label">Receiver's Contact</label>
              <input
                type="tel"
                placeholder="9191919191"
                className="DeliveryForm__input"
              />
            </div>
            {/* name of receiver */}
            <div className="DeliveryFrom__inputGroup">
              <label className="DeliveryForm__label">Receiver's Name</label>
              <input
                type="text"
                placeholder="Mr."
                className="DeliveryForm__input"
              />
            </div>
          </div>
        </div>
        <div className="DeliveryForm__submit">
          <input
            type="submit"
            value="Review Order"
            className="DeliveryForm__submitBtn"
          />
        </div>
      </form>
    </div>
  );
}

export default DeliveryForm;
