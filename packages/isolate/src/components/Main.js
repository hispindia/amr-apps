import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { MainSection } from '@amr/app'
import { IsolateForm } from './IsolateForm'
import { NotFound } from './NotFound'

const path = '/event/:event'

const StyledMainSection = styled(MainSection)`
    padding: 16px 4%;
`

export const Main = () => (
    <StyledMainSection>
        <Switch>
            <Route
                exact
                path={path}
                render={props => <IsolateForm {...props} />}
            />
            <Route component={NotFound} />
        </Switch>
    </StyledMainSection>
)