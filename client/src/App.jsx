import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LocationPoint from "./components/locationPoint/LocationPoint";
import DeliveryForm from "./components/deliveryForm/DeliveryForm";
import BuyForMe from "./components/buyForMe/BuyForMe";
import NavBar from "./components/ui/navbar/NavBar";
import Features from "./components/ui/features/Features";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
