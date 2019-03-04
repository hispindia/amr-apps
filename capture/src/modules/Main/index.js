import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RecordsOverview, RecordSections } from '../'

const MainSection = styled.main`
    width: 100%;
`

export const Main = props => (
    <MainSection>
        <Switch>
            {['/', '/approval/:status'].map(path => (
                <Route
                    key={path}
                    exact
                    path={path}
                    render={componentProps => (
                        <RecordsOverview
                            {...componentProps}
                            selected={props.selected}
                        />
                    )}
                />
            ))}
            {['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event'].map(
                path => (
                    <Route
                        key={path}
                        exact
                        path={path}
                        render={componentProps => (
                            <RecordSections {...componentProps} />
                        )}
                    />
                )
            )}
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    </MainSection>
)
