import React from "react";
import classes from "./OrderCard.module.css";

function OrderCard(props) {
  
  const data = props.data;
  const {sender, receiver} = props.data;
  
  function getDateTime(date) {
    let parsedDate = new Date(date);
    return [
      parsedDate.toLocaleString('default', {month: 'short'}) + ' ' + (parsedDate.getDate()) + ', ' + parsedDate.getFullYear(),
      parsedDate.getHours() + ':' + parsedDate.getMinutes()
    ];
  }
  
  //TODO: Accept a css props for failed card bg color
  
  return (
    <div className={classes.OrderSummary__parent}>
      <div className={classes.OrderWeight}>
        <p>{data.weight} KG | ₹{data.amount}</p>
      </div>
      <div className={classes.OrderSummary__cardParent}>
        <div className={classes.OrderSummary__card}>
          <div>
            <h2 className={classes.OrderSummary__cardHeader}>
              <small>Txn ID:</small> {data.paymentId}
            </h2>
          </div>
          <div className={classes.OrderSummary__cardDetails}>
            <div className={classes.OrderSummary__cardDetailsSender}>
              <span className={classes.sender}>Sender</span>
              <div
                className={classes.OrderSummary__cardDetailsSenderPersonalInfo}
              >
                <span
                  className={classes.OrderSummary__cardDetailsName}>{sender.name}</span>
                <span
                  className={classes.OrderSummary__cardDetailsPhone}>+91-{sender.phone}</span>
                <span
                  className={classes.OrderSummary__cardDetailsEmail}>{sender.email}</span>
                <span
                  className={classes.OrderSummary__cardDetailsAddress}>{sender.address}</span>
              </div>
              <div
                className={classes.OrderSummary__cardDetailsSenderDateTime}>
                <span>{getDateTime(sender["time"])[0]}</span>
                <span>{getDateTime(sender["time"])[1]}</span>
              </div>
            </div>
            {/*<hr className={classes.HorizontalSeparation}/>*/}
            <div
              className={classes.OrderSummary__cardDetailsReceiver}>
              <span className={classes.receiver}>Receiver</span>
              <div
                className={classes.OrderSummary__cardDetailsReceiverDateTime}>
                <span>{getDateTime(receiver["time"])[0]}</span>
                <span
                  className={classes.OrderSummary__cardTime}>{getDateTime(receiver["time"])[1]}</span>
              </div>
              <div
                className={classes.OrderSummary__cardDetailsReceiverPersonalInfo}
              >
                <span
                  className={classes.OrderSummary__cardDetailsName}>{receiver.name}</span>
                <span
                  className={classes.OrderSummary__cardDetailsPhone}>+91-{receiver.phone}</span>
                <span
                  className={classes.OrderSummary__cardDetailsEmail}>{receiver.email}</span>
                <span
                  className={classes.OrderSummary__cardDetailsAddress}>{receiver.address}</span>
              </div>
            </div>
            {/* TODO:Add driver select tag */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
