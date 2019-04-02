import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RecordSections, RecordsOverview } from '../'
import { ProgressSection } from '../ProgressSection'
import { initMetadata, Margin } from '../../'

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
    
    if (loading)
        return (
            <MainSection>
                <Margin>
                    <ProgressSection/>
                </Margin>
            </MainSection>
        )

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
                            isApproval={props.isApproval}
                            programs={metadata.programs}
                        />
                    )}
                />
                {(props.isApproval ?
                    ['/orgUnit/:orgUnit/event/:event'] :
                    ['/orgUnit/:orgUnit/event', '/orgUnit/:orgUnit/event/:event']
                    ).map(
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
                <Route render={() => 
                    <Redirect
                        from='/'
                        to={props.isApproval ? '/approval/Validate': '/approval/ALL'}
                    />}
                />
            </Switch>
        </MainSection>
    )
}
