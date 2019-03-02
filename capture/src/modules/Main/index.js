import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Record } from 'modules'
import { MyRecords } from '../'

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
                            <MyRecords
                                {...props}
                                selected={this.props.selected}
                            />
                        )}
                    />
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
                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </MainSection>
        )
    }
}
