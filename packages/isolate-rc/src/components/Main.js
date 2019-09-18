import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MainSection } from '@hisp-amr/app'
import { ROOT, NEW, DISPATCHED } from '../constants/paths'
import { NewBatches } from './NewBatches'
import { DispatchedBatches } from './DispatchedBatches'

export const Main = () => (
    <MainSection>
        <Switch>
            <Route exact path={NEW} component={NewBatches} />
            <Route exact path={DISPATCHED} component={DispatchedBatches} />
            <Route render={() => <Redirect from={ROOT} to={NEW} />} />
        </Switch>
    </MainSection>
)
