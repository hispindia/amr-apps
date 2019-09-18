import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainSection } from '@hisp-amr/app'
import { Form } from './Form'
import { NotFound } from './NotFound'

const path = '/event/:event'

export const Main = () => (
    <MainSection padded>
        <Switch>
            <Route exact path={path} render={props => <Form {...props} />} />
            <Route component={NotFound} />
        </Switch>
    </MainSection>
)
