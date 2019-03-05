import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RecordsOverview } from 'modules'
import { RecordApproval } from '../'

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
                    <RecordsOverview
                        {...componentProps}
                        selected={props.selected}
                        eventLists={props.eventLists}
                        loading={props.loading}
                    />
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
            <Route
                render={() => <Redirect from="/" to="/approval/Validate" />}
            />
        </Switch>
    </MainSection>
)
