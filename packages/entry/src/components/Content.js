import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { READY, ERROR } from '@hisp-amr/app'
import { setOrgUnit } from '../actions'
import { Main } from './Main'
import { Sidebar } from './Sidebar'

const ContentSection = styled.section`
    display: flex;
    flex-direction: row;
`

export const Content = () => {
    const dispatch = useDispatch()
    const metadata = useSelector(state => state.metadata)
    const selected = useSelector(state => state.selectedOrgUnit)
    const error = useSelector(state => state.metadata.status) === ERROR

    useEffect(() => {
        const initOrgUnit = (id, path) => dispatch(setOrgUnit(id, path))

        if (metadata.status === READY)
            initOrgUnit(metadata.orgUnits[0].id, metadata.orgUnits[0].path)
    }, [metadata.status, metadata.orgUnits, dispatch])

    if (error || !selected) return null

    return (
        <ContentSection>
            <Sidebar />
            <Main />
        </ContentSection>
    )
}
