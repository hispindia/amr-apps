import React, { useEffect } from 'react'
import { bool, object } from 'prop-types'
import { CircularProgress } from '@dhis2/ui/core'
import { Main, Sidebar } from 'modules'
import { Row } from 'styles'
import { initMetadata } from 'api'
import { hook } from './hook'

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
                id: data.orgUnits[0].id,
                path: data.orgUnits[0].path,
            })
        }
        getMetaData()
    }, [])

    if (!metadata) return <CircularProgress size="large" overlay />

    return (
        <Row>
            <Sidebar
                onSelect={(id, path) =>
                    dispatch({
                        type: types.SELECTED,
                        id: id,
                        path: path,
                    })
                }
                selected={selected}
                orgUnits={metadata.orgUnits}
                menuItems={menuItems}
            />
            <Main
                tables={tables}
                selected={selected.id}
                isApproval={isApproval}
                metadata={metadata}
            />
        </Row>
    )
}

Content.propTypes = {
    menuItems: object.isRequired,
    tables: object.isRequired,
    isApproval: bool,
}
