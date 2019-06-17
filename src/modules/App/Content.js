import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { OverlayedLoader } from 'components'
import { setMetadata, setOrgUnit } from 'actions'
import { READY, ERROR } from 'constants/statuses'
import { Main } from './Main'
import { Sidebar } from '../Sidebar'

const ContentSection = styled.section`
    display: flex;
    flex-direction: row;
    margin-top: 48px;
`

export const Content = () => {
    const dispatch = useDispatch()
    const metadata = useSelector(state => state.metadata)
    const selected = useSelector(state => state.selectedOrgUnit)
    const error = useSelector(state => state.metadata.status) === ERROR

    useEffect(() => {
        dispatch(setMetadata())
    }, [])

    useEffect(() => {
        if (metadata.status === READY)
            dispatch(
                setOrgUnit(metadata.orgUnits[0].id, metadata.orgUnits[0].path)
            )
    }, [metadata.status])

    if (error) return null

    if (!selected) return <OverlayedLoader />

    return (
        <ContentSection>
            <Sidebar />
            <Main />
        </ContentSection>
    )
}
