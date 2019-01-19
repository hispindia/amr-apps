import React from "react";
import { Route, Switch } from "react-router-dom";
import { PatientInformation } from "./modules/dataentry/PatientInformation";
import { Analytics } from "./modules/analytics/Analytics";


const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={PatientInformation} />
        <Route path="/dataentry" component={PatientInformation} />
        <Route path="/analytics" component={Analytics} />
      </Switch>
    </main>
  );
};

export default Main;
