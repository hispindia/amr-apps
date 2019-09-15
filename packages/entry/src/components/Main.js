import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { EventOverview } from './EventOverview'
import { EventForm } from './EventForm'

const paths = ['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event']

export const Main = () => (
    <Switch>
        <Route
            exact
            path={'/events/:status'}
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
        <Route render={() => <Redirect from="/" to={'/events/complete'} />} />
    </Switch>
)
