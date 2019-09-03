import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { node } from 'prop-types'
import { OverlayedLoader } from './OverlayedLoader'
import { setMetadata } from 'actions'
import { ERROR, LOADING } from 'constants/statuses'

export const MetadataLoader = ({ children }) => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.metadata.status)

    useEffect(() => {
        dispatch(setMetadata())
    }, [])

    if (status === ERROR) return null

    if (status === LOADING) return <OverlayedLoader />

    return children
}

MetadataLoader.propTypes = { children: node.isRequired }
