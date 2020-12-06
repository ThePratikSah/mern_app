import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "./context/UserContext";
import LocationPoint from "./containers/locationPoint/LocationPoint";
import DeliveryForm from "./containers/deliveryForm/DeliveryForm";
import BuyForMe from "./containers/buyForMe/BuyForMe";
import NavBar from "./components/ui/navbar/NavBar";
import Features from "./components/ui/features/Features";

function App() {
  
  const [user, setUser] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: undefined,
    senderAddress: "",
    pickupTime: "",
    senderCoordinates: [],
    receiverName: "",
    receiverEmail: "",
    receiverPhone: undefined,
    receiverAddress: "",
    dropTime: "",
    receiverCoordinates: [],
    distance: undefined,
    weight: undefined,
    paymentId: "",
    amount: undefined
  });
  
  //TODO: Add Distance, Weight field in Order model
  
  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
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
          <Route path="/track" component={DeliveryForm} />
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
