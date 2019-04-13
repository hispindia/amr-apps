import React, { useEffect } from 'react'
import { CircularProgress } from '@dhis2/ui/core'
import { hook } from './hook'
import { Main, Sidebar } from '../'
import { Row, initMetadata } from '../../'

export const Content = props => {
    const { menuItems, tables, isApproval } = props
    const [state, dispatch, types] = hook()
    const { metadata, selected } = state

    useEffect(() => {
        const getMetaData = async () => {
            const data = await initMetadata()
            dispatch({
                type: types.INIT,
                metadata: data,
                selected: data.orgUnits[0].id,
            })
        }
        getMetaData()
    }, [])

    if (!metadata) return <CircularProgress size="large" overlay />

    return (
        <Row>
            <Sidebar
                onSelect={s => dispatch({ type: types.SELECTED, selected: s })}
                selected={selected}
                orgUnits={metadata.orgUnits}
                menuItems={menuItems}
            />
            <Main
                tables={tables}
                selected={selected}
                isApproval={isApproval}
                metadata={metadata}
            />
        </Row>
    )
}
