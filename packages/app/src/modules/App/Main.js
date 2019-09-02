import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { EventForm, EventOverview } from 'modules'

const paths = ['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event']

const MainSection = styled.main`
    width: 100%;
    padding: 16px;
`

export const Main = () => (
    <MainSection>
        <Switch>
            <Route
                exact
                path={'/approval/:status'}
                render={componentProps => <EventOverview {...componentProps} />}
            />
            {paths.map(path => (
                <Route
                    key={path}
                    exact
                    path={path}
                    render={componentProps => <EventForm {...componentProps} />}
                />
            ))}
            <Route render={() => <Redirect from="/" to={'/approval/ALL'} />} />
        </Switch>
    </MainSection>
)
