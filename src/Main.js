import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { EventPanel, EventInformation, Events } from './modules'
import Home from './modules/Home'
import Entity from './modules/Entity'

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
                        path="/orgUnit/:orgUnit/entity/:entity"
                        component={Entity}
                    />
                    <Route
                        exact
                        path="/orgUnit/:orgUnit/entity/:entity/event"
                        component={EventPanel}
                    />
                    <Route
                        exact
                        path="/orgUnit/:orgUnit/entity/:entity/event/:event"
                        component={EventInformation}
                    />
                    <Route
                        exact
                        path="/events/:approvalStatus"
                        render={props => (
                            <Events {...props} selected={this.props.selected} />
                        )}
                    />
                </Switch>
            </main>
        )
    }
}
