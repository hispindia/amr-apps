import React from "react";
import { Route, Switch } from "react-router-dom";
import { DataEntry } from "./modules/dataentry/DataEntry";
import { Analytics } from "./modules/analytics/Analytics";


const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={DataEntry} />
        <Route path="/dataentry" component={DataEntry} />
        <Route path="/analytics" component={Analytics} />
      </Switch>
    </main>
  );
};

export default Main;
