import React, { useContext } from 'react'
import { string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RecordSections, RecordsOverview } from 'modules'
import { ConfigContext } from 'contexts'
import { MainSection } from './style'

export const Main = ({ selected }) => {
    const { isApproval } = useContext(ConfigContext)
    return (
        <MainSection>
            <Switch>
                <Route
                    exact
                    path={'/approval/:status'}
                    render={componentProps => (
                        <RecordsOverview
                            {...componentProps}
                            selected={selected}
                        />
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

Main.propTypes = { selected: string.isRequired }
