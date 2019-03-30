import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RecordsOverview, ProgressSection } from 'modules'
import { RecordSections } from '../'
import { initMetadata } from 'api';

const MainSection = styled.main`
    width: 100%;
`

export const Main = props => {
    const [metadata, setMetadata] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMetaData = async () => {
            setMetadata(await initMetadata())
            setLoading(false)
        }
        getMetaData()
    }, [])

    if (loading) return <ProgressSection/>

    return (
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
                            userOnly
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
                                <RecordSections
                                    {...componentProps}
                                    metadata={metadata}
                                />
                            )}
                        />
                    )
                )}
                <Route render={() => <Redirect from="/" to="/approval/ALL" />} />
            </Switch>
        </MainSection>
    )
}
