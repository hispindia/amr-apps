import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OverlayedSpinner } from 'components'
import { Main, Sidebar } from 'modules'
import { Row } from 'styles'
import { setMetadata, setOrgUnit } from '../../actions'
import { READY } from '../../constants/statuses'

export const Content = ({ removingThisBreaksTheApp }) => {
    const dispatch = useDispatch()
    const metadata = useSelector(state => state.metadata)
    const selected = useSelector(state => state.selectedOrgUnit)

    useEffect(() => {
        dispatch(setMetadata())
    }, [])

    useEffect(() => {
        if (metadata.status === READY)
            dispatch(
                setOrgUnit(metadata.orgUnits[0].id, metadata.orgUnits[0].path)
            )
    }, [metadata.status])

    if (!selected) return <OverlayedSpinner />

    return (
        <Row>
            <Sidebar removingThisBreaksTheApp={removingThisBreaksTheApp} />
            <Main removingThisBreaksTheApp={removingThisBreaksTheApp} />
        </Row>
    )
}
