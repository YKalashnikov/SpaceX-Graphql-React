import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Launches from "./components/Launches";
import Home from "./components/Home.js";
import LaunchDetails from "./components/LaunchDetails";
import RocketDetails from "./components/RocketDetails";
import Rockets from "./components/Rockets";
import Ships from "./components/Ships";
import ShipDetails from "./components/ShipDetails";
import "./App.css";
import logo from "./logos/download (1).png";
//"http://localhost:4000/graphql"
const client = new ApolloClient({
  uri: "/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <img
              src={logo}
              alt="SpaceX"
              style={{ width: 400, display: "block", margin: "auto",
            padding:"4rem" }}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/launches" component={Launches} />
            <Route
              exact
              path="/launch/:flight_number"
              component={LaunchDetails}
            />
            <Route exact path="/rockets" component={Rockets} />
            <Route exact path="/rocket/:rocket_id" component={RocketDetails} />
            <Route exact path="/ships" component={Ships} /> 
            <Route exact path="/ship/:ship_id" component={ShipDetails} />         </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
