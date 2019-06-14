import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RecordSections, RecordsOverview } from 'modules'

const approvalPaths = ['/orgUnit/:orgUnit/event/:event']
const entryPaths = ['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event']

export const MainSection = styled.main`
    width: 100%;
    padding: 16px;
`

export const Main = () => {
    const isApproval = useSelector(state => state.appConfig.isApproval)

    return (
        <MainSection>
            <Switch>
                <Route
                    exact
                    path={'/approval/:status'}
                    render={componentProps => (
                        <RecordsOverview {...componentProps} />
                    )}
                />
                {(isApproval ? approvalPaths : entryPaths).map(path => (
                    <Route
                        key={path}
                        exact
                        path={path}
                        render={componentProps => (
                            <RecordSections {...componentProps} />
                        )}
                    />
                ))}
                <Route
                    render={() => (
                        <Redirect
                            from="/"
                            to={
                                isApproval
                                    ? '/approval/Validate'
                                    : '/approval/ALL'
                            }
                        />
                    )}
                />
            </Switch>
        </MainSection>
    )
}
