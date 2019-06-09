import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RecordSections, RecordsOverview } from 'modules'
import { MainSection } from './style'

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
                {(isApproval
                    ? ['/orgUnit/:orgUnit/event/:event']
                    : [
                          '/orgUnit/:orgUnit/event',
                          '/orgUnit/:orgUnit/event/:event',
                      ]
                ).map(path => (
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
