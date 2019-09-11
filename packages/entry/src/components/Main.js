import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MainSection } from '@amr/app'
import { EventOverview } from './EventOverview'
//import { EventForm } from 'modules'

const paths = ['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event']

export const Main = () => (
    <MainSection>
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
                    render={componentProps => (
                        <Hello {...componentProps} />
                    )}
                />
            ))}
            <Route render={() => <Redirect from="/" to={'/events/All'} />} />
        </Switch>
    </MainSection>
)

const Hello = () => <h1>Hello</h1>
