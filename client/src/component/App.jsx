import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DeliveryForm from "./DeliveryForm";
import BuyForMe from "./BuyForMe";
import NavBar from "./NavBar";

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
          <Route exact path="/" component={DeliveryForm} />
          {/* product delivery */}
          <Route path="/buy" component={BuyForMe} />
        </Switch>
      </div>
      {/* footer */}
    </Router>
  );
}

export default App;
