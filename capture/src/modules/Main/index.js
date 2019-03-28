import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RecordsOverview } from 'modules'
import { RecordSections } from '../'
import { initMetadata } from 'api';

const MainSection = styled.main`
    width: 100%;
`

const getMetadata = async () => await initMetadata()

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

    if (loading) return <p>loading</p>

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
                                <RecordSections {...componentProps} />
                            )}
                        />
                    )
                )}
                <Route render={() => <Redirect from="/" to="/approval/ALL" />} />
            </Switch>
        </MainSection>
    )
}
