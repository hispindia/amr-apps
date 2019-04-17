import React from 'react'
import { bool, object, string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RecordSections, RecordsOverview } from 'modules'
import { MainSection } from './style'

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

Main.propTypes = {
    selected: string.isRequired,
    metadata: object.isRequired,
    tables: object.isRequired,
    isApproval: bool,
}
