import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Entity, Home, Event } from './modules'

export const Main = () => {
    return (
        <main style={{ minWidth: 500 }}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/patient" component={Entity} />
                <Route path="/patient/:id" component={Entity} />
                <Route exact path="/event" component={Event} />
            </Switch>
        </main>
    )
}
