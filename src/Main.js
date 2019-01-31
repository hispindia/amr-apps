import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Entity, Home, Event } from './modules'

export class Main extends Component {
    render() {
        return (
            <main style={{ width: '100%' }}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Home {...props} selected={this.props.selected} />
                        )}
                    />
                    <Route
                        exact
                        path="/orgUnit/:orgUnit/entity"
                        component={Entity}
                    />
                    <Route
                        exact
                        path="/orgUnit/:orgUnit/entity/:id"
                        component={Entity}
                    />
                    <Route exact path="/event/:id" component={Event} />
                </Switch>
            </main>
        )
    }
}
