import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Entity, Home, Event, OrgUnitTree } from './modules'

export const Main = () => {
    return (
        <main style={{ minWidth: 500 }}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/entity" component={Entity} />
                <Route path="/entity/:id" component={Entity} />
                <Route exact path="/event" component={Event} />
                <Route exact path="/tree" component={OrgUnitTree} />
            </Switch>
        </main>
    )
}
