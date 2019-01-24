import React from "react";
import { Route, Switch } from "react-router-dom";
import { Entity } from "./modules/entity/Entity";
import { Home } from "./modules/home/Home";


export const Main = () => {
  return (
    <main style = {{ minWidth: 500 }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/patient" component={Entity} />
        <Route path="/patient/:id" component={Entity} />
      </Switch>
    </main>
  );
};
