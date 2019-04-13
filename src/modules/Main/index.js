import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RecordSections, RecordsOverview } from '../'

const MainSection = styled.main`
    width: 100%;
`

export const Main = props => (
    <MainSection>
        <Switch>
            <Route
                exact
                path={'/approval/:status'}
                render={componentProps => (
                    <RecordsOverview
                        {...componentProps}
                        selected={props.selected}
                        tables={props.tables}
                        isApproval={props.isApproval}
                        programs={props.metadata.programList}
                    />
                )}
            />
            {(props.isApproval
                ? ['/orgUnit/:orgUnit/event/:event']
                : ['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event']
            ).map(path => (
                <Route
                    key={path}
                    exact
                    path={path}
                    render={componentProps => (
                        <RecordSections
                            {...componentProps}
                            isApproval={props.isApproval}
                            metadata={props.metadata}
                        />
                    )}
                />
            ))}
            <Route
                render={() => (
                    <Redirect
                        from="/"
                        to={
                            props.isApproval
                                ? '/approval/Validate'
                                : '/approval/ALL'
                        }
                    />
                )}
            />
        </Switch>
    </MainSection>
)
