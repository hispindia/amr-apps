import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainSection } from '@amr/app'
import { IsolateForm } from './IsolateForm'
import { HelloWorld } from './HelloWorld'

const path = '/event/:event'

export const Main = () => (
    <MainSection>
        <Switch>
            <Route
                exact
                path={path}
                render={props => <IsolateForm {...props} />}
            />
            <Route component={HelloWorld} />
        </Switch>
    </MainSection>
)
