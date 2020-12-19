import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "./context/UserContext";
import LocationPoint from "./containers/locationPoint/LocationPoint";
import Success from "./components/Success/Success";
import BuyForMe from "./containers/buyForMe/BuyForMe";
import NavBar from "./components/ui/navbar/NavBar";
import Features from "./components/ui/features/Features";
import OrderCard from "./containers/OrderCard/OrderCard";

function App() {
  const [user, setUser] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: undefined,
    senderAddress: "",
    pickupLocation: "",
    pickupStreet: "",
    pickupDate: "",
    pickupTime: "",
    senderCoordinates: [],
    receiverName: "",
    receiverEmail: "",
    receiverPhone: undefined,
    receiverAddress: "",
    dropLocation: "",
    dropStreet: "",
    dropDate: "",
    dropTime: "",
    receiverCoordinates: [],
    distance: undefined,
    weight: undefined,
    paymentId: "",
    weightPrice: 0,
    distancePrice: 0,
    stimePrice: 0,
    ptimePrice: 0,
    amount: 39,
    success: false,
  });

  //TODO: Add Distance, Weight field in Order model

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        {/* NavBar */}
        <NavBar />
        {/* use Link component inside your navbar component */}
        {/* serving the home page */}
        {/* navbar */}
        <div>
          <Switch>
            {/* DeliveryForm */}
            <Route exact path="/" component={LocationPoint} />
            {/* product delivery */}
            <Route path="/buy" component={BuyForMe} />
            {/* success page */}
            <Route path="/success" component={Success} />
            <Route path="/track" component={OrderCard} />
          </Switch>
        </div>
        {/* features section */}
        <Features />
        {/* footer */}
      </UserContext.Provider>
    </Router>
  );
}

export default App;
