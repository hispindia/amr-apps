import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Events, EventOverview, Record } from './modules'
//import Home from './modules/Home'
import Entity from './modules/Entity'

const MainSection = styled.main`
    width: 100%;
`

export class Main extends Component {
    render() {
        return (
            <MainSection>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <EventOverview
                                {...props}
                                selected={this.props.selected}
                            />
                        )}
                    />
                    {[
                        '/orgUnit/:orgUnit/entity',
                        '/orgUnit/:orgUnit/entity/:entity',
                    ].map(path => (
                        <Route
                            key={path}
                            exact
                            path={path}
                            component={Entity}
                        />
                    ))}
                    {[
                        '/orgUnit/:orgUnit/event',
                        '/orgUnit/:orgUnit/event/:event',
                    ].map(path => (
                        <Route
                            key={path}
                            exact
                            path={path}
                            component={Record}
                        />
                    ))}
                    <Route
                        exact
                        path="/events/:approvalStatus"
                        render={props => (
                            <Events {...props} selected={this.props.selected} />
                        )}
                    />
                </Switch>
            </MainSection>
        )
    }
}
