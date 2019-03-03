import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Records, RecordApproval } from '../'

const MainSection = styled.main`
    width: 100%;
`

export const Main = props => (
    <MainSection>
        <Switch>
            <Route
                exact
                path="/approval/:status"
                render={componentProps => (
                    <Records {...componentProps} selected={props.selected} />
                )}
            />
            {['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event'].map(
                path => (
                    <Route
                        key={path}
                        exact
                        path={path}
                        render={componentProps => (
                            <RecordApproval {...componentProps} />
                        )}
                    />
                )
            )}
            <Route render={() => <Redirect to="/approval/Validate" />} />
        </Switch>
    </MainSection>
)
