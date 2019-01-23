import React from "react";
import { Route, Switch } from "react-router-dom";
import { PatientInformation } from "./modules/dataentry/PatientInformation";
import { Home } from "./modules/home/Home";


export const Main = () => {
  return (
    <main style = {{ minWidth: 500 }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/patient" component={PatientInformation} />
        <Route path="/patient/:id" component={PatientInformation} />
      </Switch>
    </main>
  );
};
