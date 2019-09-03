import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MainSection } from 'components'
import { EventForm, EventOverview } from 'modules'

const paths = ['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event']

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
