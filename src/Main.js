import React from "react";
import { Route, Switch } from "react-router-dom";
import { PatientInformation } from "./modules/dataentry/PatientInformation";
import { Home } from "./modules/home/Home";


const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/patient/:id" component={PatientInformation} />
      </Switch>
    </main>
  );
};

export default Main;
